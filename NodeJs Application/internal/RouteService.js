/**
 * http://usejsdoc.org/
 */
require("./Route.js")()
repository=require("./RepositoryConnection")
cQuery = require("json-query")
exports.RouteService = function(req,res){
	
			return{
				getShortestPath:function(src,dest,call_back){
						//console.log("reached service")
						router = new Router(src,dest,repository.Repository,cQuery)
						//console.log(router.source)
						
						router.getShortestPath(function(result){
							call_back(result)
						})
				},
				processResult:function(src_street,dest_street,routes,result_callback){
					var bcRoutesCollection = "bcRoutes"
					var bcRoutesStreetCollection = "bcRoutesStreets"
					var bcRelations = "bcRelations"	
					var thisRef = this;
					repository.Repository.getAllDocuments(bcRoutesCollection,function(err,result){
						if(err)
							throw err;
						var bcRoutesResult = result;
						repository.Repository.getAllDocuments(bcRoutesStreetCollection,function(err,result){
							if (err)
								throw err;
							var bcRoutesStreetResult = result;
							repository.Repository.getAllDocuments(bcRelations,function(err,result){
								if(err)
									throw err
								var relationsResult = result;
								var sum = 0;
								var final_result = {}
								final_result['routes']=[]
								final_result['points']=[]
								prev_point = src_street;
								//console.log(routes)
								final_result['points'].push(thisRef.getStreetInfo(bcRoutesStreetResult,prev_point)['targetNode'])
								
								for(var i=routes.length-1;i>=1;i--){
									common_streets_from = cQuery('[*from='+routes[i]+']',{
										data:bcRoutesResult
									}).value
									common_streets_to = cQuery('[to='+routes[i-1]+']',{
										data:common_streets_from
									}).value
									
									point=common_streets_to['commonNodes'][0]
									
									coord2 = thisRef.getStreetInfo(bcRoutesStreetResult,point)
									if(coord2==null || coord2 == undefined)
										continue;
									target_coord2=coord2['targetNode']
									if(prev_point!=null){
										coord1 = thisRef.getStreetInfo(bcRoutesStreetResult,prev_point)
										//console.log(coord1)
										target_coord1=coord1['targetNode']
										
										eprojection = new EProjection({"lat":target_coord1['lng'],"lng":target_coord1['lat']},{"lat":target_coord2['lng'],"lng":target_coord2['lat']})
										sum=sum+eprojection.getDistance()
									}
									final_result['points'].push(target_coord2)
									final_result['routes'].push(thisRef.getRouteInfo(relationsResult,routes[i]))
									prev_point = point
								}
								
								final_result['points'].push(thisRef.getStreetInfo(bcRoutesStreetResult,dest_street)['targetNode'])
								final_result['routes'].push(thisRef.getRouteInfo(relationsResult,routes[0]))
								final_result['distance'] =sum 
								result_callback(final_result)
							})
							
							
						})
					});
				},
				getStreetInfo:function(records,osmId){
					for(var i=0;i<records.length;i++){
						if(records[i].street.osmId==osmId)
							return records[i]
					}
				},
				getRouteInfo:function(records,osmId){
					for(var i=0;i<records.length;i++){
						if(records[i].osmId==osmId)
							return {"osmId":osmId,"metaData":records[i].metaData}
					}
				},
				getRouteOSMIdofStreet:function(streetId,call_back){
					var query={"commonNodes":{"$in":[streetId]}};
					var bcRoutesCollection = "bcRoutes";
					repository.Repository.getMatchingDocument(query,bcRoutesCollection,function(err,result){
						if(err)
							throw err;
						console.log(result)
						call_back(result['from'])
						
					});
					
				}
			};
}();
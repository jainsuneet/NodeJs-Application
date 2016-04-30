/**
 * 
 */
repository=require("./RepositoryConnection")
cQuery = require("json-query")
module.exports=function(){
	this.NodesService=function(){
		var config = {
				nodesQuery:{"street.meta_data.name":{"$exists":true}},
				nodesCollection:"nodes",
				bcRoutesStreetsCollection:"bcRoutesStreets",
				attributesInclusion: {_id:0,"street.nodes":0}
		}
		return{
			
			getNodesData:function(call_back){
				repository.Repository.getMatchingDocuments2(config.nodesQuery,
															config.attributesInclusion,
															config.bcRoutesStreetsCollection,
															function(err,result){
								if(err)
									throw err;
								streets_result = result;
								call_back(streets_result)
				});
				
				
			}	
		};
		
	}();
};
/**
 * http://usejsdoc.org/
 */
require("./Queue.js")();

module.exports=function(){
	console.log("loaded module called")
	this.Router=function(src,dest,repository,cQuery){
			//console.log("reached Router")
			this.source = src;
			this.dest=dest;
			this.repository=repository;
			this.bcRoutes = "bcRoutes";
			this.cQuery = cQuery;
	}
	this.Router.prototype.getShortestPath=function(res_callback){
		
		var srcNode;
		var destNode;
		var thisRef = this;
		this.repository.getAllDocuments(thisRef.bcRoutes,function(err,result){
			if(err)
				throw err;
				
			srcNode = thisRef.cQuery('[from='+thisRef.source+']',{
								data:result
					}).value;
			destNode =  thisRef.cQuery('[from='+thisRef.dest+']',{
					data:result
					}).value;
			visited={};
			prev = {};
			queue = new Queue();
			queue.enqueue(srcNode);
			
			//visited[thisRef.source] = true;
			while(queue.getLength()!=0){
				//console.log(queue.getLength())
				u = queue.dequeue()
				u_id = u["from"]
				if (u_id==destNode["from"]){
					console.log("finished")
					break;
				}
				edges =  thisRef.cQuery('[*from='+u_id+']',{
					data:result
				}).value
				for(var i=0;i<edges.length;i++){
					edge = edges[i]
					to_id= edge["to"]
					
					if(!visited.hasOwnProperty(to_id) ||visited[to_id]==false){
						prev[to_id] = u_id
						visited[to_id] = true
						 queue.enqueue( thisRef.cQuery('[from='+to_id+']',{
							data:result
							}).value);
					}
				}
			}
			//console.log(prev)
			
			
			path = new Array()
			if(thisRef.source==thisRef.dest){
				path.push(thisRef.source);
			}else{
			
				i = thisRef.dest
				path.push(i)
			
				while(prev[i]!=thisRef.source){
					path.push(prev[i])
					i = prev[i]
				}
				path.push(prev[i])
				}
				result1 = {
					"shortestPath":path
					
				};
			res_callback(result1)
			//for(var i=0;i<)
		});
			
	}
	
	
};


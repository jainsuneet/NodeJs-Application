/**
 * 
 */
require("./NodesService.js")()
rService = require('./RouteService')
exports.helloWorld = function(req,res){
	console.log(req.body)
	res.send(req.query.user+" Welcome to Node js");
}
exports.getNodesData = function(req,res){
	NodesService.getNodesData(function(data){
		res.set('Content-Type', 'application/json')
		res.send(data);
	});	
}
exports.getShortestPath = function(req,res){
	var srcStreet = req.query.src;
	var destStreet = req.query.dest;
	console.log(destStreet)
	rService.RouteService.getRouteOSMIdofStreet(parseInt(srcStreet),function(data){
		var srcRoute = data;
		rService.RouteService.getRouteOSMIdofStreet(parseInt(destStreet),function(data){
			var destRoute = data;
			rService.RouteService.getShortestPath(srcRoute,destRoute,function(result){
				 rService.RouteService.processResult(srcStreet,destStreet,result['shortestPath'],function(result){
					 res.set('Content-Type', 'application/json')
						res.send(result)
				 }); 
			  });
		});
	});
	
}
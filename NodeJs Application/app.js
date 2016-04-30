
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , repository=require('./internal/RepositoryConnection')
  , cQuery = require("json-query")
  , rService = require('./internal/RouteService')
  , mep = require('./internal/MEP.js')
require("./internal/EProjection.js")()

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/services/greet',mep.helloWorld)
app.get('/services/nodes',mep.getNodesData)
app.get('/services/path',mep.getShortestPath)

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
	var collection = "example"
  /*repository.Repository.getAllDocuments(collection,function(err, result) {
	  		if(err)
	  			throw err
	  		//console.log(result)
	  		var res_data ={
	  				records:result
	  		}
	  		var dResult=cQuery('records[*age=28]',{
	  				data:res_data
	  			});
	  		console.log(dResult.value)

		});
		
	  rService.RouteService.getShortestPath(5331192,5255208,function(result){
		 rService.RouteService.processResult(result['shortestPath'],function(result){
			 console.log(result)
		 }); 
	  });
	  */
		//eprojection = new EProjection({"lat":50.219095,"lng":8.679199},{"lat":49.553726,"lng":11.030273})
		//console.log(eprojection.getDistance())
	  console.log("reached here")
});

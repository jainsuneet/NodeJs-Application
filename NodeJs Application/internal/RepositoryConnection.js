/**
 * 
 */

var config = "mongodb://localhost:27017/poiDB"
exports.Repository = function(req,res){
		return {
			db:require("mongoskin").db(config),
			getAllDocuments:function(collection,call_back){
				this.db.collection(collection).find({}).toArray(call_back)
			},
			getMatchingDocuments:function(query,collection,call_back){
				this.db.collection(collection).find(query).toArray(call_back)
			},
			getMatchingDocuments2:function(query,attributes,collection,call_back){
				this.db.collection(collection).find(query,attributes).toArray(call_back);
			},
			getMatchingDocument:function(query,collection,call_back){
				console.log(query)
				this.db.collection(collection).findOne(query,call_back)
			}
			
		};
}();
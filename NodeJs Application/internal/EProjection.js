/**
 * http://usejsdoc.org/
 */
module.exports = function(point1,point2){
	this.EProjection = function(point1,point2){
		this.point1 = point1;
		this.point2 = point2;
		this.radius = 6371000;
		this.degree_radians = Math.PI/180;
	}
	
	this.EProjection.prototype.getDistance=function(){
		var lambda1 = this.point1.lng*this.degree_radians;
		var lambda2 = this.point2.lng*this.degree_radians;
		var phy1 = this.point1.lat*this.degree_radians;
		var phy2 = this.point2.lat*this.degree_radians;
		var x = (lambda2-lambda1) * Math.cos((phy1+phy2)/2);
		var y = (phy2-phy1);
		var d = Math.sqrt(x*x + y*y) * this.radius;
		return d;
	}
}
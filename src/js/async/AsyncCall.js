define([
], function() {
   var classe = function(call) {
	this.call = call;
	this.result = undefined;
	this.done = false;
   }

   classe.prototype.run = function(callback) {
	this.done = false;
	var async = this;
	this.call(function(result) {
		async.result = result;
		async.done = true;
		if (callback !== undefined) {
			callback(result);
		}
	});
   }

   return classe;
});

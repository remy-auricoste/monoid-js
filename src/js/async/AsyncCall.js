define([
], function() {
   var classe = function(call) {
	this.call = call;
	this.result = undefined;
	this.done = false;
   }

   classe.prototype.run = function(params, callback) {
	this.done = false;
	var async = this;
	this.call(params, function(result) {
		async.result = result;
		async.done = true;
		if (callback !== undefined) {
			callback(result);
		}
	});
   }

   classe.prototype.chain = function(async2) {
	var async = this;
	return new classe(function(params, callback) {
		async.run(params, function(result) {
			async2.run(result, callback);
		});
	});
   }

   return classe;
});

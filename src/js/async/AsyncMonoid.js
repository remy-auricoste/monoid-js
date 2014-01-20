define([
"abstract/Monoid",
"async/AsyncCall"
], function(Monoid, AsyncCall) {
   var classe = function() {
   }

   var combine = function(asyncCall1, asyncCall2) {
	var retour = new AsyncCall(function(callback) {
		var insideCallback = function(result) {
			if (asyncCall1.done && asyncCall2.done) {
				var getResult = function(call) {
					return call.combined ? call.result : [call.result];
				};
				callback(getResult(asyncCall1).concat(getResult(asyncCall2)));
			}
		}
		asyncCall1.run(insideCallback);
		asyncCall2.run(insideCallback);
	});
	retour.combined = true;
	return retour;
   }

   var zero = new AsyncCall(function(callback) {
	if (callback !== undefined) {
		callback();
	}
   });

   classe.prototype = new Monoid(combine, zero);

   return classe;
});

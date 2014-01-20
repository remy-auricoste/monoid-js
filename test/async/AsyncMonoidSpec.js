define([
"async/AsyncCall",
"async/AsyncMonoid"
],
    function (AsyncCall, AsyncMonoid) {
    describe('AsyncMonoid', function () {
        beforeEach(function () {
        });
        it('can reduce an array of AsyncCall', function () {
		var log = function(value) {console.log("value="+value);};
		var array = [];
		var expected = [];
		for (var i = 0 ; i < 9 ; i++) {
			var factory = function(i) {
				array.push(new AsyncCall(function(callback) {
					setTimeout(function() {callback(i);}, i*10);
				}));
			};
			factory(i);
			expected.push(i);
		}
		
		var monoid = new AsyncMonoid();
		var reduce = monoid.reduce(array);
		reduce.run(log);
		waits(1000);
		reduce.run(function(result) {expect(result).toEqual(expected);});
        });
    })
});

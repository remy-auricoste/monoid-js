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
				array.push(new AsyncCall(function(params, callback) {
					setTimeout(function() {callback(i);}, i*10);
				}));
			};
			factory(i);
			expected.push(i);
		}
		
		var monoid = new AsyncMonoid();
		var reduce = monoid.reduce(array);
		reduce.run([], log);
		waits(150);
		reduce.run([], function(result) {expect(result).toEqual(expected);});
        });
	it('can chain AsyncCall', function() {
		var log = function(value) {console.log("value="+value);};
		var array = [];
		var expected = 0;
		for (var i = 0 ; i < 6 ; i++) {
			var factory = function(i) {
				array.push(new AsyncCall(function(params, callback) {
					setTimeout(function() {
						var result = params+i;
						callback(result);
					}, i*2);
				}));
			};
			factory(i);
			expected += i;
		}
		
		var monoid = new AsyncMonoid();
		var fold = monoid.foldLeft(array);
		fold.run(0, log);
		waits(100);
		fold.run(0, function(result) {expect(result).toEqual(expected);});
	});
    })
});

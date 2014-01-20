define([
    "abstract/Monoid"
],
    function (Monoid) {
	console.log("loading MonoidSpec");
    describe('Monoid', function () {
        beforeEach(function () {
        });

        it('can reduce an array', function () {
		var fonction = function(number1, number2) {return number1+number2;};
		var monoid = new Monoid(fonction, 0);
		expect(monoid.reduce([1, 2, 3, 4, 5])).toBe(15);
        });
    })
});

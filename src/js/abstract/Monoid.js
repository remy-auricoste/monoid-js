define([], function() {
	console.log("loading Monoid");
   var classe = function(combineFunction, zeroElement) {
       this.combine = combineFunction;
       this.zero = zeroElement;
   }

   classe.prototype.reduce = function(array) {
       var count = array.length;
       if (count == 2) {
           return this.combine(array[0], array[1]);
       } else if (count == 1) {
           return array[0];
       } else if (count == 0) {
           return this.zero;
       } else {
           var halfSize = count / 2;
           var firstHalf = this.reduce(array.slice(0, halfSize));
           var secondHalf = this.reduce(array.slice(halfSize, count));
           return this.combine(firstHalf, secondHalf);
       }
   }

    return classe;
});

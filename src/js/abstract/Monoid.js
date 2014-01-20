define([], function() {
   console.log("loading Monoid");
   var classe = function(combineFunction, zeroElement, foldFunction) {
       this.combine = combineFunction;
       this.zero = zeroElement;
       this.fold = foldFunction;
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

   classe.prototype.foldLeft = function(array) {
       var count = array.length;
       if (count == 1) {
           return array[0];
       } else if (count == 0) {
           return this.zero;
       } else if (count == 2) {
	   return this.fold(array[0], array[1]);
       } else {
	  return this.foldLeft([this.fold(array[0], array[1])].concat(array.slice(2, count))); 
       }     
   }

    return classe;
});

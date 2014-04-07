/**
 * Concat all given arrays onto the first given array.
 */
(function(_) {
  function concatOn(target, arr1) {
    var arrays = Array.prototype.slice.call(arguments, 1);

    _.each(arrays, function(array) {
      _.each(array, function(item) {
        target.push(item);
      });
    });
    return target;
  };

  _.mixin({
    concatOn: concatOn
  });
})(_);
/**
 * Concat all given arrays into a new one.
 */
(function(_) {
  function concatAll() {
    var result = [];

    _.each(arguments, function(arr) {
      result = result.concat(arr);
    });
    return result;
  }

  _.mixin({
    concatAll: concatAll
  });
})(_);
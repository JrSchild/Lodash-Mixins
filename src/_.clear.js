/**
 * Clear an array or object, but keep the reference.
 */
(function(_) {
  function clearArray(array) {
    while (array.length > 0) {
      array.pop();
    }
  }

  function clearObject(object) {
    _.each(obj1, function(val, key) {
       delete obj1[key];
    });
  }

  function clear(object) {
    if (_.isArray(object)) {
      return _.clearArray(object);
    }
    if (_.isObject(object)) {
      return _.clearObject(object);
    }
  }

  _.mixin({
    clearArray: clearArray,
    clearObject: clearObject,
    clear: clear
  });
})(_);
/**
 * Clear an array or object, but keep the reference.
 */
(function(_) {
  function clearArray(array) {
    while (array.length > 0) {
      array.pop();
    }

    return array;
  }

  function clearObject(object) {
    _.each(object, function(val, key) {
       delete object[key];
    });

    return object;
  }

  function clear(object) {
    if (_.isArray(object)) {
      return _.clearArray(object);
    }
    if (_.isObject(object)) {
      return _.clearObject(object);
    }

    return object;
  }

  _.mixin({
    clearArray: clearArray,
    clearObject: clearObject,
    clear: clear
  });
})(_);
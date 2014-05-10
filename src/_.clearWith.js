/**
 * Clear a data array or object with the passed object/array. It will result
 * in an empty object.
 *
 * var array = [];
 * var arrayResult = _.clearWith(array, [])
 * array.length === 0;
 * arrayResult === array;
 *
 * var object = {
 *   test: ['123']
 * }
 * objectResult = _.clearWith(object, {
 *   test: []
 * });
 *
 * This will work for any object or array and can be nested indefinite too:
 * var nestedObject = {
 *   a: [123, 456],
 * };
 * _.clearWith(nestedObject, {
 *   a: [],
 * });
 */
(function(_) {
  function clearWith(data, dataObject) {
    if (typeof data !== typeof dataObject) {
      throw new TypeError;
    }

    if (_.isUndefined(data) || _.isUndefined(dataObject)) {
      return;
    }

    if (_.isEmpty(dataObject)) {
      _.clear(data);
    } else {
      _.each(data, function(val, key) {
        clearWith(data[key], dataObject[key]);
      });
    }

    return data;
  }

  _.mixin({
    clearWith: clearWith
  });
})(_);
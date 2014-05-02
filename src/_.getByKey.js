/**
 * Get all key:value pairs from given object by each given key name
 * _.getByKey({
 *    key1: true,
 *    key2: false,
 *    key3: 123
 * }, 'key1', 'key2');
 */
(function(_) {
  function getByKey(object) {
    var keys, newObj = {};

    keys = Array.prototype.slice.call(arguments, 1);
    _.each(keys, function(key) {
      newObj[key] = object[key];
    });

    return newObj;
  }

  _.mixin({
    getByKey: getByKey
  });
})(_);
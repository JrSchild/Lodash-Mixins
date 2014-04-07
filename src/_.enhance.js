/**
 * Merge a given object with each item in array.
 * Feature:
 * _.enhance(list, value):
 * _.enhance(arr, {age: 25});
 * 
 * This could be made a lot more awesome:
 *  - Provide a callback
 *  - Check if it isn't already defined, if yes; merge (arrays) (optional)
 *  - Optional; (deep-)clone source
 *  - If an array is provided as list, the source will be added to each item
 *  in the array.
 *  - If the target-element is an array the item will be pushed (if it isn't inside yet)
 * 
 * The API could be something like this:
 * _.enhance(list, source, [callback], [options]);
 * _.enhance(list, source, [callback]);
 * _.enhance(list, source, [options]);
 * Where a callback must resolve to true in order to have that element enhanced.
 *
 * Options could be something like an object:
 * options = {
 *   cloneTarget: true,
 *   cloneSource: true,
 *   mergeTarget: true
 * }
 *
 * var listArr = [
 *   { user: 'Peter', age: 17 },
 *   { user: 'Lucy', age: 43 },
 *   { user: 'Jackson', age: 19 }
 * ];
 * 
 * var routes = {
 *   config: { url: '/config', method: 'get' },
 *   update_users: { url: '/users', method: 'put' }
 * };
 * 
 * var test = {
 *   hi: ['blue', 'orange'],
 *   lol: ['megenta', 'fuchsia']
 * };
 * 
 * _.enhance(listArr, { city: 'Amsterdam' });
 * _.enhance(routes, { data: true });
 * _.enhance(test, 'friends');
 * _.enhance(test, 'friends', {
 *   cloneTarget: true,
 *   cloneSource: true
 * });
 *
 * @param {Object} list The object to enhance
 * @param {String} source The object to set on each item in the list
 * @param {Function} [callback] Optional callback that has to resolve to true in order of the list item to be enhanced
 * @param {Object} [options] The options object
 * @param {boolean} [options.cloneTarget=true] If the returned value should be a new object or placed by reference
 * @param {boolean} [options.cloneSource=true] If the source object should be cloned
 * @param {boolean} [options.mergeTarget] When the target element is an array, should the source be appended to the array.
 * @returns {Object}
 */
(function(_) {
  function enhance(list, source, newObj) {
    return _.map(list, function(element) {
      if (newObj) {
        return _.merge({}, element, source);
      } else {
        return _.merge(element, source);
      }
    });
  }

  function enhanceClone(list, source, newObj) {
    return _.map(list, function(element) {
      if (newObj) {
        return _.merge({}, element, _.clone(source));
      } else {
        return _.merge(element, _.clone(source));
      }
    });
  }

  _.mixin({
    enhance: enhance,
    enhanceClone: enhanceClone
  });
})(_);
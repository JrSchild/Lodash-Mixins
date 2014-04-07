/**
 * Test _.clearArray
 */
(function() {
  var array = [1, 2, 3];
  var objects = [
    { 'a': 2, 'b': 2 },
    { 'a': 1, 'b': 1 },
    { 'a': 0, 'b': 0 }
  ];

  test('_.clearArray(): Clear array', 2, function() {
    var newArray = _.cloneDeep(array);
    var newArray2 = newArray;

    _.clear(newArray);
    ok(newArray.length === 0, 'Array is empty');
    ok(newArray === newArray2, 'Reference is not destroyed');
  });

  test('_.clearObject(): Clear object', 2, function() {
    var newObject = _.cloneDeep(objects);
    var newObject2 = newObject;

    _.clear(newObject);
    ok(_.keys(newObject).length === 0, 'Object is empty');
    ok(newObject === newObject2, 'Reference is not destroyed');
  });

})();

/**
 * Test _.concatAll
 */
(function() {
  var array1 = [1, 2, 3];
  var array2 = [4, 5, 6];
  var array3 = [7, 8, 9];

  test('_.concatAll(): Concat all arrays', 2, function() {
    var result = _.concatAll(array1, array2, array3);

    deepEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9], 'All arrays concatted');
    deepEqual(array1, [1, 2, 3], 'Original array is not changed');
  });
})();

/**
 * Test _.concatOn
 */
(function() {
  var array1 = [1, 2, 3];
  var array2 = [4, 5, 6];
  var array3 = [7, 8, 9];

  test('_.concatOn(): Concat all arrays on the first one', 2, function() {
    var result = _.concatOn(array1, array2, array3);

    deepEqual(array1, [1, 2, 3, 4, 5, 6, 7, 8, 9], 'All arrays concatted');
    ok(result === array1, 'Original array is changed');
  });
})();

/**
 * Test _.enhance
 */
(function() {
  var objects = [
    { 'a': 2, 'b': 2 },
    { 'a': 1, 'b': 1 },
    { 'a': 0, 'b': 0 }
  ];
  var source = { 'c': 3 };
  var end = [
    { 'a': 2, 'b': 2, 'c': 3 },
    { 'a': 1, 'b': 1, 'c': 3 },
    { 'a': 0, 'b': 0, 'c': 3 }
  ];

  test('_.enhance(): Enhance each object in a collection with given object', 4, function() {
    var newObjects, newSource, result;

    newObjects = _.cloneDeep(objects);
    newSource = _.cloneDeep(source);
    result = _.enhance(newObjects, newSource);
    ok(result === newObjects, 'The source is added by reference.');
    deepEqual(result, end, 'The element is copied to every item in the array.');

    newObjects = _.cloneDeep(objects);
    newSource = _.cloneDeep(source);
    result = _.enhance(newObjects, newSource, {
      cloneTarget: true
    });
    ok(result !== newObjects, 'The target is copied.');
    deepEqual(result, end, 'The element is copied to every item in the array');
  });

})();

/**
 * Test _.enhance
 */
(function() {
  var object = { 'a': 2, 'b': 2, 'c': 3, 'd': 0 };

  test('_.getByKey(): Get all key:value pairs from given object by each given key name', 1, function() {
    deepEqual(_.getByKey(object, 'a', 'd'), { 'a': 2, 'd': 0 }, 'The source is added by reference.');
  });

})();

/**
 * Test _.param
 */
(function() {
  var object = { 'a': 2, 'b': 2, 'c': 3, 'd': 0 };

  test('_.param(): No test coverage implemented yet.', 0, function() {});
})();

/**
 * Test _.partialScope
 */
(function() {
  function fn() {
    return {
      args: Array.prototype.slice.call(arguments, 0),
      scope: this
    };
  };

  test('_.partialScope(): Implement _.partial, but with a scope.', 2, function() {
    var func = _.partialScope([fn, 1, 2], this);
    var result = func(3);

    deepEqual(result.args, [1, 2, 3], 'All arguments are applied correctly.');
    ok(result.scope === this, 'Scope is applied correctly.');
  });
})();
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

/**
 * Test _.getObject
 * Unit-tests copied from 
 */


test('_.setObject', 15, function() {
  window.foo = {};
  
  var foo = {}, bar = 1;
  
  equal( _.setObject( 'a.b.c', 1, foo ), 1, 'local foo object updated' );
  deepEqual( foo, { a: { b: { c: 1 } } }, 'local foo object' );
  
  equal( _.setObject( 'a.b.c.d', 2, foo ), undefined, 'foo.a.b.c not an object, local foo object not updated' );
  deepEqual( foo, { a: { b: { c: 1 } } }, 'local foo object' );
  
  equal( _.setObject( 'c.d', 3, foo.a.b ), undefined, 'foo.a.b.c not an object, local foo object not updated' );
  deepEqual( foo, { a: { b: { c: 1 } } }, 'local foo object' );
  
  deepEqual( _.setObject( 'foo.d.e.f', {} ), {}, 'window.foo object updated (context omitted)' );
  deepEqual( window.foo, { d: { e: { f: {} } } }, 'window.foo object' );
  deepEqual( foo, { a: { b: { c: 1 } } }, 'local foo object' );
  
  equal( _.setObject( 'foo.d.e.f.g', 4, window ), 4, 'window.foo object updated (context specified)' );
  deepEqual( window.foo, { d: { e: { f: { g: 4 } } } }, 'window.foo object' );
  
  equal( _.setObject( 'a', 5, bar ), undefined, 'local bar not an object, not updated' );
  equal( bar, 1, 'local bar' );
  
  equal( _.setObject( 'a.b.c', 6, bar ), undefined, 'local bar not an object, not updated' );
  equal( bar, 1, 'local bar' );
});

test('_.getObject', 11, function() {
  window.foo = { a: 1 };
  
  var foo = { a: 2 }, bar = 1;
  
  equal( _.getObject( 'foo.a' ), 1, 'object and property exist (context omitted)' );
  equal( _.getObject( 'foo.a', window ), 1, 'object and property exist (context specified)' );
  equal( _.getObject( 'a', foo ), 2, 'object and property exist' );
  equal( _.getObject( 'b', foo ), undefined, 'foo.b does not exist' );
  
  equal( _.getObject( 'a', bar ), undefined, 'bar is not an object' );
  equal( _.getObject( 'a.b.c', bar ), undefined, 'bar is not an object' );
  
  equal( _.getObject( 'b.c', true, foo ), foo.b.c, 'foo.b.c didn\'t exist, but is created' );
  deepEqual( foo, { a: 2, b: { c: {} } }, 'local foo object' );
  
  foo.b.c = 3;
  
  equal( _.getObject( 'b.c', true, foo ), 3, 'object and property exist' );
  equal( _.getObject( 'b.c.d', true, foo ), undefined, 'foo.b.c.d not an object, local foo object not updated' );
  deepEqual( foo, { a: 2, b: { c: 3 } }, 'local foo object' );
});

test('_.objectExists', 18, function() {
  window.foo = { a1: 1, b1: 0, c1: false, d1: null, e1: '' };
  
  var foo = { a0: 1, b0: 0, c0: false, d0: null, e0: '' };
  
  equal( _.objectExists( 'a0', foo ), true, 'property is defined, truthy' );
  equal( _.objectExists( 'b0', foo ), true, 'property is defined, falsy' );
  equal( _.objectExists( 'c0', foo ), true, 'property is defined, falsy' );
  equal( _.objectExists( 'd0', foo ), true, 'property is defined, falsy' );
  equal( _.objectExists( 'e0', foo ), true, 'property is defined, falsy' );
  equal( _.objectExists( 'f0', foo ), false, 'property is not defined' );
  
  equal( _.objectExists( 'foo.a1', window ), true, 'property is defined, truthy' );
  equal( _.objectExists( 'foo.b1', window ), true, 'property is defined, falsy' );
  equal( _.objectExists( 'foo.c1', window ), true, 'property is defined, falsy' );
  equal( _.objectExists( 'foo.d1', window ), true, 'property is defined, falsy' );
  equal( _.objectExists( 'foo.e1', window ), true, 'property is defined, falsy' );
  equal( _.objectExists( 'foo.f1', window ), false, 'property is not defined' );
  
  equal( _.objectExists( 'foo.a1' ), true, 'property is defined, truthy' );
  equal( _.objectExists( 'foo.b1' ), true, 'property is defined, falsy' );
  equal( _.objectExists( 'foo.c1' ), true, 'property is defined, falsy' );
  equal( _.objectExists( 'foo.d1' ), true, 'property is defined, falsy' );
  equal( _.objectExists( 'foo.e1' ), true, 'property is defined, falsy' );
  equal( _.objectExists( 'foo.f1' ), false, 'property is not defined' );
});
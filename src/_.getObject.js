/**
 * Get and set deep objects easily.
 * http://benalman.com/projects/jquery-getobject-plugin/
 */
(function(_) {
  function getObject( parts, create, obj ) {
    if ( typeof parts === 'string' ) {
      parts = parts.split('.');
    }
    
    if ( typeof create !== 'boolean' ) {
      obj = create;
      create = undefined;
    }
    
    obj = obj || window;
    
    var p;
    
    while ( obj && parts.length ) {
      p = parts.shift();
      if ( obj[p] === undefined && create ) {
        obj[p] = {};
      }
      obj = obj[p];
    }
    
    return obj;
  };

  function setObject( name, value, context ) {
    var parts = name.split('.'),
      prop = parts.pop(),
      obj = getObject( parts, true, context );
    
    // Only return the value if it is set successfully.
    return obj && typeof obj === 'object' && prop
      ? ( obj[prop] = value )
      : undefined;
  }

  function objectExists( name, context ) {
    return getObject( name, context ) !== undefined;
  }

  _.mixin({
    getObject: getObject,
    setObject: setObject,
    objectExists: objectExists
  });
})(_);
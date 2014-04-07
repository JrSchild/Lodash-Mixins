/**
 * Call _.partial but pass in a scope. Wrap all arguments that you would
 * normaly pass to _.partial in an array and place in the first argument.
 * Second argument should be the scope to use.
 */
(function() {
  function partialScope(args, scope) {
    // Tell the function (first index of args) to use the scope.
    if (scope && args[0]) {
      args[0] = _.bind(args[0], scope);
    }

    return _.partial.apply(this, args);
  };

  _.mixin({
    partialScope: partialScope
  });
})();
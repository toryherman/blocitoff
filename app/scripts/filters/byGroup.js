(function() {
  function byGroup() {
    return function(input, groupId) {
      var output = [];
      for (var i = 0; i < input.length; i++) {
        if (input[i].groupId === groupId) {
          output.push(input[i]);
        }
      }
      return output;
    };
  }

  angular
    .module('blocitoff')
    .filter('byGroup', byGroup);
})();

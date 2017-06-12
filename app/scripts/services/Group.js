(function() {
  function Group($firebaseArray) {
    var Group = {};
    var ref = firebase.database().ref().child('groups');
    var groups = $firebaseArray(ref);

    Group.getGroups = function() {
      return groups;
    };

    Group.addGroup = function(item) {
      groups.$add({
        'name': item
      });
    };

    return Group;
  }

  angular
    .module('blocitoff')
    .factory('Group', ['$firebaseArray', Group]);
})();

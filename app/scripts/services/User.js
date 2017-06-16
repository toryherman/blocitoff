(function() {
  function User($firebaseArray) {
    var ref = firebase.database().ref().child('users');
    var users = $firebaseArray(ref);

    // local functions
    var getIndex = function(id) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].uid == id) {
          return i;
        }
      }
    };

    // global functions
    User.getUsers = function() {
      return users;
    };

    User.createNewUser = function(user) {
      users.$add({
        'name': user.displayName,
        'email': user.email,
        'uid': user.uid,
        'currentGroupId': ''
      });
    };

    User.setCurrentGroup = function(groupId, uid) {
      var index = getIndex(uid);
      users[index].currentGroupId = groupId;
      users.$save(index);
    };

    return User;
  }

  angular
    .module('blocitoff')
    .factory('User', ['$firebaseArray', User]);
})();

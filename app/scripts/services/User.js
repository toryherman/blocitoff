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

    User.setCurrentUser = function(uid) {
      users.$loaded().then(function() {
        var index = getIndex(uid);
        User.currentGroup = users[index].currentGroup;
      });
    };

    User.createNewUser = function(user) {
      users.$add({
        'name': user.displayName,
        'email': user.email,
        'uid': user.uid,
        'currentGroup': {
          'id': '',
          'name': ''
        }
      });
    };

    User.setCurrentGroup = function(groupId, groupName, uid) {
      var index = getIndex(uid);
      User.currentGroup = {
        'id': groupId,
        'name': groupName
      };
      users[index].currentGroup = User.currentGroup;
      users.$save(index);
    };

    return User;
  }

  angular
    .module('blocitoff')
    .factory('User', ['$firebaseArray', User]);
})();

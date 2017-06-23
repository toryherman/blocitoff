(function() {
  function User($firebaseArray) {
    var ref = firebase.database().ref().child('users');
    var users = $firebaseArray(ref);

    // local functions
    var getIndex = function(uid) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].$id == uid) {
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
        User.displayName = users[index].name;
      });
    };

    User.createNewUser = function(user) {
      ref.child(user.uid).set({
        'name': user.displayName,
        'email': user.email,
        'currentGroup': {
          'id': '',
          'name': ''
        }
      });
    };

    User.setCurrentGroup = function(groupId, groupName) {
      var uid = firebase.auth().currentUser.uid;
      var index = getIndex(uid);

      if (groupId) {
        User.currentGroup = {
          'id': groupId,
          'name': groupName
        };
      } else {
        User.currentGroup = {
          'id': '',
          'name': ''
        };
      }

      users[index].currentGroup = User.currentGroup;
      users.$save(index);
    };

    return User;
  }

  angular
    .module('blocitoff')
    .factory('User', ['$firebaseArray', User]);
})();

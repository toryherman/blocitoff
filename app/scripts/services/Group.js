(function() {
  function Group($firebaseArray, Auth, Task, User) {
    var Group = {};
    var ref;
    var groups;

    Auth.authObj.$onAuthStateChanged(function(user) {
      if (user) {
        ref = firebase.database().ref().child('groups/' + user.uid);
        groups = $firebaseArray(ref);
      } else {
        ref = null;
        groups = null;
      }
    });

    // local functions
    var getIndex = function(id) {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].$id == id) {
          return i;
        }
      }
    };

    // global functions
    Group.getGroups = function() {
      return groups;
    };

    Group.addGroup = function(item, uid) {
      groups.$add({
        'name': item
      }).then(function() {
        User.setCurrentGroup(groups[groups.length - 1].$id, groups[groups.length - 1].name);
      }, function(error) {
        console.log(error);
      });
    };

    Group.deleteGroup = function(id) {
      var index = getIndex(id);
      groups.$remove(index).then(function() {
        if (groups[groups.length - 1]) {
          User.setCurrentGroup(groups[groups.length - 1].$id, groups[groups.length - 1].name);
        } else {
          User.setCurrentGroup(null);
        }
      }, function(error) {
        console.log(error);
      });

      var tasks = Task.getTasks();
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].groupId == id) {
          Task.deleteTask(tasks[i].$id);
        }
      }
    };

    return Group;
  }

  angular
    .module('blocitoff')
    .factory('Group', ['$firebaseArray', 'Auth', 'Task', 'User', Group]);
})();

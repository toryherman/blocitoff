(function() {
  function Group($firebaseArray, Task, User) {
    var Group = {};
    var ref = firebase.database().ref().child('groups').orderByChild('uid');
    var groups = $firebaseArray(ref);

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
        'name': item,
        'uid': uid
      }).then(function() {
        Group.setGroup(groups[groups.length - 1].$id, groups[groups.length - 1].name, uid);
      }, function(error) {
        console.log(error);
      });
    };

    Group.deleteGroup = function(id) {
      var index = getIndex(id);
      groups.$remove(index);

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
    .factory('Group', ['$firebaseArray', 'Task', 'User', Group]);
})();

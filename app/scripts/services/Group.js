(function() {
  function Group($firebaseArray, Task) {
    var Group = {};
    var ref = firebase.database().ref().child('groups').orderByChild('userId');
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
    Group.currentGroup = null;

    Group.setGroup = function(groupId, groupName) {
      Group.currentGroup = {
        'id': groupId,
        'name': groupName
      };
      console.log(Group.currentGroup.id, Group.currentGroup.name);
    };

    Group.getGroups = function() {
      return groups;
    };

    Group.addGroup = function(item, userId) {
      groups.$add({
        'name': item,
        'userId': userId
      }).then(function() {
        Group.setGroup(groups[groups.length - 1].$id, groups[groups.length - 1].name);
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
    .factory('Group', ['$firebaseArray', 'Task', Group]);
})();

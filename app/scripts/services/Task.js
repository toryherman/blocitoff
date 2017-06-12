(function() {
  function Task($firebaseArray, byGroupFilter) {
    var Task = {};
    var ref = firebase.database().ref().child('tasks').orderByChild('rank');
    var tasks = $firebaseArray(ref);

    // local functions
    var getIndex = function(id) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].$id == id) {
          return i;
        }
      }
    };


    // global functions
    Task.getTasks = function(groupId) {
      return filteredTasks = byGroupFilter(tasks, groupId);
    };

    Task.addTask = function(item, groupId) {
      tasks.$add({
        'content': item,
        'rank': (tasks.length + 1) * 10000,
        'created_at': firebase.database.ServerValue.TIMESTAMP,
        'groupId': groupId
      });
    };

    Task.deleteTask = function(id) {
      var index = getIndex(id);
      tasks.$remove(index);
    };

    Task.updateIndex = function(id, rankBefore, rankAfter) {
      var index = getIndex(id);

      if (rankBefore && rankAfter) {
        tasks[index].rank = (rankBefore + rankAfter) / 2;
      } else if (rankBefore === undefined) {
        tasks[index].rank = rankAfter - 5000;
      } else if (rankAfter === undefined) {
        tasks[index].rank = rankBefore + 5000;
      }

      tasks.$save(index);
    };

    return Task;
  }

  angular
    .module('blocitoff')
    .factory('Task', ['$firebaseArray', 'byGroupFilter', Task]);
})();

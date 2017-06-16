(function() {
  function Task($firebaseArray) {
    var Task = {};
    var ref = firebase.database().ref().child('tasks').orderByChild('uid');
    var tasks = $firebaseArray(ref);
    var max = 0;

    // local functions
    var getIndex = function(id) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].$id == id) {
          return i;
        }
      }
    };

    var getMax = function() {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].rank > max) {
          max = tasks[i].rank;
        }
      }
    };

    // global functions
    Task.getTasks = function() {
      return tasks;
    };

    Task.addTask = function(item, groupId, uid) {
      getMax();
      max += 10000;

      tasks.$add({
        'content': item,
        'rank': max,
        'groupId': groupId,
        'uid': uid
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
    .factory('Task', ['$firebaseArray', Task]);
})();

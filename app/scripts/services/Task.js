(function() {
  function Task($firebaseArray) {
    var Task = {};

    var ref = firebase.database().ref().child("tasks");
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
    Task.getTasks = function() {
      return tasks;
    };

    Task.addTask = function(item) {
      tasks.$add({
        'content': item,
        'rank': (tasks.length + 1) * 10000,
        'created_at': firebase.database.ServerValue.TIMESTAMP
      });
    };

    Task.deleteTask = function(id) {
      var index = getIndex(id);
      tasks.$remove(index);
    };

    Task.minusIndex = function(id, rank1, rank2) {
      var index = getIndex(id);
      if (rank2) {
        tasks[index].rank = (rank1 + rank2) / 2;
      } else {
        tasks[index].rank = rank1 - 5000;
      }
      tasks.$save(index);
    };

    Task.plusIndex = function(id, rank1, rank2) {
      var index = getIndex(id);
      if (rank2) {
        tasks[index].rank = (rank1 + rank2) / 2;
      } else {
        tasks[index].rank = rank1 + 5000;
      }
      tasks.$save(index);
    };

    return Task;
  }

  angular
    .module('blocitoff')
    .factory('Task', ['$firebaseArray', Task]);
})();

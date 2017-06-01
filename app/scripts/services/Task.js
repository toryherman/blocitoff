(function() {
  function Task($firebaseArray) {
    var Task = {};

    var ref = firebase.database().ref().child("tasks");
    var tasks = $firebaseArray(ref);

    var getIndex = function(id) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].$id == id) {
          return i;
        }
      }
    }

    Task.getTasks = function() {
      return tasks;
    };

    Task.addTask = function(item) {
      tasks.$add({
        'content': item,
        'index': tasks.length
      });
    };

    Task.deleteTask = function(id) {
      var index = getIndex(id);
      tasks.$remove(index);
    }

    Task.minusIndex = function(id) {
      var index = getIndex(id);
      tasks[index].index--;
      tasks.$save(index);
    }

    Task.plusIndex = function(id) {
      var index = getIndex(id);
      tasks[index].index++;
      tasks.$save(index);
    }

    return Task;
  }

  angular
    .module('blocitoff')
    .factory('Task', ['$firebaseArray', Task]);
})();

(function() {
  function Task($firebaseArray) {
    var Task = {};

    var ref = firebase.database().ref().child("tasks");
    var tasks = $firebaseArray(ref);

    Task.getTasks = function() {
      return tasks;
    };

    Task.addTask = function(item) {
      tasks.$add(item);
    };

    return Task;
  }

  angular
    .module('blocitoff')
    .factory('Task', ['$firebaseArray', Task]);
})();

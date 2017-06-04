(function() {
  function HomeCtrl($scope, Task) {
    this.tasks = Task.getTasks();

    this.createNewTask = function(event) {
      // function only executes on enter keypress
      if (event && event.keyCode !== 13) { return };
      Task.addTask($scope.newTask);
      $scope.newTask = '';
    };

    this.deleteTask = function(element) {
      Task.deleteTask(element.task.$id);
    };

    this.moveUpTask = function(element) {
      if (!element.$first) {
        Task.minusIndex(element.task.$id);
      }
    };

    this.moveDownTask = function(element) {
      if (!element.$last) {
        Task.plusIndex(element.task.$id);
      }
    };

    this.getAge = function(element) {
      // only shows tasks younger than specified age in Task.js
      return Task.getAge(element.task.$id);
    }
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['$scope', 'Task', HomeCtrl]);
})();

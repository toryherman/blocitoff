(function() {
  function HomeCtrl($scope, Task) {
    this.tasks = Task.getTasks();

    $scope.createNewTask = function(event) {
      // function only executes on enter keypress
      if (event && event.keyCode !== 13) { return };
      Task.addTask($scope.newTask);
      $scope.newTask = '';
    };

    $scope.deleteTask = function(element) {
      Task.deleteTask(element.task.$id);
    };

    $scope.moveUpTask = function(element) {
      if (!element.$first) {
        Task.minusIndex(element.task.$id);
      }
    };

    $scope.moveDownTask = function(element) {
      if (!element.$last) {
        Task.plusIndex(element.task.$id);
      }
    };
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['$scope', 'Task', HomeCtrl]);
})();

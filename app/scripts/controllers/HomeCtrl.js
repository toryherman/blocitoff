(function() {
  function HomeCtrl($scope, Task) {
    this.tasks = Task.getTasks();

    $scope.createNewTask = function(event) {
      // function only executes on enter keypress
      if (event && event.keyCode !== 13) { return };
      Task.addTask($scope.newTask);
      $scope.newTask = '';
    }

    $scope.deleteTask = function(element) {
      Task.deleteTask(element.$index);
    }
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['$scope', 'Task', HomeCtrl]);
})();

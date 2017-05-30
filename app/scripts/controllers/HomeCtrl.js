(function() {
  function HomeCtrl($scope, Task) {
    this.tasks = Task.getTasks();

    $scope.createNewTask = function() {
      Task.addTask($scope.newTask);
      $scope.newTask = '';
    }
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['$scope', 'Task', HomeCtrl]);
})();

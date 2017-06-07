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
      var index = element.$index;
      var id = element.task.$id;

      if (index == 0) {
        return;
      } else if (index > 1){
        var rank2 = $scope.filteredTasks[index - 2].rank;
      }

      var rank1 = $scope.filteredTasks[index - 1].rank;

      Task.minusIndex(id, rank1, rank2 = rank2 || null);
    };

    this.moveDownTask = function(element) {
      var index = element.$index;
      var id = element.task.$id;

      if (element.$last) {
        return;
      } else if (index < $scope.filteredTasks.length - 2) {
        var rank2 = $scope.filteredTasks[index + 2].rank;
      }

      var rank1 = $scope.filteredTasks[index + 1].rank;

      Task.plusIndex(id, rank1, rank2 = rank2 || null);
    };
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['$scope', 'Task', HomeCtrl]);
})();

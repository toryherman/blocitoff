(function() {
  function HomeCtrl($scope, orderBy, Task) {
    var home = this;
    this.tasks = Task.getTasks();
    this.sortableOptions = {
      axis: 'y',
      stop: function(event, ui) {
        var newIndex = ui.item.sortable.dropindex;
        if ((home.tasks.length > 1) && (newIndex !== undefined)) {
          home.updateTask(newIndex);
        }
      }
    };

    this.createNewTask = function(event) {
      // function only executes on enter keypress
      if (event && event.keyCode !== 13) { return };
      Task.addTask($scope.newTask);
      $scope.newTask = '';
    };

    this.deleteTask = function(element) {
      Task.deleteTask(element.task.$id);
    };

    this.updateTask = function(newIndex) {
      var index = newIndex;
      var task = home.tasks[index];
      var id = task.$id;

      if (home.tasks[index - 1]) {
        var rankBefore = home.tasks[index - 1].rank;
      }

      if (home.tasks[index + 1]) {
        var rankAfter = home.tasks[index + 1].rank;
      }

      Task.updateIndex(id, rankBefore, rankAfter);
    };
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['$scope', 'orderByFilter', 'Task', HomeCtrl]);
})();

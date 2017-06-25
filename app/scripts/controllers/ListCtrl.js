(function() {
  function ListCtrl($scope, Auth, Group, Task, User) {
    var self = this;
    self.sortableOptions = {
      axis: 'y',
      stop: function(event, ui) {
        var newIndex = ui.item.sortable.dropindex;
        if ((self.tasks.length > 1) && (newIndex !== undefined)) {
          self.updateTask(newIndex);
        }
      }
    };

    // Task
    $scope.$watch(
      function() { return Task.getTasks(); },
      function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.tasks = Task.getTasks();
        }
      }, true
    );

    self.createNewTask = function(event) {
      // function only executes on enter keypress
      if (event && event.keyCode !== 13) { return };
      Task.addTask($scope.newTask, self.currentGroup.id, self.uid);
      $scope.newTask = '';
    };

    self.deleteTask = function(element) {
      Task.deleteTask(element.task.$id);
    };

    self.updateTask = function(newIndex) {
      var index = newIndex;
      var task = self.tasks[index];
      var id = task.$id;

      if (self.tasks[index - 1]) {
        var rankBefore = self.tasks[index - 1].rank;
      }

      if (self.tasks[index + 1]) {
        var rankAfter = self.tasks[index + 1].rank;
      }

      Task.updateIndex(id, rankBefore, rankAfter);
    };

    // User
    $scope.$watch(
      function() { return User.currentGroup; },
      function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.currentGroup = newValue;
        }
      }, true
    );

    $scope.$watch(
      function() { return User.displayName; },
      function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.displayName = newValue;
        }
      }, true
    );

    // Auth
    $scope.$watch(
      function() { return Auth.uid; },
      function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.uid = newValue;
        }
      }
    );
  }

  angular
    .module('blocitoff')
    .controller('ListCtrl', ['$scope', 'Auth', 'Group', 'Task', 'User', ListCtrl]);
})();

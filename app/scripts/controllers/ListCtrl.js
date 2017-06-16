(function() {
  function ListCtrl($scope, Auth, Task, Group) {
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


    // Auth
    self.authObj = Auth.authObj;


    // Task
    self.tasks = Task.getTasks();

    self.createNewTask = function(event) {
      // function only executes on enter keypress
      if (event && event.keyCode !== 13) { return };
      Task.addTask($scope.newTask, self.groupId, self.uid);
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


    // Group
    self.groups = Group.getGroups();

    $scope.$watch(
      function() {
        return Group.currentGroup;
      },
      function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.currentGroup.id = newValue.id;
          self.currentGroup.name = newValue.name;
          console.log(self.currentGroup.id);
        }
      }, true
    );
  }

  angular
    .module('blocitoff')
    .controller('ListCtrl', ['$scope', 'Auth', 'Task', 'Group', ListCtrl]);
})();

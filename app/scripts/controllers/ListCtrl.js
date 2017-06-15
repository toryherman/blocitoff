(function() {
  function ListCtrl($scope, Auth, Task, Group) {
    var list = this;
    list.sortableOptions = {
      axis: 'y',
      stop: function(event, ui) {
        var newIndex = ui.item.sortable.dropindex;
        if ((list.tasks.length > 1) && (newIndex !== undefined)) {
          list.updateTask(newIndex);
        }
      }
    };


    // Auth
    list.authObj = Auth.authObj;


    // Task
    list.tasks = Task.getTasks();

    list.createNewTask = function(event) {
      // function only executes on enter keypress
      if (event && event.keyCode !== 13) { return };
      Task.addTask($scope.newTask, list.groupId, list.userId);
      $scope.newTask = '';
    };

    list.deleteTask = function(element) {
      Task.deleteTask(element.task.$id);
    };

    list.updateTask = function(newIndex) {
      var index = newIndex;
      var task = list.tasks[index];
      var id = task.$id;

      if (list.tasks[index - 1]) {
        var rankBefore = list.tasks[index - 1].rank;
      }

      if (list.tasks[index + 1]) {
        var rankAfter = list.tasks[index + 1].rank;
      }

      Task.updateIndex(id, rankBefore, rankAfter);
    };


    // Group
    list.groups = Group.getGroups();

    list.$watch(function() {
        return Group.currentGroup.id;
      }, function(newValue, oldValue) {
        if (newValue) {
          list.currentGroup.id = newValue;
          console.log(list.currentGroup.id)
        }
      }
    );
  }

  angular
    .module('blocitoff')
    .controller('ListCtrl', ['$scope', 'Auth', 'Task', 'Group', ListCtrl]);
})();

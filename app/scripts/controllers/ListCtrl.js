(function() {
  function ListCtrl($scope, orderBy, Task, Group) {
    var list = this;
    this.groups = Group.getGroups();
    this.groupId = '';
    this.groupName = '';

    this.setGroupId = function(element) {
      list.groupId = element.group.$id;
      list.groupName = element.group.name;
      this.tasks = Task.getTasks(list.groupId);
    }

    this.sortableOptions = {
      axis: 'y',
      stop: function(event, ui) {
        var newIndex = ui.item.sortable.dropindex;
        if ((list.tasks.length > 1) && (newIndex !== undefined)) {
          list.updateTask(newIndex);
        }
      }
    };

    this.createNewGroup = function() {
      var newGroupName = prompt('New room name:');
      Group.addGroup(newGroupName);
    }

    this.createNewTask = function(event) {
      // function only executes on enter keypress
      if (event && event.keyCode !== 13) { return };
      Task.addTask($scope.newTask, list.groupId);
      $scope.newTask = '';
    };

    this.deleteTask = function(element) {
      Task.deleteTask(element.task.$id);
    };

    this.updateTask = function(newIndex) {
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
  }

  angular
    .module('blocitoff')
    .controller('ListCtrl', ['$scope', 'orderByFilter', 'Task', 'Group', ListCtrl]);
})();

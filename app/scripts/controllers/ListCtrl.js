(function() {
  function ListCtrl($scope, $firebaseAuth, Task, Group) {
    var list = this;
    list.groups = Group.getGroups();
    list.groupId = '';
    list.groupName = '';
    list.userId = '8675309'

    list.tasks = Task.getTasks();

    list.setGroupId = function(element) {
      list.groupId = element.group.$id;
      list.groupName = element.group.name;
    };

    // list.authObj = $firebaseAuth();
    //
    // list.login = function() {
    //   list.authObj.$authWithOAuthPopup('google').then(function(authData) {
    //     console.log('logged in as:', authData.uid);
    //   }).catch(function(error) {
    //     console.error('auth failed:', error);
    //   });
    // };

    list.sortableOptions = {
      axis: 'y',
      stop: function(event, ui) {
        var newIndex = ui.item.sortable.dropindex;
        if ((list.tasks.length > 1) && (newIndex !== undefined)) {
          list.updateTask(newIndex);
        }
      }
    };

    list.createNewGroup = function() {
      var newGroupName = prompt('New room name:');
      Group.addGroup(newGroupName, list.userId);
    };

    list.deleteGroup = function(element) {
      Group.deleteGroup(element.group.$id);
    };

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
  }

  angular
    .module('blocitoff')
    .controller('ListCtrl', ['$scope', '$firebaseAuth', 'Task', 'Group', ListCtrl]);
})();

(function() {
  function HeadCtrl($scope, Auth, Group, User) {
    var self = this;

    // Auth
    self.login = function() {
      Auth.login();
    };

    self.logout = function() {
      Auth.logout();
    };

    $scope.$watch(
      function() { return Auth.uid; },
      function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.uid = newValue;
        }
      }
    );

    // Group
    self.groups = Group.getGroups();

    self.createNewGroup = function() {
      var newGroupName = prompt('New group name:');
      Group.addGroup(newGroupName, self.uid);
    };

    self.deleteGroup = function(element) {
      Group.deleteGroup(element.group.$id);
    };

    // User
    self.setCurrentGroup = function(element) {
      User.setCurrentGroup(element.group.$id, element.group.uid);
    };

    $scope.$watch(
      function() { return User.currentGroupId },
      function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.currentGroupId = newValue;
        }
      }
    );
  }

  angular
    .module('blocitoff')
    .controller('HeadCtrl', ['$scope', 'Auth', 'Group', 'User', HeadCtrl]);
})();

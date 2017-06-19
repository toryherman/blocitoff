(function() {
  function HeadCtrl($scope, Auth, Group, User) {
    var self = this;

    self.init = function() {
      Auth.init();
    };

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

    $scope.$watch(
      function() { return Auth.photoURL; },
      function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.photoURL = newValue;
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
      User.setCurrentGroup(element.group.$id, element.group.name, element.group.uid);
    };

    $scope.$watch(
      function() { return User.currentGroup },
      function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.currentGroup = newValue;
        }
      }, true
    );

    $scope.$watch(
      function() { return User.displayName },
      function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.displayName = newValue;
        }
      }
    );
  }

  angular
    .module('blocitoff')
    .controller('HeadCtrl', ['$scope', 'Auth', 'Group', 'User', HeadCtrl]);
})();

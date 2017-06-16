(function() {
  function HeadCtrl($scope, Auth, Group) {
    var self = this;


    // Auth
    self.authObj = Auth.authObj;
    self.authObj.$onAuthStateChanged(function(user) {
      if (user) {
        self.uid = user.uid;
      } else {
        self.uid = '';
      }
    });

    self.login = function() {
      Auth.login();
    };

    self.logout = function() {
      Auth.logout();
    };


    // Group
    self.groups = Group.getGroups();

    self.setGroup = function(element) {
      self.groupId = element.group.$id;
      self.groupName = element.group.name;
      Group.setGroup(self.groupId, self.groupName, element.group.uid);
    };

    self.createNewGroup = function() {
      var newGroupName = prompt('New room name:');
      Group.addGroup(newGroupName, self.uid);
    };

    self.deleteGroup = function(element) {
      Group.deleteGroup(element.group.$id);
    };
  }

  angular
    .module('blocitoff')
    .controller('HeadCtrl', ['$scope', 'Auth', 'Group', HeadCtrl]);
})();

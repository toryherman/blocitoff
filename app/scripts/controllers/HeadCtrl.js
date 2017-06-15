(function() {
  function HeadCtrl($scope, Auth, Group) {
    var head = this;


    // Auth
    head.authObj = Auth.authObj;
    head.authObj.$onAuthStateChanged(function(user) {
      if (user) {
        head.userId = user.uid;
      } else {
        head.userId = '';
      }
    });

    head.login = function() {
      Auth.login();
    };

    head.logout = function() {
      Auth.logout();
    };


    // Group
    head.groups = Group.getGroups();

    head.setGroup = function(element) {
      head.groupId = element.group.$id;
      head.groupName = element.group.name;
      Group.setGroup(head.groupId, head.groupName);
    };

    head.createNewGroup = function() {
      var newGroupName = prompt('New room name:');
      Group.addGroup(newGroupName, head.userId);
    };

    head.deleteGroup = function(element) {
      Group.deleteGroup(element.group.$id);
    };
  }

  angular
    .module('blocitoff')
    .controller('HeadCtrl', ['$scope', 'Auth', 'Group', HeadCtrl]);
})();

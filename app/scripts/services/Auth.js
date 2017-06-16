(function() {
  function Auth($firebaseAuth, User) {
    var auth = firebase.auth();
    var users = User.getUsers();
    Auth.authObj = $firebaseAuth(auth);

    Auth.login = function() {
      Auth.authObj.$signInWithPopup('google').then(function(authData) {
        for (var i = 0; i < users.length; i++) {
          if (users[i].$id === authData.user.uid) { return; }
        }
        User.createNewUser(authData.user);
      }).catch(function(error) {
        // console.log(error);
      });
    };

    Auth.logout = function() {
      Auth.authObj.$signOut();
    };

    return Auth;
  }

  angular
    .module('blocitoff')
    .factory('Auth', ['$firebaseAuth', 'User', Auth]);
})();

(function() {
  function Auth($firebaseAuth, User) {
    var auth = firebase.auth();
    var users = User.getUsers();
    Auth.authObj = $firebaseAuth(auth);

    Auth.init = function() {
      if (Auth.authObj.$getAuth()) {
        self.uid = Auth.authObj.$getAuth().uid;
        User.setCurrentUser(self.uid);
      }
    };

    Auth.authObj.$onAuthStateChanged(function(user) {
      if (user) {
        Auth.uid = user.uid;
      } else {
        Auth.uid = '';
      }
    });

    Auth.login = function() {
      Auth.authObj.$signInWithPopup('google').then(function(authData) {
        Auth.uid = Auth.authObj.$getAuth().uid;
        User.setCurrentUser(Auth.uid);
        for (var i = 0; i < users.length; i++) {
          if (users[i].uid === authData.user.uid) { return; }
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

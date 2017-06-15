(function() {
  function Auth($firebaseAuth) {
    var auth = firebase.auth();
    Auth.authObj = $firebaseAuth(auth);

    Auth.login = function() {
      Auth.authObj.$signInWithPopup('google').then(function(authData) {
        // console.log(authData);
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
    .factory('Auth', ['$firebaseAuth', Auth]);
})();

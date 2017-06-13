(function() {
  function Auth($firebaseAuth) {
    var ref = firebase;
    var authObj = $firebaseAuth(ref);

    Auth.login = function() {
      console.log(ref);
      ref.authWithOAuthPopup('google').then(function(authData) {
        console.log('logged in as:', authData.uid);
      }).catch(function(error) {
        console.error('auth failed:', error);
      });
    };

    return Auth;
  }

  angular
    .module('blocitoff')
    .factory('Auth', ['$firebaseAuth', Auth]);
})();

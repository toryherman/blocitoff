(function() {
  function config($locationProvider, $stateProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('list', {
        url: '/',
        controller: 'ListCtrl as list',
        templateUrl: '/templates/list.html'
      })
  }

  angular
    .module('blocitoff', ['ui.router', 'ui.sortable', 'firebase'])
    .config(config);
})();

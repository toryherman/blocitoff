(function() {
  function config($locationProvider, $stateProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('head', {
        controller: 'HeadCtrl as head',
        templateUrl: '/templates/head.html'
      })
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

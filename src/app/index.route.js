(function() {
  'use strict';

  angular
    .module('petsyUi')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/storefront/storefront.html',
        controller: 'StorefrontController',
        controllerAs: 'storefront',
        resolve: {
          pets: function(petStore) {
            return petStore.getAllPets();
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();

(function() {
  'use strict';

  angular
    .module('petsyUi')
    .controller('StorefrontController', StorefrontController);

  /** @ngInject */
  function StorefrontController($log) {
    var vm = this;

    vm.pet = {};
    vm.pet.kind = 'What kind of pet?';
    vm.kindsofPets = ['Cat', 'Dog', 'Fish', 'Hamster'];

    vm.chooseKindOfPet = function(kindOfPetChosen) {
      vm.pet.kind = kindOfPetChosen;
    };

    vm.addAPet = function() {
      $log.info('You are adding ', vm.pet);
    };
  }
})();

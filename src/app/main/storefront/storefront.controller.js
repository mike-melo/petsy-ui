(function() {
  'use strict';

  angular
    .module('petsyUi')
    .controller('StorefrontController', StorefrontController);

  /** @ngInject */
  function StorefrontController($log, $timeout) {
    var vm = this;

    vm.pet = {};
    vm.pets = [];
    vm.pet.kind = 'What kind of pet?';
    vm.kindsofPets = ['Cat', 'Dog', 'Fish', 'Hamster'];

    vm.chooseKindOfPet = function(kindOfPetChosen) {
      vm.pet.kind = kindOfPetChosen;
    };

    vm.addAPet = function() {
      var newPet = Object.assign({}, vm.pet);
      newPet.description = newPet.name + ', ' + newPet.kind;
      vm.pets.push(newPet);
    };
  }
})();

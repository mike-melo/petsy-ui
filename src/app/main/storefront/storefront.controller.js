(function() {
  'use strict';

  angular
    .module('petsyUi')
    .controller('StorefrontController', StorefrontController);

  /** @ngInject */
  function StorefrontController(petsService, pets) {
    var vm = this;

    vm.pets = pets;

    vm.pet = {};
    vm.pet.kind = 'What kind of pet?';
    vm.kindsofPets = ['Cat', 'Dog', 'Fish', 'Hamster'];

    vm.chooseKindOfPet = function(kindOfPetChosen) {
      vm.pet.kind = kindOfPetChosen;
    };

    vm.addAPet = function() {
      petsService.addPet(vm.pet).then(function(addedPet){
        vm.pets.push(addedPet);
      });
    };
  }
})();

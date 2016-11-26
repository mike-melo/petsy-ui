(function() {
  'use strict';

  angular
    .module('petsyUi')
    .controller('StorefrontController', StorefrontController);

  /** @ngInject */
  function StorefrontController(petsService, $log) {
    var vm = this;

    petsService.getAllPets().then(function(pets){
      vm.pets = pets;
    });

    vm.pet = {};
    vm.pet.kind = 'What kind of pet?';
    vm.kindsofPets = ['Cat', 'Dog', 'Fish', 'Hamster'];

    vm.chooseKindOfPet = function(kindOfPetChosen) {
      vm.pet.kind = kindOfPetChosen;
    };

    vm.addAPet = function() {
      var newPet = Object.assign({}, vm.pet);
      newPet.description = newPet.name + ', ' + newPet.kind;
      petsService.addPet(newPet);
      vm.pets.push(newPet);
    };
  }
})();

(function () {
  'use strict';

  angular
    .module('petsyUi')
    .controller('StorefrontController', StorefrontController);

  /** @ngInject */
  function StorefrontController(petsService, pets) {
    var vm = this;

    vm.pets = pets;

    vm.pet = {};
    vm.pet.kind = 'Dog';
    vm.kindsofPets = ['Cat', 'Dog', 'Fish', 'Hamster'];

    vm.chooseKindOfPet = function (kindOfPetChosen) {
      vm.pet.kind = kindOfPetChosen;
    };

    vm.addAPet = function () {
      petsService.addPet(vm.pet).then(function (addedPet) {
        vm.pets.push(addedPet);
      });
    };

    vm.removePet = function (pet) {
      petsService.removePet(pet).then(function () {
        var index = vm.pets.indexOf(pet);
        if (index > -1) {
          vm.pets.splice(index, 1);
        }
      });
    };
  }
})();

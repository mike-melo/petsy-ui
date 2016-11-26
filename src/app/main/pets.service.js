(function () {
  'use strict';

  angular
    .module('petsyUi')
    .service('petsService', petsService);

  /** @ngInject */
  function petsService(petsApi) {

    var petsService = {
      getAllPets: getAllPets,
      removePet: removePet,
      addPet: addPet,
      getPet: getPet
    };

    return petsService;

    function getAllPets() {
      return petsApi.getAllPets().then(function (pets) {
        return pets.map(function (pet) {
          return transformPet(pet);
        });
      });
    }

    function removePet(pet) {

    }

    function addPet(pet) {
      return petsApi.addPet({
        name: pet.name,
        category: {name: pet.kind},
        status: 'available'
      }).then(function(addedPet){
        return transformPet(addedPet);
      });
    }

    function getPet(pet) {

    }

    function transformPet(pet) {
      return {
        id: pet.id,
        name: pet.name,
        kind: pet.category.name,
        description: pet.name + ', ' + pet.category.name
      };
    }
  }
})();

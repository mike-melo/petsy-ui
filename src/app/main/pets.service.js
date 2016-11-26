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
      addPet: addPet
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
      return petsApi.removePet(pet.href);
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

    function transformPet(pet) {
      return {
        href: pet.href,
        name: pet.name,
        kind: pet.category.name,
        description: pet.name + ', ' + pet.category.name
      };
    }
  }
})();

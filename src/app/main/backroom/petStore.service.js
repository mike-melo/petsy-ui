(function () {
  'use strict';

  angular
    .module('petsyUi')
    .service('petStore', petStore);

  /** @ngInject */
  function petStore(petStoreApi) {

    var petStore = {
      getAllPets: getAllPets,
      removePet: removePet,
      addPet: addPet
    };

    return petStore;

    function getAllPets() {
      return petStoreApi.getAllPets().then(function (pets) {
        return pets.map(function (pet) {
          return transformPet(pet);
        });
      });
    }

    function removePet(pet) {
      return petStoreApi.removePet(pet.href);
    }

    function addPet(pet) {
      return petStoreApi.addPet({
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
        description: pet.name + ', ' + pet.category.name,
        status: pet.status
      };
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('petsyUi')
    .factory('petStoreApi', petStoreApi);

  /** @ngInject */
  function petStoreApi($http) {
    var urlBase = '/pets';

    var petStoreApi = {
      getAllPets : getAllPets,
      removePet : removePet,
      addPet : addPet
    };

    return petStoreApi;

    function getAllPets() {
      return $http.get(urlBase).then(function(response){
        var pets = response.data._embedded.pets;
        pets.forEach(function(pet) {
          pet.href = pet._links.pet.href.replace('http://localhost:8080', '');
        });
        return pets;
      });
    }

    function removePet(petHref) {
      return $http.delete(petHref);
    }

    function addPet(pet) {
      return $http.post(urlBase, pet).then(function(response){
        var pet = response.data;
        pet.href = pet._links.pet.href.replace('http://localhost:8080', '');
        return pet;
      });
    }
  }
})();

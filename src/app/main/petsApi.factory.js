(function() {
  'use strict';

  angular
    .module('petsyUi')
    .factory('petsApi', petsApi);

  /** @ngInject */
  function petsApi($http) {
    var urlBase = '/pets';

    var petsApi = {
      getAllPets : getAllPets,
      removePet : removePet,
      addPet : addPet,
      getPet : getPet
    };

    return petsApi;

    function getAllPets() {
      return $http.get(urlBase).then(function(response){
        return response.data._embedded.pets;
      });
    }

    function removePet(pet) {
      return $http.delete(urlBase + '/' + pet.id);
    }

    function addPet(pet) {
      return $http.post(urlBase, pet).then(function(response){
        return response.data;
      });
    }

    function getPet(pet) {
      return $http.get(urlBase + '/' + pet.id).then(function(response){
        return response;
      });
    }
  }
})();

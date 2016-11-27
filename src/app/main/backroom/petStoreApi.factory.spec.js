(function () {
  'use strict';

  describe('Pet store api', function () {
    var petStoreApi;
    var $httpBackend;

    beforeEach(module('petsyUi'));
    beforeEach(inject(function (_petStoreApi_, _$rootScope_, _$httpBackend_) {
      petStoreApi = _petStoreApi_;
      $httpBackend = _$httpBackend_;
    }));

    it('should get all pets from GET /pets and strip out URL base from href', function () {
      var petsJson = {
        "_embedded": {
          "pets": [{
            "_links": {
              pet: {href: 'http://localhost:8080/pets'}
            }
          }]
        }
      };

      $httpBackend.expectGET('/pets').respond(petsJson);

      petStoreApi.getAllPets().then(function (pets) {
        expect(pets.length).toEqual(1);
        expect(pets[0].href).toEqual('/pets');
      });

      $httpBackend.flush();
    });

    it('should perform a DELETE /pets/{id}', function () {
      $httpBackend.expectDELETE('/pets/1').respond({});
      petStoreApi.removePet('/pets/1');
      $httpBackend.flush();
    });

    it('should add a pet by performing a POST /pets and strip out URL base from href in response', function () {
      var pet = {};

      var petsJson = {
        "_links": {
          pet: {href: 'http://localhost:8080/pets'}
        }
      };

      $httpBackend.expectPOST('/pets', pet).respond(petsJson);

      petStoreApi.addPet(pet).then(function (pet) {
        expect(pet.href).toEqual('/pets');
      });
      $httpBackend.flush();
    });
  });
})();

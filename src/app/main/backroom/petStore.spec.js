(function () {
  'use strict';

  describe('Pet store backroom', function () {
    var $q;
    var $scope;
    var deferred;
    var petStore;
    var petStoreApi;

    beforeEach(module('petsyUi', function ($provide) {
      petStoreApi = {
        getAllPets: function () {
        },
        removePet: function () {
        },
        addPet: function () {

        }
      };
      $provide.value("petStoreApi", petStoreApi);
    }));

    beforeEach(inject(function (_petStore_, _$rootScope_, _$q_) {
      petStore = _petStore_;
      $q = _$q_;
      $scope = _$rootScope_.$new();
      deferred = $q.defer();
    }));

    it('should get all pets transformed from the pet store API', function () {
      spyOn(petStoreApi, 'getAllPets').and.returnValue(deferred.promise);

      var petFromStore1 = {
        href: 'href1',
        name: 'pet1',
        category: {name: 'category'},
        status: 'status1'
      };

      var petFromStore2 = {
        href: 'href2',
        name: 'pet2',
        category: {name: 'category'},
        status: 'status2'
      };

      deferred.resolve([petFromStore1, petFromStore2]);

      petStore.getAllPets().then(function (transformedPets) {
        expect(transformedPets.length).toEqual(2);

        var transformedPet1 = transformedPets[0];
        var transformedPet2 = transformedPets[1];

        expect(transformedPet1.href).toEqual('href1');
        expect(transformedPet1.name).toEqual('pet1');
        expect(transformedPet1.kind).toEqual('category');
        expect(transformedPet1.status).toEqual('status1');

        expect(transformedPet2.href).toEqual('href2');
        expect(transformedPet2.name).toEqual('pet2');
        expect(transformedPet2.kind).toEqual('category');
        expect(transformedPet2.status).toEqual('status2');
      });
      $scope.$apply();
    });

    it('should remove pet via the pet store API using href', function () {
      spyOn(petStoreApi, 'removePet');
      var pet = {href: 'href'};

      petStore.removePet(pet);
      $scope.$apply();

      expect(petStoreApi.removePet).toHaveBeenCalledWith('href');
    });

    it('should add pet via the pet store API and return a transformed pet', function () {
      spyOn(petStoreApi, 'addPet').and.returnValue(deferred.promise);

      var pet = {
        href: 'href',
        name: 'name',
        kind: 'kind',
        status: 'status'
      };

      var petFromStore1 = {
        href: 'href',
        name: 'name',
        category: {name: 'kind'},
        status: 'status'
      };

      deferred.resolve(petFromStore1);

      petStore.addPet(pet).then(function (transformedPet) {
        var pet = {
          href: 'href',
          name: 'name',
          kind: 'kind',
          description: 'name, kind',
          status: 'status'
        };
        expect(transformedPet).toEqual(pet);
      });
      $scope.$apply();
    });
  });
})();

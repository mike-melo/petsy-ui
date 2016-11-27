(function () {
  'use strict';

  describe('Storefront controller', function () {
    var vm;
    var pets;
    var petsService;
    var $q;
    var $scope;
    var deferred;

    beforeEach(module('petsyUi'));
    beforeEach(inject(function (_$controller_, _petsService_, _$rootScope_, _$q_) {
      pets = [];
      petsService = _petsService_;
      $q = _$q_;
      $scope = _$rootScope_.$new();
      deferred = $q.defer();
      vm = _$controller_('StorefrontController', {petsService: petsService, pets: pets});
    }));

    it('should get all pets', function () {
      expect(vm.pets).toEqual(pets);
    });

    it('should default kind of pet to Dog', function () {
      expect(vm.pet.kind).toEqual('Dog');
    });

    it('should have Cat, Dog, Fish and Hamster as kinds of pets', function () {
      expect(vm.kindsofPets).toEqual(['Cat', 'Dog', 'Fish', 'Hamster']);
    });

    it('should change the kind of pet to whatever was chosen', function () {
      var petChosen = 'Hamster';
      vm.chooseKindOfPet(petChosen);
      expect(vm.pet.kind).toEqual(petChosen);
    });

    it('should add a pet to the store and storefront display', function () {
      spyOn(petsService, 'addPet').and.returnValue(deferred.promise);
      var addedPet = {name: 'Doggie'};
      deferred.resolve(addedPet);

      vm.addAPet();
      $scope.$apply();

      expect(vm.pets[0]).toEqual(addedPet);
    });

    it('should remove a pet from the store and storefront display', function () {
      spyOn(petsService, 'removePet').and.returnValue(deferred.promise);
      var petToRemove = {name: 'Doggie'};
      vm.pets.push(petToRemove);
      deferred.resolve();

      vm.removePet(petToRemove);
      $scope.$apply();

      expect(vm.pets.length).toEqual(0);
    });
  });
})();

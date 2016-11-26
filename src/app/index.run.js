  (function() {
  'use strict';

  angular
    .module('petsyUi')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $log, $window) {
    $rootScope._ = $window._;
    $log.debug('runBlock end');
  }

})();

(function() {
  'use strict';

  angular
    .module('petsyUi')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

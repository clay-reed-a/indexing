'use strict';

describe('Controller: SearchengineCtrl', function () {

  // load the controller's module
  beforeEach(module('indexingApp'));

  var SearchengineCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchengineCtrl = $controller('SearchengineCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: WebCtrl', function () {

  // load the controller's module
  beforeEach(module('indexingApp'));

  var WebCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebCtrl = $controller('WebCtrl', {
      $scope: scope
    });
  }));

  it('should have a bunch of pages', function () {
    expect(scope.pages.length).toBe(3);
  });
});

"use strict";

app.controller("EditCtrl", function ($location, $rootScope, $routeParams, $scope, ContactsService) {
  $scope.contact = {};

  const getContact = () => {
    ContactsService.getSingleContact($routeParams.contactId).then((results) => {
      $scope.contact = results.data;
    }).catch((error) => {
      console.log("Error in getContact", error);
    });
  };

  getContact();

  $scope.saveEdits = function (contact) {
    let updatedContact = ContactsService.createContactObject(contact);
    ContactsService.updateContact(updatedContact, $routeParams.contactId).then(() => {
      getContact();
      $location.path('contacts/view');
    }).catch((error) => {
      console.log("Error in editContact", error);
    });
  };

});
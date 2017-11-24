"use strict";

app.controller("NewCtrl", function($location, $rootScope, $scope, ContactsService){

    $scope.addNewContact = (contact) => {
        let newContact = ContactsService.createContactObject(contact);
        ContactsService.postNewContact(newContact, contact.id).then((results) => {
            $scope.contacts = results;
            $location.url("/contacts/view");
    }).catch((err) => {
        console.log("error in addNewContact", err);
    });
    };

});


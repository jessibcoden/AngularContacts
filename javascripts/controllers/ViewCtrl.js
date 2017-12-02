"use strict";

app.controller("ViewCtrl", function($location, $scope,$rootScope, $routeParams, ContactsService){
    $scope.contact = {};

    const getContacts = () => {
        ContactsService.getAllContacts($rootScope.uid).then((results) => {
            results.forEach(function(result) {
                result.image = ContactsService.assignImage(result.category);
            });
            $scope.contacts = results;
        }).catch((err) => {
            console.log("error in getContacts");
            });
    };
  
    getContacts(); 

    $scope.deleteContact = (contactId) => {
        ContactsService.deleteContact(contactId).then((result) => {
            getContacts();
        }).catch((err) => {
            console.log("error in deleteContact", err);
        });
    };

    $scope.makeFavorite = (contact, contactId) => {
        contact.favorite = true;
        let updateFavoriteStatus = ContactsService.createContactObject(contact);
        ContactsService.updateContact(updateFavoriteStatus, contact.id).then((result) => {
            getContacts();
        }).catch((err) => {
            console.log("error in makeFavorite", err);
        });
    };

    $scope.makeNotFavorite = (contact, contactId) => {
        contact.favorite = false;
        let updateFavoriteStatus = ContactsService.createContactObject(contact);
        ContactsService.updateContact(updateFavoriteStatus, contact.id).then((result) => {
            getContacts();
        }).catch((err) => {
            console.log("error in makeNotFavorite", err);
        });
    };

    $scope.editContact = (contactId) => {
        $location.path(`/contacts/edit/${contactId}`);
    };

    $scope.showDetails = (contactId) => {
        $location.path(`/contacts/detail/${contactId}`);
    };

});



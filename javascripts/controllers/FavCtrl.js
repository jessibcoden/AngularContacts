"use strict";

app.controller("FavCtrl", function($location, $rootScope, $scope, ContactsService){

    const getContacts = () => {
        ContactsService.getFavorites($rootScope.uid).then((results) => {
            $scope.contacts = results;
        }).catch((err) => {
            console.log("error in getFavorites", err);
            });
    };

    getContacts();

    $scope.makeNotFavorite = (contact, contactId) => {
        contact.favorite = false;
        let updateFavoriteStatus = ContactsService.createContactObject(contact);
        ContactsService.updateContact(updateFavoriteStatus, contact.id).then((result) => {
            getContacts();
    }).catch((err) => {
        console.log("error in makeNotFavorite", err);
    });
    };

    $scope.deleteContact = (contactId) => {
        ContactsService.deleteContact(contactId).then((result) => {
            getContacts();
        }).catch((err) => {
            console.log("error in deleteContact", err);
        });
    };

    $scope.editContact = (contactId) => {
        $location.path(`/contacts/edit/${contactId}`);
    };

    $scope.showDetails = (contactId) => {
        $location.path(`/contacts/detail/${contactId}`);
    };

});


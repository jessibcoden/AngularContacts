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

    $scope.enterPush = (event, userId) => {
        userId = $rootScope.uid;
        console.log("userId", userId);
        if(event.keyCode === 13){
            let query = event.target.value;
            console.log("query on enter",query);
            ContactsService.searchContacts(userId, query).then((results) => {
                $scope.contacts=results.data.results;
            }).catch((err) => {
                    console.log("error in enterPush", err);
                });
        }
    };

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



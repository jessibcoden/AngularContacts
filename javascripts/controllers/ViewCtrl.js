"use strict";

app.controller("ViewCtrl", function($scope,$rootScope, ContactsService){
    $scope.contact = {};

    const getContacts = () => {
        ContactsService.getAllContacts($rootScope.uid).then((results) => {
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
        console.log("make fav");
        contact.favorite = true;
        let updateFavoriteStatus = ContactsService.createContactObject(contact);
        ContactsService.updateContact(updateFavoriteStatus, contact.id).then((result) => {
            getContacts();
            console.log("contacts", contact);
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

    // $scope.switchFavoriteStatus = ($event, contact, contactId) => {
    //     if ($event.favorite){
    //         contact.favorite = false;
    //     }else {
    //         contact.favorite = true;
    //     }
    //     let updateFavoriteStatus = ContactsService.createContactObject(contact);
    //     ContactsService.updateContact(updateFavoriteStatus, contact.id).then((result) => {
    //         getContacts();
    //         }).catch((err) => {
    //             console.log("error in updateMovie", err);
    //         });
    //     };


});



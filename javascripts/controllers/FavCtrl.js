"use strict";

app.controller("FavCtrl", function($rootScope, $scope, ContactsService){

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


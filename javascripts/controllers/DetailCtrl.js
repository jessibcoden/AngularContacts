'use strict';

app.controller("DetailCtrl", function ($location, $routeParams, $scope, ContactsService) {

    const getContacts = () => {
        ContactsService.getSingleContact($routeParams.contactId).then((results) => {
            $scope.contact = results.data;
            $scope.contact.image = ContactsService.assignImage(results.data.category);
        }).catch((error) => {
            console.log("error in getContacts in DetailCtrl", error);
        });
    };

    getContacts();

    $scope.makeFavorite = (contact, contactId) => {
        console.log("inside makeFavorite");
        contact.favorite = true;
        let updateFavoriteStatus = ContactsService.createContactObject(contact);
        ContactsService.updateContact(updateFavoriteStatus, contact.id).then((result) => {
            getContacts();
        }).catch((err) => {
            console.log("error in makeFavorite in DetailCtrl", err);
        });
    };

    $scope.makeNotFavorite = (contact, contactId) => {
        contact.favorite = false;
        let updateFavoriteStatus = ContactsService.createContactObject(contact);
        ContactsService.updateContact(updateFavoriteStatus, contact.id).then((result) => {
            getContacts();
        }).catch((err) => {
            console.log("error in makeNotFavorite in DetailCtrl", err);
        });
    };

    $scope.editContact = (contactId) => {
        $location.path(`/contacts/edit/${contactId}`);
      };

});
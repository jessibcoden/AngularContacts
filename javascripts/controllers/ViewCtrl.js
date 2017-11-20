"use strict";

app.controller("ViewCtrl", function($scope,$rootScope, ContactsService){
    
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
});



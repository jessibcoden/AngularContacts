"use strict";

app.controller("NewCtrl", function($location, $rootScope, $scope, ContactsService){

    let userId = $rootScope.uid;
    const createContactObject = (contact) => {
        
        return{
            "first_name": contact.first_name,
            "last_name": contact.last_name,
            "title": contact.title,
            "company": contact.company,
            "category": contact.category,
            "cell_phone": contact.cell_phone,
            "email": contact.email,
            "location": contact.location,
            "github_link": contact.github_link,
            "linkedin_link": contact.linkedin_link,
            "image": contact.image,
            "favorite": false,
            "uid": userId
        };

    };

    $scope.addNewContact = (contact) => {
        let newContact = createContactObject(contact);
        console.log("newContact", newContact);
        ContactsService.postNewContact(newContact, contact.id).then((results) => {
            $scope.contacts = results;
            $location.url("/contacts/view");
    }).catch((err) => {
        console.log("error in addNewContact", err);
    });
    };

});


"use strict";

app.controller("ViewCtrl", function($location, $scope,$rootScope, $routeParams, ContactsService){
    $scope.contact = {};

    const getContacts = () => {
        ContactsService.getAllContacts($rootScope.uid).then((results) => {
            results.forEach(function(result) {
                result.image = assignImage(result.category);
            });
            $scope.contacts = results;
            console.log("contacts with images", $scope.contacts);
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

    $scope.editContact = (contactId) => {
        console.log("inside editContact");
        $location.path(`/contacts/edit/${contactId}`);
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

    const assignImage = (category) => {
        let image;
        switch(category) {
            case "Friend":
                image = "./images/friend.jpg";
                break;
            case "Family":
                image = "./images/family.jpg";
                break;
            case "Acquaintance":
                image = "./images/acquaintance.jpg";
                break;
            case "Classmate":
                image = "./images/classmate.jpg";
                break;
            case "Client":
                image = "./images/client.jpg";
                break;
            case "Colleague":
                image = "./images/colleague.jpg";
                break;
            case "Manager":
                image = "./images/manager.jpg";
                break;
            case "Mentor":
                image = "./images/mentor.png";
                break;
            case "Teacher":
                image = "./images/teacher.jpg";
                break;
            default:
                image = "./images/other.jpg";
        }
        return image;
    };

});



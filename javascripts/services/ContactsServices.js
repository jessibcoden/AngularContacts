"use strict";

app.service("ContactsService", function($http, $q, $rootScope, FIREBASE_CONFIG) {

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
            "favorite": contact.favorite,
            "uid": userId
        };
    };

    const postNewContact = (newContact) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/contacts.json`, JSON.stringify(newContact));
    };

    const getAllContacts = (userId) => {
        let contacts = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/contacts.json?orderBy="uid"&equalTo="${userId}"`).then((results) => {
                let fbContacts = results.data;
                Object.keys(fbContacts).forEach((key) => {
                    fbContacts[key].id = key; 
                    contacts.push(fbContacts[key]);
                });
                resolve(contacts);
                
            }).catch((err) => {
                reject("error in getAllContacts in Contactsservices", err);
            });
        });
    };

    const deleteContact = (contactId) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/contacts/${contactId}.json`);
    };

    const getFavorites = (userUid) => {
        let contacts = [];
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/contacts.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
                let fbContacts = results.data;
                Object.keys(fbContacts).forEach((key) => {
                    fbContacts[key].id = key; 
                    if(fbContacts[key].favorite){
                        contacts.push(fbContacts[key]);
                    }
                    resolve(contacts);
                });
            }).catch((err) => {
                reject("error in getFavorites in Contactsservices", err);
            });
        });
    };

    const updateContact = (contact, contactId) => {
        return $http.put(`${FIREBASE_CONFIG.databaseURL}/contacts/${contactId}.json`, JSON.stringify(contact));
    };

    const getSingleContact = (contactId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/contacts/${contactId}.json`);
      };

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
            case "Manager/Supervisor":
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


        return {postNewContact, getAllContacts, deleteContact, createContactObject, getFavorites, updateContact, getSingleContact, assignImage, searchContacts};
});


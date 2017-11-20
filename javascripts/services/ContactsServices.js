"use strict";

app.service("ContactsService", function($http, $q, FIREBASE_CONFIG) {

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
                resolve(contacts);
                });
            }).catch((err) => {
                reject(err);
            });
        });
    };

    const deleteContact = (contactId) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/contacts/${contactId}.json`);
    };


    return {postNewContact, getAllContacts, deleteContact};
});


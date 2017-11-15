"use strict";

app.run(function(FIREBASE_CONFIG){
    firebase.initializeApp(FIREBASE_CONFIG);
});

app.config(function($routeProvider){
    $routeProvider
    .when("/auth", {
        templateUrl: "partials/auth.html",
        controller: "AuthCtrl"
    })
    .when("/contacts/favorites", {
        templateUrl: "partials/contacts/favorites.html",
        controller: "FavCtrl"
    })
    .when("/contacts/new", {
        templateUrl: "partials/contacts/new.html",
        controller: "NewCtrl"
    })
    .when("/contacts/view", {
        templateUrl: "partials/contacts/view.html",
        controller: "ViewCtrl"
    })
    .otherwise("/auth");
});
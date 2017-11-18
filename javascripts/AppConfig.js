"use strict";

let isAuth = (AuthService) => new Promise ((resolve, reject) => {
    if(AuthService.isAuthenticated()){
    console.log("isAuth");
    
      resolve();
    } else {
      reject();
    }
  });

  app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthService){
    firebase.initializeApp(FIREBASE_CONFIG);  
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
    var logged = AuthService.isAuthenticated();
    var appTo;
        if (currRoute.originalPath) {
            appTo = currRoute.originalPath.indexOf('/auth') !== -1;
        }
        if (!appTo && !logged) {
            event.preventDefault();
            $location.path('/auth');
        }
    });
});

app.config(function($routeProvider){
    $routeProvider
    .when("/auth", {
        templateUrl: "partials/auth.html",
        controller: "AuthCtrl"
    })
    .when("/contacts/favorites", {
        templateUrl: "partials/contacts/favorites.html",
        controller: "FavCtrl",
        resolve: {isAuth}
    })
    .when("/contacts/new", {
        templateUrl: "partials/contacts/new.html",
        controller: "NewCtrl",
        resolve: {isAuth}
    })
    .when("/contacts/view", {
        templateUrl: "partials/contacts/view.html",
        controller: "ViewCtrl",
        resolve: {isAuth}
    })
    .otherwise("/auth");
});
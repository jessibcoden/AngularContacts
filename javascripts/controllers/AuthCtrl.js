"use strict";

app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthServices){
    $scope.authenticate = () => {
        AuthServices.authenticateGoogle().then((result) => {
            $rootScope.uid = result.user.uid;
            $scope.$apply(() => {
                $location.url("/contacts/view");
            });         
            }).catch((err) => {
                console.log("error in authenticatGoogle", err);
            });
    };
});

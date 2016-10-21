var app = angular.module('FacebookProvider', []);
app.factory('Facebook', function ($rootScope,$window) {
    return {
        getLoginStatus:function () {
            FB.getLoginStatus(function (response) {
                $rootScope.$broadcast("fb_statusChange", {'status':response.status});
                console.log("fb_statusChange", {'status':response.status});
                $rootScope.facebook_id = response.authResponse.userID;
            }, true);
        },
        login:function () {
            FB.getLoginStatus(function (response) {
                switch (response.status) {
                    case 'connected':
                        console.log("hello connected");
                        $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                        console.log("hii " + response.authResponse.userID);
                        $rootScope.facebook_id = response.authResponse.userID;
                        $window.location.href="../MAshup Web Services/home.html";
                        break;
                    case 'not_authorized':
                    case 'unknown':
                        console.log("hello unknown");
                        FB.login(function (response) {
                            if (response.authResponse) {
                                $rootScope.$broadcast('fb_connected', {
                                    facebook_id:response.authResponse.userID,
                                    userNotAuthorized:true
                                });
                                console.log("hii " + response.authResponse.userID);
                                $window.location.href="../MAshup Web Services/home.html";
                            } else {
                                $rootScope.$broadcast('fb_login_failed');
                            }
                        });
                        break;
                    default:
                        FB.login(function (response) {
                            if (response.authResponse) {
                                $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                                $rootScope.$broadcast('fb_get_login_status');
                            } else {
                                $rootScope.$broadcast('fb_login_failed');
                            }
                        });
                        break;
                }
            }, true);
        },
        logout:function () {
            FB.logout(function (response) {
                if (response) {
                    $rootScope.$broadcast('fb_logout_succeded');
                    $window.location.href="../MAshup Web Services/index.html";
                } else {
                    $rootScope.$broadcast('fb_logout_failed');

                }
            });
        },
        unsubscribe:function () {
            FB.api("/me/permissions", "DELETE", function (response) {
                $rootScope.$broadcast('fb_get_login_status');
            });
        }
    };
});


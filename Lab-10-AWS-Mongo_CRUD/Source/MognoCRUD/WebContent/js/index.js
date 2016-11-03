/**
 * Created by user on 23/02/2016.
 */
var myapp = angular.module( 'SocialLoginDemo', ['googleOauth','FacebookProvider'] );

myapp.config( function (TokenProvider) {
    // Demo configuration for the "angular-oauth demo" project on Google.
    // Log in at will!

    // Sorry about this way of getting a relative URL, powers that be.

    var baseUrl = document.URL.replace( '/index.html', '' );
    TokenProvider.extendConfig( {
        clientId: '202317690708-062ts2disvkoi7lfm6strp08updu3n45.apps.googleusercontent.com',
        redirectUri: baseUrl + '/oauth2callback.jsp',  // allow lunching demo from a mirror
        scopes: ["https://www.googleapis.com/auth/userinfo.email"]
    } );
} );

/*
 myapp.config (['facebookProvider', function (facebookProvider) {
 facebookProvider.init ({appId: "1722170298006385"});
 }]);
 */

myapp.controller( 'SocialLoginController', function ($rootScope, $scope, $log, $window, Token, Facebook,$http,$location) {
    $scope.accessToken = Token.get();

    $scope.authenticate = function () {
        var extraParams = $scope.askApproval ? {approval_prompt: 'force'} : {};
        Token.getTokenByPopup( extraParams )
            .then( function (params) {
                // Success getting token from popup.
                $scope.$log = "HEllo";
                // Verify the token before setting it, to avoid the confused deputy problem.
                Token.verifyAsync( params.access_token ).then( function (data) {
                    $rootScope.$apply( function () {
                        $scope.accessToken = params.access_token;
                        $scope.expiresIn = params.expires_in;

                        Token.set( params.access_token );
                    } );
                }, function () {
                    alert( "Failed to verify token." )
                } );

            }, function () {
                // Failure getting token from popup.
                alert( "Failed to get token from popup." );
            } );
    };
    $scope.info = {};

    $rootScope.$on( "fb_statusChange", function (event, args) {
        $rootScope.fb_status = args.status;
        $rootScope.$apply();
    } );
    $rootScope.$on( "fb_get_login_status", function () {
        Facebook.getLoginStatus();
    } );
    $rootScope.$on( "fb_login_failed", function () {
        console.log( "fb_login_failed" );
    } );
    $rootScope.$on( "fb_logout_succeded", function () {
        console.log( "fb_logout_succeded" );
        $rootScope.id = "";
    } );
    $rootScope.$on( "fb_logout_failed", function () {
        console.log( "fb_logout_failed!" );
    } );
    $rootScope.$on( "fb_connected", function (event, args) {
        /*
         If facebook is connected we can follow two paths:
         The users has either authorized our app or not.

         ---------------------------------------------------------------------------------
         http://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/

         the user is logged into Facebook and has authenticated your application (connected)
         the user is logged into Facebook but has not authenticated your application (not_authorized)
         the user is not logged into Facebook at this time and so we don't know if they've authenticated
         your application or not (unknown)
         ---------------------------------------------------------------------------------

         If the user is connected to facebook, his facebook_id will be enough to authenticate him in our app,
         the only thing we will have to do is to post his facebook_id to 'php/auth.php' and get his info
         from the database.

         If the user has a status of unknown or not_authorized we will have to do a facebook api call to force him to
         connect and to get some extra data we might need to unthenticated him.
         */

        var params = {};

        function authenticateViaFacebook(parameters) {
            //posts some user data to a page that will check them against some db
            $scope.updateSession();
        }

        if (args.userNotAuthorized === true) {
            //if the user has not authorized the app, we must write his credentials in our database
            console.log( "user is connected to facebook but has not authorized our app" );
        }
        else {
            console.log( "user is connected to facebook and has authorized our app" );
            //the parameter needed in that case is just the users facebook id
            params = {'facebook_id': args.facebook_id};
            authenticateViaFacebook( params );
        }

    } );


    $rootScope.updateSession = function () {
        //reads the session variables if exist from php
            $rootScope.session = "hello";

    };

    $rootScope.updateSession();


    // button functions
    $scope.getLoginStatus = function () {
        Facebook.getLoginStatus();

    };

    $scope.login = function () {
        Facebook.login();
         };

    $scope.logout = function () {
        Facebook.logout();
        $rootScope.facebook_id = "";
        $window.location.href="/Mashup Web Services/oauth2callback.jsp";
    };

    $scope.unsubscribe = function () {
        Facebook.unsubscribe();
    }

    $scope.getInfo = function () {
        FB.api( '/' + $rootScope.facebook_id, function (response) {
            console.log( 'Good to see you, ' + response.name + '.' + $rootScope.facebook_id );

        } );
        $rootScope.info = $rootScope.session;

    };

} );


myapp.run( function ($rootScope) {
    window.fbAsyncInit = function () {
        FB.init( {
            appId: '1722170298006385',
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.4'
        } );

        FB.Event.subscribe( 'auth.statusChange', function (response) {
            console.log( "hello" );
            $rootScope.$broadcast( "fb_statusChange", {'status': response.status} );
        } );
    };

    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName( 'script' )[0];
        if (d.getElementById( id )) {
            return;
        }
        js = d.createElement( 'script' );
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        ref.parentNode.insertBefore( js, ref );
    }( document ));
} );

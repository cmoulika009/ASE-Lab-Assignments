/**
 * Created by user on 24/02/2016.
 */
var myapp = angular.module( 'homeModule', ['googleOauth','FacebookProvider'] );

myapp.config( function (TokenProvider) {
    // Demo configuration for the "angular-oauth demo" project on Google.
    // Log in at will!

    // Sorry about this way of getting a relative URL, powers that be.

    var baseUrl = document.URL.replace( '/home.jsp', '' );
    TokenProvider.extendConfig( {
        clientId: '202317690708-062ts2disvkoi7lfm6strp08updu3n45.apps.googleusercontent.com',
        redirectUri: baseUrl + '/home.jsp',  // allow lunching demo from a mirror
        scopes: ["https://www.googleapis.com/auth/userinfo.email"]
    } );
} );
myapp.controller( 'homeController', function ($scope, $http,$rootScope,$log, $window, Token, Facebook,$http,$location) {
    $scope.accessToken = Token.get()
    //  https://api.edamam.com/diet?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free
    $scope.recipelist = new Array();
    $scope.venueList = new Array();
    $scope.mostRecentReview;
    $scope.findRecipe = function () {
        //var end = document.getElementById('endlocation').value;
        alert( "hello" + $scope.recipe );
        $http.get( 'https://api.edamam.com/search?q=' + $scope.recipe + '&app_id=90345b31&app_key=7884f37e59a7ff7d16ceb275bec553a9&from=0&to=3' ).success( function (data1) {
            console.log( data1 );
            for (var i = 0; i < data1.hits.length; i++) {
                $scope.recipelist[i]= {

                    "name": data1.hits[i].recipe.label,
                    "url": data1.hits[i].recipe.url,
                    "icon": data1.hits[i].recipe.image
                };
            /*    for (var j = 0; j < data1.hits[i].recipe.ingredients.length; j++) {
                    $scope.ingredients[j] = {
                        "text": data1.hits[i].recipe.ingredients[j].text,
                        "name": data1.hits[i].recipe.ingredients[j].food
                    };
                }*/

            }

        } )

    };

    $scope.getVenues = function () {
        var place = document.getElementById("place").value;
        var food = document.getElementById("recipe").value;
        if (place != null && place != "" && food != null && food != "") {
          //  document.getElementById('div_ReviewList').style.display = 'none';
            //This is the API that gives the list of venues based on the place and search query.
            var handler = $http.get("https://api.foursquare.com/v2/venues/search" +
                "?client_id=3PPNMTIKJJNDVYPFOBGSHHV2PR5A2P05PYHXDN2MKSKTTBSX" +
                "&client_secret=0QPHT0F5RS043F4TB4KKPQSHKSAXKE5ZNOYGB5KL2MBDYAG4" +
                "&v=20160215&limit=5" +
                "&near=" + place +
                "&query=" + food);
            handler.success(function (data) {

                if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
                    for (var i = 0; i < data.response.venues.length; i++) {
                        $scope.venueList[i] = {
                            "name": data.response.venues[i].name,
                            "id": data.response.venues[i].id,
                            "location": data.response.venues[i].location
                        };
                    }
                }

            })
            handler.error(function (data) {
                alert("There was some error processing your request. Please try after some time.");
            });
        }
    };
    $scope.getReviews = function (venueSelected) {
        if (venueSelected != null) {
            //This is the API call being made to get the reviews(tips) for the selected place or venue.
            var handler = $http.get("https://api.foursquare.com/v2/venues/" + venueSelected.id + "/tips" +
                "?sort=recent" +
                "&client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI" +
                "&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG&v=20160215" +
                "&limit=5");
            handler.success(function (result) {
                if (result != null && result.response != null && result.response.tips != null &&
                    result.response.tips.items != null) {
                    $scope.venueName = venueSelected.name;
                    $scope.mostRecentReview = result.response.tips.items[0];
                    //This is the Alchemy API for getting the sentiment of the most recent review for a place.
                    var callback = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
                        "?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8" +
                        "&outputMode=json&text=" + $scope.mostRecentReview.text);
                    callback.success(function (data) {
                        if(data!=null && data.docSentiment!=null)
                        {
                            $scope.ReviewWithSentiment = {"reviewText" : $scope.mostRecentReview.text,
                                "sentiment":data.docSentiment.type,
                                "score":data.docSentiment.score,
                            };
                            document.getElementById('div_ReviewList').style.display = 'block';


                        }
                    })
                }
            })
            handler.error(function (result) {
                alert("There was some error processing your request. Please try after some time.")
            })
        }

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
        console.log("inside");
        $rootScope.facebook_id = "";
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

/**
 * Created by bn4n5 on 10/18/2016.
 */
var app=angular.module("calculate",[]);
app.controller("calculatectrl",function ($scope,$http) {
    $scope.bmi = function () {
        var height=$scope.h;
        //var weight=$scope.w;

        var words = $http.get("http://localhost:8091/RESTExample/restexample/AddressConverter/Ricardo Apartments,East Armour Blvd,Kansas City");
        words.success(function (data) {
            console.log(data);
            $scope.cal={"address":data.address,"latitude":data.latitude,"location":data.location,"longitude":data.longitude};

        });
    }
});

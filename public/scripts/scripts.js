console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///

var myApp = angular.module('myApp',[]);

var allItems = [];

/// == Function Declarations == ///


/// == JavaScript == ///

myApp.controller('postController', ['$scope','$http',function($scope,$http){
  console.log('NG');

  $scope.addItem = function(){
    console.log('in addItem', $scope.newItem);

    var newObject = {
      assignment_name: $scope.assignTitle,
      student_name: {
        first: $scope.firstName,
        last: $scope.lastName
      },
      score: $scope.assignScore
    }; // end new item
    console.log('sending:',newObject);
    // test send via http to post Route
    $http({
      method: 'POST',
      url: '/testPost',
      data: newObject
    }).then(function ( response ){
      console.log('back from server with:', response);
    });

    allItems.push(newObject);
    console.log('allItems:', allItems);
  };
}]);

myApp.controller('showController', ['$scope','$http',function($scope,$http){
  console.log('NG');

  $scope.addItem = function(){
    console.log('in addItem', $scope.newItem);

    var newObject = {
      assignment_name: $scope.assignTitle,
      student_name: {
        first: $scope.firstName,
        last: $scope.lastName
      },
      score: $scope.assignScore
    }; // end new item
    console.log('sending:',newObject);
    // test send via http to post Route
    $http({
      method: 'POST',
      url: '/testPost',
      data: newObject
    }).then(function ( response ){
      console.log('back from server with:', response);
    });

    allItems.push(newObject);
    console.log('allItems:', allItems);
  };

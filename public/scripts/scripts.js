console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///

var myApp = angular.module('myApp',[]);

var allItems = [];

/// == Function Declarations == ///


/// == JavaScript == ///

myApp.controller('postController', ['$scope','$http',function($scope,$http){
  console.log('NGpost');

  $scope.addItem = function(){
    console.log('in addItem', $scope);

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
      url: '/assignments',
      data: newObject
    }).then(function ( response ){
      console.log('back from server with:', response);
    });

    allItems.push(newObject);
    console.log('allItems:', allItems);
  };

  $scope.showAll = function(){
    console.log('in showAll', $scope);
    $http({
      method: 'GET',
      url: '/assignments',
    }).then(function ( response ){
      console.log('back from server with:', response);
    });
  };

}]);

// myApp.controller('showController', ['$scope','$http',function($scope,$http){
//   console.log('NGshow');
//
//
// }]);

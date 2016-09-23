console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///

var myApp = angular.module('myApp',[]);

var allItems = [];

/// == Function Declarations == ///


/// == JavaScript == ///

myApp.controller('mainController', ['$scope','$http',function($scope,$http){
  console.log('NG');

  $scope.addItem = function(){
    console.log('in addItem', $scope.newItem);

    var newObject = {
      title: $scope.newItem
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

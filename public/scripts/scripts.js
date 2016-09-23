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
      gradeBook = response.data;
      bookView = angular.element(document.getElementById('gradeBookView'));
      bookView.empty();
      for (var i = 0; i < gradeBook.length; i++) {
        // first add blank strings where needed
        if (!(gradeBook[i].assignment_name)){
          gradeBook[i].assignment_name = '';
        }
        if (!(gradeBook[i].student_name)){
          gradeBook[i].student_name= {
            first: '',
            last:''
          };
        } else {
          if (!(gradeBook[i].student_name.first)){
            gradeBook[i].student_name.first = '';
          }
          if (!(gradeBook[i].student_name.last)){
            gradeBook[i].student_name.last = '';
          }
        }
        if (!(gradeBook[i].score)){
          gradeBook[i].score = '';
        }

        bookView.append('<tr><td>'+(i+1)+'</td><td>'+gradeBook[i].assignment_name+
        '</td><td>'+gradeBook[i].student_name.first+
        '</td><td>'+gradeBook[i].student_name.last+
        '</td><td>'+gradeBook[i].score+
        '</td><td>'+'<button ng-click="showOne()">Hide Others</button>'+
        '</td><td>'+'<button ng-click="updateOne()">Update</button>'+
        '</td><td>'+'<button ng-click="deleteOne()">Delete</button>'+'</td></tr>');
      }
    });
  };// end showAll
      $scope.showAll();
}]);

// myApp.controller('showController', ['$scope','$http',function($scope,$http){
//   console.log('NGshow');
//
//
// }]);

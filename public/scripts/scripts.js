console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///

var myApp = angular.module('myApp',[]);

var gradeBook = [];

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

    $scope.showAll();
  };

  $scope.deleteItem = function(){
    console.log('in deleteItem', $scope);
    console.log('All Items:', gradeBook);
    // grab number from the button
    var deleteButton = angular.element(document.getElementById('deleteB'));
    var deleteText=deleteButton.html();
    console.log(deleteText);
    var recordNum = Number(deleteText[deleteText.length-1])-1;
    console.log(recordNum);
    var idToDelete = {
      id: gradeBook[recordNum]._id
    };
    console.log(idToDelete);

    $http({
      method: 'DELETE',
      url: '/assignments',
      data: idToDelete,
      headers: {"Content-Type": "application/json;charset=utf-8"}
    }).then(function ( response ){
      console.log('back from server with:', response);
    });
    $scope.showAll();
  }; // end delete Item

  $scope.showAll = function(){
    console.log('in showAll', $scope);
    $http({
      method: 'GET',
      url: '/assignments',
    }).then(function ( response ){
      console.log('back from server with:', response);
      gradeBook = response.data;
      var bookView = angular.element(document.getElementById('gradeBookView'));
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
        '</td><td>'+gradeBook[i].score+'</td></tr>');
      }
    });

  };// end showAll
  $scope.showAll();

  $scope.showOne = function(){
    console.log('in showOne', $scope);
    // grab value from button
    var showButton = angular.element(document.getElementById('showB'));
    var showText=showButton.html();
    console.log(showText);
    var recordNum = Number(showText[showText.length-1])-1;
    console.log(recordNum);
    var idToShow = {
      id: gradeBook[recordNum]._id
    };
    console.log(idToShow);


    $http({
      method: 'GET',
      url: '/assignments/'+idToShow.id,
    }).then(function ( response ){
      console.log('back from server with:', response);
      gradeBook = response.data;
      var bookView = angular.element(document.getElementById('gradeBookView'));
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
        '</td><td>'+gradeBook[i].score+'</td></tr>');
      }
    });

  };// end showOne

  $scope.updateItem = function(){
    console.log('in updateItem', $scope);
    console.log('All Items:', gradeBook);
    // grab number from the button
    var updateButton = angular.element(document.getElementById('updateB'));
    var updateText=updateButton.html();
    console.log(updateText);
    var recordNum = Number(updateText[updateText.length-1])-1;
    console.log(recordNum);

    var idToUpdate = {
      id: gradeBook[recordNum]._id,
    };

    var newTitle = $scope.assignTitle;
    var newScore = $scope.assignScore;
    var newFirst = $scope.firstName;
    var newLast = $scope.lastName;

    if (newTitle !== ''){
      idToUpdate.assignment_name = newTitle;
    }
    if (newFirst !== '' && newLast !== ''){
      idToUpdate.student_name = {first: newFirst, last: newLast};
    }

    if (newScore !== ''){
      idToUpdate.score = newScore;
    }

    console.log(idToUpdate);
    // student_name: {
    //   first: $scope.firstName,
    //   last: $scope.lastName
    // },



    $http({
      method: 'PUT',
      url: '/assignments',
      data: idToUpdate
    }).then(function ( response ){
      console.log('back from server with:', response);
    });

    $scope.showAll();

  }; // end update Item
}]);

// myApp.controller('showController', ['$scope','$http',function($scope,$http){
//   console.log('NGshow');
//
//
// }]);

var express = require("express");
var router = express.Router();

var mongoose = require('mongoose');

var Assignment = require('../models/assignments');

//get all assignments route
router.get('/', function(req, res){
  console.log('/all route hit');

  //find assignment function
  Assignment.find({}, function(err, dbResults){
    if(err){
      console.log('error occurred:', err);
      res.sendStatus(500);
    } else {
      console.log('/all route returned:', dbResults);
      res.send(dbResults);
    }// end if else
  });// end find assignment
});// end get all assignments

//add new assignment route
router.post('/', function(req, res){
  console.log('hit the /create post with', req.body);
  // get data from body
  var sentData = req.body;

  //create new assignment object from schema
  var newAssignment = new Assignment({
    assignment_name: sentData.assignment_name,
    student_name: {
      first: sentData.first,
      last: sentData.last
    },
    score: sentData.score
  });// end create newAssignment

  // save newAssignment in database
  newAssignment.save(function(err){
      if(err){
        console.log('error occurred:', err);
        res.sendStatus(500);
      } else {
        console.log('newAssignment saved successfully!');
        res.sendStatus(201);
      }// end if else
    });// end newAssignment save
});// end new assignment route

module.exports = router;

var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Assignment = require('../models/assignments');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//get all assignments route
router.get('/:id?', function(req, res){
  console.log('/all route hit');
  if(req.params.id !== undefined){
  console.log("The params are:", req.params);
  Assignment.find({"_id":req.params.id}, function(err, dbResults){
    if(err){
      console.log('error occurred:', err);
      res.sendStatus(500);
    } else {
      console.log('/all route returned:', dbResults);
      res.send(dbResults);

    }// end if else
  });// end find assignment
  }
  else {
    //find assignment function
    console.log("No params detected");
    Assignment.find({}, function(err, dbResults){
      if(err){
        console.log('error occurred:', err);
        res.sendStatus(500);
      } else {
        console.log('/all route returned:', dbResults);
        res.send(dbResults);

      }// end if else
    });// end find assignment
  }// end req.params else
});// end get all assignments

//add new assignment route
router.post('/', function(req, res){
  console.log('hit the /create post with', req.body);
  // get data from body
  var sentData = req.body;
  console.log('sentData:',sentData);
  //create new assignment object from schema
  var newAssignment = new Assignment({
    assignment_name: sentData.assignment_name,
    student_name: {
      first: sentData.student_name.first,
      last: sentData.student_name.last
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

// delete assignment
router.delete('/', function(req, res){
  console.log('hit delete route with:',req.body);
  Assignment.findByIdAndRemove({"_id":req.body.id}, function(){
    console.log("Assignment "+ req.body.id +" has been deleted.");
    res.send(200);
  });// end callback
});// end delete

// update assignment
router.put('/', function(req, res){

  console.log("this is the body", req.body);

// assignment_name: req.body.assignment_name,student_name:{first:req.body.student_name.first,last:req.body.student_name.last}, score: req.body.score

  Assignment.findByIdAndUpdate({"_id":req.body.id},req.body, function (err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Assignment "+ req.body.id +" has been updated.");
      res.send(200);
    }
  });
});// End put route
module.exports = router;

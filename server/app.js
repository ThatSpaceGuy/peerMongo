var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var mongoURI = "mongodb://localhost:27017/assignments";
var MongoDB = mongoose.connect(mongoURI).connection;

var Assignment = require('../models/assignments');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

app.listen('2789', 'localhost', function(){
  console.log('listening on port 2789');
});

app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/index.html'));
});

// test get
// app.get('/assignments', function(req, res){
//   // declare testAssignment variable
//   var testAssignment = new Assignment({
//     assignment_name: 'Super Fun Mathematical Time',
//     student_name: {
//       first: 'Luis',
//       last: 'Matos'
//     },
//     score: 100
//   }); // end testAssignment declaration
//
//   // save testAssignment
//   testAssignment.save(function(err){
//     if(err){
//       console.log('error occurred:', err);
//       res.sendStatus(500);
//     } else {
//       console.log('testAssignment saved successfully!');
//       res.sendStatus(201);
//     }
//   }); // end save testAssignment
// }); // end test get

app.get('/all', function(req, res){
  console.log('/all route hit');

  Assignment.find({}, function(err, dbResults){
    if(err){
      console.log('error occurred:', err);
      res.sendStatus(500);
    } else {
      console.log('/all route returned:', dbResults);
      res.send(dbResults);
    }
  });
});

app.post('/create', function(req, res){
  console.log('hit the /create post with', req.body);

  var sentData = req.body;

  var newAssignment = new Assignment({
    assignment_name: sentData.assignment_name,
    student_name: {
      first: sentData.first,
      last: sentData.last
    },
    score: sentData.score
  });

  newAssignment.save(function(err){
      if(err){
        console.log('error occurred:', err);
        res.sendStatus(500);
      } else {
        console.log('newAssignment saved successfully!');
        res.sendStatus(201);
      }
    });

});

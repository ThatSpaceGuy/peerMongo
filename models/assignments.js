var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
  assignment_name: String,
  student_name: {
    first: String,
    last: String
  },
  score: Number,
  date_completed: Date
});

var Assignment = mongoose.model('assignments', assignmentSchema);

module.exports = Assignment;

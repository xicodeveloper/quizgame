var mongoose = require("mongoose");


const questionSchema = new mongoose.Schema({
  category: { type: String },
  type: { type: String },
  difficulty: { type: String },
  question: { type: String },
  correct_answer: { type: String },
  incorrect_answers: { type: [String] },
});
module.exports = mongoose.model("Question", questionSchema);
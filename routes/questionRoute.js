let router = require("express").Router();
let indexView=require("../controller/indexController")
let Question=require("../model/questionDB")

//Esta rota é executado quando o utilizador faz um GET request e executa o middleware indexCont (defefenido nos controladores) no URL => localhost:3000.
const auth =require("../controller/auth")
async function getRandomQuestion() {
    const count = await Question.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const question = await Question.aggregate([
      { $skip: rand },
      { $limit: 1 }
    ]);
    return question[0];
  }
  
  // Example usage:
  


router.get('/question', auth.checkNotAuthenticated_q, (req, res) => {
  getRandomQuestion().then(question => {
  // increment the counter
    res.render('question', { info: question}); // pass the counter value to the view
  }).catch(error => {
    console.log(error);
    res.status(500).send('An error occurred while getting a random question.');
  });
});
module.exports = router;

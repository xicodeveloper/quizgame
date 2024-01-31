const router=require("express").Router();
const auth =require("../controller/auth")
let Question=require("../model/questionDB")

async function getRandomQuestion(req) {
  const { cat } = req.query;
  if(cat!='Mix'){
  const count = await Question.countDocuments({ category: cat });
  const rand = Math.floor(Math.random() * count);
  const question = await Question.aggregate([
    { $match: { category: cat } },
    { $skip: rand },
    { $limit: 1 }
  ]);
  return question[0];
}else{
  const count = await Question.countDocuments();
  const rand = Math.floor(Math.random() * count);
  const question = await Question.aggregate([
    { $skip: rand },
    { $limit: 1 }
  ]);
  return question[0];
}

}

  
  router.get('/chat', auth.checkAuthenticated_Chat, (req, res) => {
    getRandomQuestion(req).then(question => {
    // increment the counter
      res.render('chat', { info: question}); // pass the counter value to the view
    }).catch(error => {
      console.log(error);
      res.status(500).send('An error occurred while getting a random question.');
    });
  });
  router.get('/chat', auth.checkNotAuthenticated_Chat, (req, res) => {
    getRandomQuestion().then(question => {
    // increment the counter
      res.render('chat', { info: question}); // pass the counter value to the view
    }).catch(error => {
      console.log(error);
      res.status(500).send('An error occurred while getting a random question.');
    });
  });
module.exports=router;
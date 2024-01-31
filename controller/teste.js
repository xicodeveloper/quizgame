const { render } = require("ejs");
const User=require("../model/userDB")

 const a=async function(req,res){
const b=User.findOne({ username: "Francisco" })
  .populate("friend") // Populate the friend field with User documents
res.render("test")
}

module.exports={a};
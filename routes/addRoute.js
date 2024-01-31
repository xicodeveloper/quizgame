const router=require("express").Router();
const auth =require("../controller/auth")
const indexController =require("../controller/indexController")


router.get("/add/new", auth.checkAuthenticated_Add,function(req, res){
    res.render("add");

})
router.post('/add/new', indexController.adicionaamigos)
    
router.get("/add/new", auth.checkNotAuthenticated_Add,function(req, res){
    res.render("add");

})
module.exports=router;
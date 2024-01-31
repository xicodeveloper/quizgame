const router=require("express").Router();
const auth =require("../controller/auth")
const auth2 =require("../controller/indexController")
router.get("/room", auth.checkAuthenticated_Rooms,function(req, res){
    res.render("rooms");

})
router.get("/room", auth.checkNotAuthenticated_Rooms,function(req, res){
    res.render("rooms");

})

module.exports=router;
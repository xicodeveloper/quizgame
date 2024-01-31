const router=require("express").Router();
const auth =require("../controller/auth")
const i =require("../controller/indexController")

router.get("/message",auth.checkAuthenticated_message , i.message);

router.get("/message",auth.checkNotAuthenticated_message , i.message);


module.exports=router;
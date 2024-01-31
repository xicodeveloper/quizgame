const router=require("express").Router();
const auth =require("../controller/auth")
const indexController =require("../controller/indexController")

router.get("/friends", auth.checkAuthenticated_Friends,indexController.mostraAmigos)
router.get("/friends", auth.checkNotAuthenticated_Friends,indexController.mostraAmigos)
module.exports=router;
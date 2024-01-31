const router=require("express").Router();
const auth =require("../controller/auth")
const indexController =require("../controller/indexController")

router.get("/end", auth.checkAuthenticated_End,indexController.mostraUsuario2);

router.get("/end", auth.checkNotAuthenticated_End,indexController.mostraUsuario2);

module.exports=router;
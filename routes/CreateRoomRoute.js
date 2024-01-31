const router=require("express").Router();
const auth =require("../controller/auth")

const indexController =require("../controller/indexController")

router.get("/create", auth.checkAuthenticated_Create,indexController.mostraAmigos2)
router.get("/create", auth.checkNotAuthenticated_Create,indexController.mostraAmigos2)

module.exports=router;
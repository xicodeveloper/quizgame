const router=require("express").Router();
const auth =require("../controller/auth")
const indexController =require("../controller/indexController")

router.get("/anch", auth.checkAuthenticated_Anch,indexController.mostraUsuario3)
router.get("/anch", auth.checkNotAuthenticated_Anch,indexController.mostraUsuario3)

module.exports=router;
const router=require("express").Router();
const auth =require("../controller/auth")
const indexController=require("../controller/indexController")
router.get("/rank", auth.checkAuthenticated_Rank,indexController.mostraUsuario4)

router.get("/rank", auth.checkNotAuthenticated_Rank,indexController.mostraUsuario4)
module.exports=router;
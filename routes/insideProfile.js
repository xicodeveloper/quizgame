const router=require("express").Router();
const auth =require("../controller/auth")
const userc2=require("../controller/indexController")
router.get("/insideProfile/:id", auth.checkAuthenticated_insideProfile,userc2.mostraIUsuarioProfile);


router.get("/insideProfile/:id", auth.checkNotAuthenticated_insideProfile,userc2.mostraIUsuarioProfile)
module.exports=router;
const router=require("express").Router();
const userc=require("../controller/userController")
const userc2=require("../controller/indexController");
const auth =require("../controller/auth")

router.get("/profile/:id",auth.checkAuthenticated_profile,userc2.mostraUsuarioProfile);
router.get("/profile/:id",auth.checkNotAuthenticated_profile,userc2.mostraUsuarioProfile);

router.patch("/profile/:id",userc.atualizaUser)
module.exports=router;
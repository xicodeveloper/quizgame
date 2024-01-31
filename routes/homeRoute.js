const router=require("express").Router();
const indexView2=require("../controller/userController");
const indexView=require("../controller/indexController");
const auth=require("../controller/auth")
router.get("/home", auth.checkAuthenticated_Home,indexView.mostraUsuario)
router.get("/home", auth.checkNotAuthenticated_Home,indexView.mostraUsuario)
router.get("/logout", indexView2.logout)

module.exports=router;
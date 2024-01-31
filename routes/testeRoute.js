const router=require("express").Router();
const auth =require("../controller/indexController")
router.get("/test/:cat",auth.mostraAmigos2);

router.get("/test/:cat",auth.mostraAmigos2);

module.exports=router;
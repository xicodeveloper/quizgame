const router = require("express").Router();
const passport=require("passport")
let userController=require("../controller/userController")
//Esta rota é executado quando o utilizador faz um GET request e executa o middleware indexCont (defefenido nos controladores) no URL => localhost:3000.
router.get("/login", userController.userLGet);
//authenticate(), que permite fazer o utilizador caso as credenciais do utilizador (username e password) estarem de acordo com os
//dados guardados em MongoDB. Para fazer a verificação das credenciais em MongoDB, utilizamos passport local strategy (local)
router.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/login" }),
    function (req, res) {
        console.log("User data stored in session:", req.session.passport.user);
        res.redirect("/home");
    }
   );
   
module.exports = router;

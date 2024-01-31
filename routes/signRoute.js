const router = require("express").Router();
const userCont = require("../controller/userController");
router.get("/", userCont.userGet);
router.post("/sign", userCont.userPost);
module.exports = router;

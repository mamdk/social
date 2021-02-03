const express = require("express");
const router = express.Router();
const { signup, signin, signout, check } = require("../controller/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", check, signout);



module.exports = router;

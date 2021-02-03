const express = require("express");
const router = express.Router();
const { userById, addFollowing, addFollower, allUsers, getUser, isAuth, updateUser, deleteUser, removeFollowing, removeFollower } = require("../controller/user")
const { check } = require("../controller/auth");


//follow
router.put("/user/follow", addFollowing, addFollower)
router.put("/user/unfollow", removeFollowing, removeFollower)

router.get("/users", allUsers);
router.get("/user/:userId", getUser);
router.put("/user/:userId", check, isAuth, updateUser);
router.delete("/user/:userId", check, isAuth, deleteUser);



router.param("userId", userById);

module.exports = router;
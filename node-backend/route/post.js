const express = require('express');
const { userById } = require("../controller/user");
const { check } = require("../controller/auth");

const { allPosts, createPost, postsByUser, singlePost, postById, isPoster, updatePost,
    deletePost, comment, uncomment, like, unlike } = require('../controller/post');

const router = express.Router();

//main routes
router.get('/posts', allPosts);
router.post('/post/new/:userId', createPost);
router.get('/posts/by/:userId', postsByUser);
router.get('/post/:postId', singlePost);
router.put('/post/:postId', isPoster, updatePost);
router.delete('/post/:postId', isPoster, deletePost);

//comment uncomment
router.put('/post/comment', comment);
router.put('/post/uncommnet', uncomment);

//like
router.put('/post/like', like);
router.put('/post/unlike', unlike);


//params
router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
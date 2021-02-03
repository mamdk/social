const Post = require("../model/post");

//userId
exports.postsByUser = (req, res, next, id) => {
    Post.find({ postedBy: id })
        .populate("postedBy", "_id name")
        .sort({ created: -1 })
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            res.json(posts);
        })
}


exports.allPosts = (req, res) => {
    const posts = Post.find()
        .populate("postedBy", "_id name")
        .sort({ created: -1 })
        .then(posts => {
            res.json(posts);
        })
        .catch(err => console.log(err));
}


exports.createPost = (req, res) => {
    let post = new Post(req.body);

    req.profile.password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;

    post.save((err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json(result)
    });
}


//postId
exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .populate("postedBy", "_id name")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({ error: err });
            }

            req.post = post;
            next();
        })
}


exports.singlePost = (req, res) => {
    return res.json(req.post);
}


exports.isPoster = (req, res, next) => {
    const isPoster = req.post && req.body.userId && req.post.postedBy._id == req.body.userId;

    if (!isPoster) {
        return res.status(400).json({ error: "User is not authorized" });
    }

    next();
}


exports.updatePost = (req, res) => {
    req.body.update.updated = new Date();

    Post.findByIdAndUpdate(req.post._id, { $set: req.body.update })
        .exec((err , post) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(post);
        })
}

exports.deletePost = (req, res) => {
    const { _id } = req.post;

    Post.findByIdAndDelete(_id)
        .exec(err => {
            if (err) {
                return res.status(400).json({ error: err });
            }

            res.json({ message: "deleted post successfully" })
        })
}



//commnet
exports.comment = (req, res) => {
    const { comment, postId, userId } = req.body;

    comment.commentBy = userId;

    Post.findByIdAndUpdate(postId, { $push: { comments: comment } }, { new: true })
        .populate("commnet.commentBy", "_id user")
        .populate("postedBy", "_id user")
        .exec((err, result) => {
            if (err) {
                return res.status(401).json({ error: err })
            }

            res.json(result);
        })

}

exports.uncomment = (req, res) => {

    const { comment, postId } = req.body;

    Post.findByIdAndUpdate(postId, { $pull: { comments: { _id: comment._id } } }, { new: true })
        .populate("commnet.commentBy", "_id user")
        .populate("postedBy", "_id user")
        .exec((err, result) => {
            if (err) {
                return res.status(401).json({ error: err })
            }
            res.json(result);
        })

}


//like
exports.like = (req, res) => {
    const { userId, postId } = req.body;

    Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(401).json({ error: err })
            }
            res.json(result);
        })
}

exports.unlike = (req, res) => {
    const { userId, postId } = req.body;

    Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(401).json({ error: err })
            }
            res.json(result);
        })
}



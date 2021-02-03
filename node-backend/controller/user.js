const express = require("express");
const User = require("../model/user");

exports.userById = (req, res, next, id) => {
    User.findById(id)
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({ error: err })
            }
            req.profile = user;
            next();
        });
}




exports.addFollowing = (req, res, next) => {
    const { userId, followId } = req.body;

    User.findByIdAndUpdate(userId, { $push: { following: followId } }, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        next();
    })


}


exports.addFollower = (req, res) => {
    const { userId, followId } = req.body;

    User.findByIdAndUpdate(followId, { $push: { follower: userId } }, { new: true })
        .populate("follower", "_id name")
        .populate("following", "_id name")
        .exec((err, result) => {
            if (err) return res.status(401).json({ error: err })

            result.password = undefined;
            result.salt = undefined;
            res.json(result);
        })

}

// removeFollowing, removeFollower
exports.removeFollowing = (req,res,next) => {
    const { userId, followId } = req.body;

    User.findByIdAndUpdate(userId, { $pull: { following: followId } }, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        next();
    })

}


exports.removeFollower = (req,res,next) => {
    const { userId, followId } = req.body;

    User.findByIdAndUpdate(followId, { $pull: { follower: userId } }, { new: true })
        .populate("follower", "_id name")
        .populate("following", "_id name")
        .exec((err, result) => {
            if (err) return res.status(401).json({ error: err })

            result.password = undefined;
            result.salt = undefined;
            res.json(result);
        })
}


exports.allUsers = (req, res) => {
    User.find()
        .populate("follower", "_id name")
        .populate("following", "_id name")
        .select("name email follower following created img")
        .exec((err, users) => {
            if (err) return res.status(401).json({ error: err })

            res.json(users);
        })
}



exports.getUser = (req, res) => {
    req.profile.password = undefined;
    req.profile.salt = undefined;
    res.json(req.profile);
}


exports.isAuth = (req, res, next) => {
    const isAuth = req.profile && req.body.userId && req.body.userId == req.profile._id;

    if(!isAuth) return res.status(403).json({error : "User is not authorized to perform this action"});

    next();
}

exports.updateUser = (req,res) => {
    const {userId , update} = req.body;
    update.updated = new Date();

    User.findByIdAndUpdate(userId , {$set: update} , (err , result) => {
        if (err) return res.status(401).json({ error: err })

        res.json(result)
    });
}




exports.deleteUser = (req,res) => {
    const {userId} = req.body;

    User.findByIdAndDelete(userId , (err , result) => {
        if (err) return res.status(401).json({ error: err })

        res.json({message : "User deleted successfully!"})
    });
}
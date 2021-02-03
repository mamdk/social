const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
        minlength: 3
    },
    body: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
        minlength: 3
    },
    comments: [{
        text: String,
        commentBy: { type: ObjectId, ref: "User" },
        created: { type: Date, default: new Date() }
    }],
    likes: [{
        likeBy: { type: ObjectId, ref: "User" }
    }],
    img: String,
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: new Date()
    },
    updated: Date
});



module.exports = mongoose.model("Post", postSchema);
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    salt: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    following: [{
        type: ObjectId, ref: "User"
    }],
    follower: [{
        type: ObjectId, ref: "User"
    }],
    img: String,
    created: {
        type: Date,
        default: new Date()
    },
    updated: Date
});



module.exports = mongoose.model("User", userSchema);

const User = require("../model/user");
const { hashPassword } = require("../helper/hashPassword");
const jwt = require("jsonwebtoken");
const express_jwt = require("express-jwt");
require("dotenv").config();

const rand = (h, l) => Math.floor(l + Math.random() * (h - l));
const getSalt = () => {
    const str = "0123456789abcdefghijklmnopqrstuvwxyz";
    let salt = "";

    for (let i = 0; i < 5; i++) {
        if (i) salt += "-";

        for (let j = 0; j < 4; j++) {
            salt += str[rand(0, str.length)];
        }
    }

    return salt;
}


exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.status(403).json({ error: "email is token!" });
    }

    const salt = getSalt();
    const pass = hashPassword(password, salt);


    const user = new User({ name, email, password: pass, salt });
    await user.save();
    res.status(200).json({ message: 'Signup success! Please login.' });
};


exports.signin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(403).json({ error: "user with this email is not exsist!!" });
        }

        const pass = hashPassword(password, user.salt);

        if (pass !== user.password) {
            return res.status(401).json({
                error: 'Email and password do not match'
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie("t", token, { expire: new Date() + 9999 });
        const { _id, name, email, img } = user;
        return res.json({ token, user: { id: _id, name, email, img } })

    })
}



exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({ message: "sign out success" });
}

exports.check = express_jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['RS256']
})



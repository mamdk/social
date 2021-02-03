const crypto = require("crypto");



exports.hashPassword = (password, salt) => {
    return h_pass = crypto
        .createHmac("sha1", salt)
        .update(password)
        .digest("hex");
}



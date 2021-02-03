const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5050;
const routerAuth = require("./route/auth");
const routerPost = require("./route/post");
const routerUser = require("./route/user");


mongoose.connect(process.env.mongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("conneted!")).catch((err) => { console.log(err) });


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use("/", routerPost);
app.use("/", routerUser);
app.use("/", routerAuth);
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});

app.listen(port, (req, res) => {
    console.log("server up in port: " + port);
})



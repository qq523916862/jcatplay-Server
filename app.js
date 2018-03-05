/**
 * Created by web-01 on 2018/1/10.
 */
const express = require("express");
const pool = require("pool");
const http = require("http");
const cookie = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const indextool = require("./router/indextool");
const user = require("./router/user");
const songsheel = require("./router/songSheel");
const cors = require("cors");
const appUser = require("./router/app-user");
const singer = require("./router/singer");
const ranking = require("./router/ranking");
const album = require("./router/album");
const disk = require("./router/disk");

var app = new express();
var server = http.createServer(app);

server.listen(8035);
console.log("this server running on 8035......");

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookie("boasing"));
app.use(session({
    secret:"boasing",
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:60*60*1000}
}));

app.use((req,res,next)=>{
    req.session._garbage = new Date();
    req.session.touch();
    next();
});

app.use(cors({
    origin:'*'
}));

app.use("/index",indextool);
app.use("/user",user);
app.use("/songsheel",songsheel);
app.use("/appUser",appUser);
app.use("/singer",singer);
app.use("/ranking",ranking);
app.use("/album",album);
app.use("/disk",disk);
/**
 * Created by web-01 on 2018/1/25.
 */
const express = require("express");
const pool = require("pool");
const session = require("express-session");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");


var router = express.Router();

var arr1 = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var arr2 = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var arr3 = ["1","2","3","4","5","6","7","8","9"];
var yzm = arr1.concat(arr2,arr3);
var getYZM = ()=>{
    var arr = [];
    var rt = "";
    for(var i = 0; i < 4; i++){
        arr.push(Math.floor(Math.random()*yzm.length));
        rt += yzm[arr[i]];
    }
    return rt;
}


router.use(bodyParser.urlencoded({extended:false}));
router.use(cookie("boasing"));

// router.use(session({
//     secret:"boasing",
//     resave:true,
//     saveUninitialized:true,
//     cookie:{maxAge:30*60*1000}
// }));



router.post("/login",(req,res)=>{
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    var yzm = req.body.yzm;
    if(yzm.toLowerCase()!=req.session.yzm.toLowerCase()){
        res.json({code:0,msg:"验证码错误"});
    }else {
        pool.getConnection((err, conn) => {
            if (err) throw  err;
            let sql = "select * from users where uname=? AND upwd=?";
            conn.query(sql, [uname, upwd], (err, result) => {
                if (err) throw err;
                if (result.length === 1) {
                    req.session.uid = result[0].uid;
                    res.json({code: 1, msg: "登录成功,请稍后..."});
                } else {
                    res.json({code: 0, msg: "账号与密码不匹配"});
                }
                conn.release();
            });
        });
    }
});

router.post("/register",(req,res)=>{
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    var email = req.body.email;
    var phone = req.body.phone;
    var yzm = req.body.yzm;
    if(yzm.toLowerCase()!=req.session.yzm.toLowerCase()){
        res.json({code:0,msg:"验证码错误"});
    }else{
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            let sql = "insert into users value(null,?,?,?,'',?,'','')";
            conn.query(sql,[uname,upwd,email,phone],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows==1){
                    res.json({code:1,msg:"注册成功,请稍后..."});
                }else{
                    res.json({code:0,msg:"注册失败"});
                }
                conn.release();
            });
        });
    }
});

router.post("/checkUname",(req,res)=>{
    var uname = req.body.uname;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let sql = "select * from users where uname=?";
        conn.query(sql,[uname],(err,result)=>{
            if(err) throw err;
            if(result.length==1){
                res.json({code:0,msg:"用户名已存在"});
            }else{
                res.json({code:1,msg:"用户名可以使用"});
            }
            conn.release();
        });
    });
});

router.get("/userdestory",(req,res)=>{
    req.session.destroy();
    res.json({code:1,msg:"注销成功"});
});


router.get("/checkLogin",(req,res)=>{
    if(req.session.uid){
        res.json({code:1,msg:"已经登录"});
    }else{
        res.json({code:0,msg:"未登录"});
    }
});

router.get("/getyzm",(req,res)=>{
    req.session.yzm = getYZM();
    res.json({code:1,yzm:req.session.yzm});
});





module.exports = router;
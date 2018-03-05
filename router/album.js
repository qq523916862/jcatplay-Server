/**
 * Created by web-01 on 2018/2/6.
 */
/**
 * Created by web-01 on 2018/1/10.
 */
const express = require("express");
const pool = require("pool");


var router = express.Router();

router.get("/new",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select * from carousel_banner LIMIT 0,8";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();

        });
    });
});

router.get("/all",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select * from carousel_banner";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();

        });
    });
});




module.exports = router;










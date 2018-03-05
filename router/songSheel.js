/**
 * Created by web-01 on 2018/1/31.
 */
const express = require("express");
const pool = require("pool");


var router = express.Router();

router.get("/all",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select * from music_index_hot LIMIT 0,60";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.json(result);
            conn.release();
        });
    })
})

router.get("/maxcount",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select count(*) AS count from music_index_hot";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            var count = Math.ceil(result[0].count/60);
            res.json({count:count});
            conn.release();
        });
    })
})

router.get("/getpage",(req,res)=>{
    var count = req.query.count-1;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select * from music_index_hot LIMIT ?,60"
        conn.query(sql,[count*60],(err,result)=>{
            if(err) throw err;
            res.json(result);
            conn.release();
        })
    })
});


router.get("/getMusic",(req,res)=>{
    var count = req.query.count-1;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select * from music_index_hot LIMIT ?,60"
        conn.query(sql,[count*60],(err,result)=>{
            if(err) throw err;
            res.json(result);
            conn.release();
        })
    })
})

module.exports = router;
/**
 * Created by web-01 on 2018/2/5.
 */
const express = require("express");
const pool = require("pool");

var router = express.Router();

router.get("/recommend",(req,res)=>{
    var count = req.query.count || 1;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "(select * from singer LIMIT 0,10) UNION (select * from singer LIMIT ?,?)";
        conn.query(sql,[(count-1)*100+10,100],(err,result)=>{
            if(err) throw err;
            res.json(result);
            conn.release();
        })
    })
});

router.get("/maxcount",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select count(*) AS count from singer";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            var count = Math.ceil((result[0].count-10)/100);
            res.json({count:count});
            conn.release();
        })
    });
});

router.get("/getMusic",(req,res)=>{
    var singer = req.query.singer;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        conn.query("select sid,src,s_title,did,disk_title,s_singer from sing_list LEFT OUTER JOIN music_new_disk ON album_id=did where s_singer=?",singer,(err,result)=>{




            if(err) throw err;
            res.json(result);
            conn.release();
        });
    });
});

router.get("/getDisk",(req,res)=>{
    var singer = req.query.singer;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        conn.query("select * from music_new_disk where disk_singer=?",singer,(err,result)=>{
            if(err) throw err;
            res.json(result);
            conn.release();
        });
    });
});

module.exports = router;


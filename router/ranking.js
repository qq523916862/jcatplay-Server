/**
 * Created by web-01 on 2018/2/5.
 */

const express = require("express");
const pool = require("pool");

var router = express.Router();

router.get("/forHot",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select sid,src,s_title,s_singer,s_time,did,disk_title,pic_src from sing_list LEFT OUTER JOIN music_new_disk ON album_id=did order by hot DESC LIMIT 0,100";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();
        });
    })
});

router.get("/fotTime",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select sid,src,s_title,s_singer,s_time,did,disk_title,pic_src from sing_list LEFT OUTER JOIN music_new_disk ON album_id=did order by s_time DESC LIMIT 0,100";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();
        });
    })
});

router.get("/music",(req,res)=>{
    var sid = req.query.sid;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        conn.query("select * from sing_list where sid=?",sid,(err,result)=>{
            if(err) throw err;
            res.json(result[0]);
            conn.release();
        })
    })
});


router.get("/forElectric",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select sid,src,s_title,s_singer,s_time,did,disk_title,pic_src from sing_list LEFT OUTER JOIN music_new_disk ON album_id=did order by electric DESC LIMIT 0,100";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();
        });
    })
});


router.get("/getNewTime",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select * from sing_list order by s_time DESC LIMIT 0,1";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();
        });
    })
});

module.exports = router;


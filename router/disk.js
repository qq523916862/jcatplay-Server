/**
 * Created by web-01 on 2018/2/7.
 */
/**
 * Created by web-01 on 2018/2/2.
 */
/**
 * Created by web-01 on 2018/1/25.
 */
const express = require("express");
const pool = require("pool");


var router = express.Router();

router.get("/new",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select * from music_new_disk LIMIT 0,10";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();
        });
    })
});

router.get("/once",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select * from music_new_disk LIMIT 0,10";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();
        });
    })
});


router.get("/getDiskTitle",(req,res)=>{
    var did = req.query.did;
   pool.getConnection((err,conn)=>{
       throw err;
       conn.query("select ")
   })

});


router.get("/getPage",(req,res)=>{
    var page = req.query.count;
    page = (page-1)*50+10;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select * from music_new_disk LIMIT ?,50";
        conn.query(sql,page,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();
        });
    })
});

router.get("/maxcount",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql = "select count(*) AS count from music_new_disk";
        conn.query(sql,(err,result)=>{
            if(err) throw err;
            var count = Math.ceil((result[0].count-10)/100);
            res.json({count:count});
            conn.release();
        })
    });
});


router.get("/getMusic",(req,res)=>{
    var did = req.query.did;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        conn.query("select sid,src,s_title,did,disk_title from sing_list LEFT OUTER JOIN music_new_disk ON album_id=did where did=?",did,(err,result)=>{
            if(err) throw err;
            res.json(result);
            conn.release();
        });
    });
});



module.exports = router;
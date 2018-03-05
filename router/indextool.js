/**
 * Created by web-01 on 2018/1/10.
 */
const express = require("express");
const pool = require("pool");


var router = express.Router();


router.get("/banner",(req,res)=>{
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

router.get("/hotmusic",(req,res)=>{
   pool.getConnection((err,conn)=>{
       if(err) throw err;
       var sql = "select * from music_index_hot LIMIT 0,8";
       conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();
       });
   })
});

router.get("/newdisk",(req,res)=>{
   pool.getConnection((err,conn)=>{
       if(err) throw err;
       var sql = "select * from music_new_disk LIMIT 0,8";
       conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();
       });
   })
});

router.get("/songByHot",(req,res)=>{
    pool.getConnection((err,conn)=>{
       if(err) throw err;
       var sql = "select sid,src,s_title from sing_list order by hot DESC LIMIT 0,10";
       conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();
       });
   })
});

router.get("/songByTime",(req,res)=>{
   pool.getConnection((err,conn)=>{
       if(err) throw err;
       var sql = "select sid,src,s_title from sing_list order by s_time DESC LIMIT 0,10";
       conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();
       });
   })
});

router.get("/songByElectric",(req,res)=>{
   pool.getConnection((err,conn)=>{
       if(err) throw err;
       var sql = "select sid,src,s_title from sing_list order by electric DESC LIMIT 0,10";
       conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();
       });
   })
});

router.get("/singer",(req,res)=>{
   pool.getConnection((err,conn)=>{
       if(err) throw err;
       var sql = "select * from singer LIMIT 0,10";
       conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
            conn.release();
       });
   })
});




module.exports = router;










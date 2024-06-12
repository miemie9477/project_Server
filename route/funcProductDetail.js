var express = require('express');
var router = express.Router();
var db = require('../model/localhost_connection');

router.get("/getDetail/:pNo", (req, res) =>{
    console.log("Getting detail");
    const pNo = req.params.pNo;
    const sql = "SELECT * FROM `00product` WHERE `pNo`=? "
    
    db.connection.query(sql, [pNo],
        (error, data) =>{
            if(error) console.log(error);
            else{
                if(data.length > 0){
                    console.log(data);
                    res.send(data);
                }
                else{
                    console.log("no result,", data);
                    res.status(500).send();
                }
            }
        }
    )
})

router.get("/search/:keyword", (req, res) =>{
    console.log("Searching")
    const sql = "SELECT * FROM `00product` WHERE `pName` LIKE ? OR `brand` LIKE ?;"
    const keyword = req.params.keyword;
    const params = [`%${keyword}%`];
    console.log("keyword:"+ keyword);
    db.connection.query(sql, [params, params],
        (error, data) =>{
            if(error){
                console.log(error);
            }
            else{
                if(data.length > 0){
                    console.log("result: true")
                    console.log(data);
                    res.send(data);
                }
                else{
                    console.log("result: null")
                    res.send({result: "null"});
                }
            }
        }
    )

})

router.post("/getBoard", (req, res) =>{
    const pNo = req.body.pNo;
    console.log("pNo:", pNo);
    const sql = "SELECT * FROM 00board WHERE pNo=?"
    db.connection.query(sql, [pNo],
        (error, data) =>{
            if(error) {
                console.log(error);
                res.status(500).send({result: "Error"});
            }
            else{
                if(data.length > 0){
                    console.log(data);
                    res.send(data);
                }
                else{
                    console.log(data);
                    res.send({result: "No result"});
                }
            }
        }
    )
})

module.exports = router;
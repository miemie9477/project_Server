var express = require('express');
var router = express.Router();
var db = require('../model/localhost_connection');
const { route } = require('./funcCartDetail');

router.get("/viewMember", (req, res) =>{
    const sql = "SELECT * FROM `00member`"
    db.connection.query(sql, 
        (error, data) =>{
            if(error){
                console.log("wrong with viewing member data")
                console.log(error);
            }
            else{
                if(data.length > 0){
                    res.send(data);
                    console.log(data);
                }
                else{
                    res.send({result: "Found no data"})
                }
            }
        }
    )
})

router.post("/modifyMember", (req, res) =>{
    
})

router.get("/viewMerchandise", (req, res) =>{
    const sql = "SELECT * FROM `00product`"
    db.connection.query(sql,
        (error, data) =>{
            if(error){
                console.log("error,", error)
            }
            else{
                if(data.length > 0)
                    res.send(data);
                else{
                    console.log("something wrong");
                    res.status(500).send({result: "error"});
                }
            }
        }
    )
})

router.get("/viewTransaction", (req, res) =>{

})
module.exports = router;
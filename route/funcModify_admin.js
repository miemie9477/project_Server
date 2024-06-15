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
                    console.log(data);
                    res.send(data);
                }
                else{
                    res.send({result: "Found no data"})
                }
            }
        }
    )
})

router.post("/modifyMember", (req, res) =>{
    const mId = req.body.mId;
    const mName = req.body.mName;
    const pId = req.body.pId;
    const email = req.body.email;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const address = req.body.address;

    const sql = "UPDATE `00member` SET `mName`=?,`pId`=?,`email`=?,`gender`=?,`phone`=?,`address`=? WHERE mId=?"
    db.connection.query(sql, [mName, pId, email, gender, phone, address, mId],
        (error, data) =>{
            if(error){
                console.log("error,", error)
            }
            else{
                if(data.length > 0){
                    console.log(data);
                    res.send(data);
                }
                else{
                    console.log("something wrong");
                    res.status(500).send({result: "error"});
                }
            }
        }
    )
})

router.post("/modifyPwd", (req, res) =>{
    const mId = req.body.mId;
    const mPwd = req.body.mPwd;
    const sql = "UPDATE `00member` SET `mPwd`='?' WHERE mId=?";
    db.connection.query(sql, [mPwd, mId],
        (error, data) =>{
            if(error){
                console.log("error,", error)
            }
            else{
                if(data.length > 0){
                    console.log(data);
                    res.send(data);
                }
                else{
                    console.log("something wrong");
                    res.status(500).send({result: "error"});
                }
            }
        }
    )
})

router.get("/viewMerchandise", (req, res) =>{
    const sql = "SELECT * FROM `00product product JOIN 00record record ON product.rId = record.rId`"
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
module.exports = router;
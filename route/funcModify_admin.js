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
    const birthday = req.body.birthday;
    const mAccount = req.body.mAccount;
    const mPwd = req.body.mPwd;

    const sql = "UPDATE `00member` SET `mAccount`=?,`mPwd`=?,`mName`=?,`pId`=?,`email`=?,`gender`=?, `phone`=?,`birthday`=? WHERE mId=?"
    db.connection.query(sql, [mAccount, mPwd, mName, pId, email, gender, phone, birthday, mId],
        (error, data) =>{
            if(error){
                console.log("error,", error)
            }
            else{
                if(data.length > 0){
                    console.log(data);
                    res.send(data);
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

router.post("/deleteMember", (req, res) =>{
    const mId = req.body.mId;
    const sql = "DELETE FROM `00member` WHERE mId=?"
    db.connection.query(sql, [mId],
        (error, data) =>{
            if(error){
                console.log(error);
                res.status(500).send(error);
            }
            else{
                console.log(data);
                res.send({result:"success", data});
            }
        }
    )
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


router.post("/viewTrans", (req, res) =>{
    const sql = "SELECT * FROM `00transaction`"
    db.connection.query(sql,
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
module.exports = router;
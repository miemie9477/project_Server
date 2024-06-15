var express = require('express');
var router = express.Router();
var db = require('../model/localhost_connection');
const { default: axios } = require('axios');

router.get("/getData/:userAccount", (req, res) =>{
    const mId = req.params.userAccount;

    console.log("fetch:" + mId);

    try{
        db.connection.query(
            "SELECT * FROM `00member` WHERE `mId`=?;",
            [mId],
            (error, data) => {
                if(error){
                    console.log(error);
                    res.send(error);
                }
                else{
                    if(data.length > 0){
                        console.log({get: data});
                        // for (let user of users) {
                            
                        //     req.session.user = mAccount;
                        //     return res.redirect('/welcome')
                            
                        // };
                        res.json(data);
                        return;
                    }
                    else{
                        console.log("No result");
                        return res.send({result: "Search failed"});
                    }
                }
            }
        )
    }
    catch(error){
        console.log(error)
        throw error;
    }
})

router.post("/modifySubmit", (req, res)=>{
    const sql = "UPDATE `00member` SET `mName`=?,`pId`=?,`email`=?,`gender`=?,`address`=?,`phone`=? WHERE `mId`=?"
    const mId = req.body.mId;
    const mName = req.body.mName;
    const pId = req.body.pId;
    const email = req.body.email;
    const gender = req.body.gender;
    const address = req.body.address;
    const phone = req.body.phone;
    db.connection.query(sql, [mName, pId, email, gender, address, phone, mId],
        (error, data) =>{
            if(error){
                console.log(error);
                res.status(500).send("error");
            }
            else{
                console.log(data);
                res.send({result:"success", data});
            }
        }
    )
})

router.post("/modifyPwd", (req, res) =>{
    const sql = "UPDATE `00member` SET mPwd=? WHERE mId=?"
    const mId = req.body.userAccount;
    const mPwd = req.body.mPwd;
    db.connection.query(sql, [mPwd, mId],
        (error, data) =>{
            if(error){
                console.log(error);
                res.status(500).send("error");
            }
            else{
                console.log(data);
                res.send({result:"success", data});
            }
        }
    )
})

router.post("/viewTrans", (req, res) =>{
    const mId = req.body.userAccount;
    var sql = "SELECT rId, tState, recipient, reciPhone, tDelivery, tAddress, payState FROM `00transaction` WHERE mId=?"
    var transInfo;
    db.connection.query(sql, [mId],
        (error, data) =>{
            if(error){
                console.log(error);
                res.status(500).send("error");
            }
            else{
                console.log("transaction:", data);
                res.send(data);
                
            }
        }
    )
})

router.post("/viewRecord", (req, res) =>{
    const rId = req.body.rId
    sql = "SELECT * FROM `00record` WHERE rId=?"
    db.connection.query(sql, [rId],
        (error, data) =>{
            if(error){
                console.log(error);
                res.status(500).send("error");
            }
            else{
                console.log(data);
                res.send({data});
            }
        }
    )
})
module.exports = router
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

router.post("/modifyData", (req, res)=>{
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
    var sql = "SELECT rId, total, tState, recipient, reciPhone, tDelivery, tAddress, payState FROM `00transaction` WHERE mId=?"
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
    sql = "SELECT r.*, p.pName FROM 00record r JOIN 00product p ON r.pNo = p.pNo WHERE r.rId =?;"
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

router.post("/rating", (req, res) =>{
    const mId = req.body.userAccount;
    const pNo = req.body.pNo;
    const date = req.body.date;
    const message = req.body.message;
    const sql = "INSERT INTO `00board`(`UUID`, `mId`, `pNo`, `date`, `content`) VALUES ('',?,?,?,?)"
    db.connection.query(sql, [mId, pNo, date, message],
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

router.post("/return", (req, res) =>{
    const rId = req.body.rId;
    const tState = "申請退貨中"
    const sql = "UPDATE 00transaction SET tState=? WHERE rId=?"
    db.connection.query(sql, [tState, rId],
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
module.exports = router
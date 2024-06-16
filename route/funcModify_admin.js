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
                
                console.log(data);
                res.send({result:"success", data});
                
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

router.post("/modifyMerchandise", (req, res)=>{
    const pNo = req.body.pNo;
    const pName = req.body.pName;
    const specification = req.body.specification;
    const brand = req.body.brand;
    const category = req.body.category;
    const unitPrice = req.body.unitPrice;
    const pIntroduction = req.body.pIntroduction;
    const pAmount = req.body.pAmount;

    const sql = "UPDATE `00product` SET `pNo`=?,`pName`=?,`specification`=?,`brand`=?,`category`=?,`unitPrice`=?,`pIntroduction`=?,`pAmount`=? WHERE pNo=?";
    db.connection.query(sql, [pNo, pName, specification, brand, category, unitPrice, pIntroduction, pAmount, pNo],
        (error, data) =>{
            if(error){
                console.log("error,", error)
            }
            else{
                
                console.log(data);
                res.send({result:"success", data});
                
            }
        }
    )
})

router.post("/viewTrans", (req, res) =>{
    const sql = "SELECT * FROM `00transaction` ORDER BY tTime"
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
router.post("/modifyTrans", (req, res) =>{
    const rId = req.body.rId;
    const total = req.body.total;
    const mId = req.body.mId;
    const recipient = req.body.recipient;
    const tDelivery = req.body.tDelivery;
    const tAddress = req.body.tAddress;
    const tState = req.body.tState;
    const payState = req.body.payState;
    const sql = "UPDATE `00transaction` SET `total`=?,`mId`=?,`tDelivery`=?,`tAddress`=?,`recipient`=?,`tState`=?,`payState`=? WHERE rId=?"
    db.connection.query(sql, [total, mId, tDelivery, tAddress, recipient, tState, payState, rId],
        (error, data) =>{
            if(error){
                console.log("error,", error)
            }
            else{
                console.log(data);
                res.send({result:"success", data}); 
            }
        }
    )
})
router.post("/deleteTrans", (req, res) =>{
    const rId = req.body.rId;
    var sql = "DELETE FROM `00transaction` WHERE rId=?"
    db.connection.query(sql, [rId],
        (error, data) =>{
            if(error){
                console.log(error);
                res.status(500).send(error);
            }
            else{
                console.log(data);
                sql = "DELETE FROM 00record WHERE rId=?"
                db.connection.query(sql, [rId],
                    (error, data) =>{
                        if(error){
                            console.log("error,", error)
                        }
                        else{
                            
                            console.log(data);
                            res.send({result:"success", data});
                            
                        }
                    }
                )
            } 
        }
    )
})
module.exports = router;
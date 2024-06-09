var express = require('express');
var router = express.Router();
var db = require('../model/localhost_connection');

router.post("/inputTrans", (req, res) =>{
    const tId = req.body.tId; 
    const tMethod = "cart";
    const tTime = req.body.tTime;
    const mId = req.body.mId;
    const tPay = req.body.tPay;
    const bankId = req.body.bankId;
    const bankName = req.body.bankName;
    const cardId = req.body.cardId;
    const dueDate = req.body.dueDate;
    const tDelivery = req.body.tDelivery;
    const tAddress = req.body.tAddress;
    const recipient = req.body.recipient;
    const reciPhone = req.body.reciPhone;
    const tState = "未出貨"
    const payState = "已付款"

    const sql = "INSERT INTO `00transaction`(`tId`, `tMethod`, `tTime`, `mId`, `tPay`, `bankId`, `bankName`, `cardId`, `dueDate`, `tDelivery`, `tAddress`, `recipient`, `reciPhone`, `tState`, `payState`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    db.connection.query(sql, [tId, tMethod, tTime, mId, tPay, bankId, bankName, cardId, dueDate, tDelivery, tAddress, recipient, reciPhone, tState, payState],
        (error, data) =>{
            if(error){
                console.log("error:", error);
            }
            else{
                console.log({data: data})
                res.send(data);
            }
        }
    )
})

router.post("/record", (req, res)=>{
    const tId = req.body.tId;
    const pNo = req.body.pNo;
    const amount = req.body.amount;
    const rTotal = req.body.rTotal;
    const sql = "INSERT INTO `00record` (`tId`, `pNo`, `amount`, `rTotal`) VALUES(?,?,?,?)"
    
})
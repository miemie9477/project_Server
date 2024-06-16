var express = require('express');
var router = express.Router();
var db = require('../model/localhost_connection');



function generateRId() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const numbers = String(Math.floor(Math.random() * 10000000)).padStart(7, '0');
    const userId = letter + numbers;
    return userId;
}

async function getGenerateRId(){
    const id = generateRId();
    console.log("get userId:" + id);
    // Check if the generated ID is unique
    const query = 'SELECT * FROM 00transaction WHERE rId = ?';
    try {
        const data = await new Promise((resolve, reject) => {
            db.connection.query(query, [id], (error, results) => {
                if (error) {
                    console.log("wrong:", error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        if (data.length === 0) {
            console.log("confirm id:" + id);
            return id;
        } else {
            console.log("failed id:" + id);
            return getGenerateRId(); 
        }
    } catch (error) {
        console.error('Database query failed:', error);
        throw error;
    }
    // try{
    //     db.connection.query(query, [id],
    //         (error, id, data) =>{
    //             if(error){
    //                 console.log("wrong:", error);
    //                 throw error;
    //             }
    //             else if(data.length === 0){
    //                 console.log("confirm id:"+ id);
    //                 return id;
    //             }
    //             else{
    //                 console.log("failed id:"+ id)
    //                 generateMId();
    //             }
    //         }
    //     )
    // }
    // catch(error){
    //     console.error('Database query failed:', error);
    //     throw error;
    // }
    
}

router.post("/checkPAmount", (req, res) =>{
    const pNo = req.body.pNo;
    const amount = req.body.amount;
    console.log(pNo, amount);
    var sql = "SELECT pAmount FROM 00product WHERE pNo=?"
    db.connection.query(sql, [pNo],
        (error, data) =>{
            
            if(error){
                console.log("error:", error);
            }
            else{
                if(parseInt(data[0].pAmount, 10) < parseInt(amount, 10)){
                    console.log("pAmount:", data[0].pAmount);
                    res.send({result:"fail"});
                }
                else{
                    const pAmount = parseInt(data[0].pAmount, 10)-parseInt(amount, 10);
                    sql = "UPDATE 00product SET pAmount=? WHERE pNo=?"
                    db.connection.query(sql, [pAmount, pNo],
                        (error, data) =>{
                            console.log({data: data})
                            res.send({result: "success", data});
                        }
                    )
                }
            }
        }
    )
})

router.post("/inputTrans", async (req, res) =>{
    const rId = await getGenerateRId();
    const total = req.body.total;
    const tMethod = req.body.tMethod;
    const tTime = req.body.tTime;
    const mId = req.body.mId;
    const tPay = req.body.tPay;
    const bankId = req.body.bankId;
    const bankName = req.body.bankName;
    const cardId = req.body.cardId;
    const security = req.body.security;
    const dueDate = req.body.dueDate;
    const tDelivery = req.body.tDelivery;
    const tAddress = req.body.tAddress;
    const recipient = req.body.recipient;
    const reciPhone = req.body.reciPhone;
    const tState = "未出貨"
    const payState = "已付款"

    /* 1.匯入資料到 00transaction(創建rId)
       2.用rId匯入交易明細 00record
       3.刪除 00cartdetail裡已結帳的商品
    */

    const sql = "INSERT INTO `00transaction`(`rId`, `total`,`tMethod`, `tTime`, `mId`, `tPay`, `bankId`, `bankName`, `cardId`, `security`, `dueDate`, `tDelivery`, `tAddress`, `recipient`, `reciPhone`, `tState`, `payState`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    db.connection.query(sql, [rId, total, tMethod, tTime, mId, tPay, bankId, bankName, cardId, security, dueDate, tDelivery, tAddress, recipient, reciPhone, tState, payState],
        (error, data) =>{
            if(error){
                console.log("error:", error);
            }
            else{
                console.log({data: data})
                res.send({data, rId: rId});
            }
        }
    )
})


router.post("/inputRecord", async (req, res) =>{
    const rId = req.body.rId;
    const pNo = req.body.pNo;
    const amount = req.body.amount;
    const rTotal = parseInt(req.body.unitPrice, 10) * amount;
    const sql = "INSERT INTO `00record` (`rId`, `pNo`, `amount`, `rTotal`) VALUES(?,?,?,?)"
    console.log(rId, pNo, amount, rTotal)
    db.connection.query(sql, [rId, pNo, amount, rTotal],
        (error, data) =>{
            if(error){
                console.log(error);
                res.status(500).send(error);
            }
            else{
                console.log(data);
                res.send({result: "success", data});
                //Call API discard item in cart
            }
        }
    )
})



module.exports = router
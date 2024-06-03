var express = require('express');
var router = express.Router();
var db = require('../model/localhost_connection');


function generateMId() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const numbers = String(Math.floor(Math.random() * 10000000)).padStart(7, '0');
    const userId = letter + numbers;
    console.log("get:"+ userId);
    return userId;
}

function getGenerateMId(id){
    
    console.log("userId:" + id);
    // Check if the generated ID is unique
    const query = 'SELECT * FROM 00member WHERE mId = ?';

    try{
        db.connection.query(query, [id],
            (error, data) =>{
                if(error){
                    console.log(error);
                    throw error;
                }
                else if(data.length === 0){
                    console.log("confirm id:" + id);
                    return true;
                }
                else{
                    console.log("failed id:" +id)
                    return false;
                }
            }
        )
    }
    catch(error){
        console.error('Database query failed:', error);
        throw error;
    }
    
}


router.post("/account" , async(req, res)=>{
    console.log("account fetch:" + req.body.mAccount)
    sql = "SELECT mAccount FROM 00member WHERE mAccount=?"
    await db.connection.query(sql, [req.body.mAccount],
        (error, data) =>{
            if(error){
                console.log(error);
                return res.status().send(500, "something wrong");
            }
            else if(data.length > 0){
                return res.json({result: "mAccount exist"});
            }
            else{
                console.log("ok");
                return;
            }
        }
    )
})

router.post("/pId", async (req, res) =>{
    await console.log("pId fetch:" + req.body.pId)
    sql = "SELECT pId FROM 00member WHERE pId=?"
     db.connection.query(sql, [req.body.pId],
        (error, data) =>{
            if(error){
                console.log(error);
                return res.status().send(500, "something wrong");
            }
            else if(data.length > 0){
                return res.json({result: "pId exist"});
            }
            else{
                console.log("ok");
                return;
            }
        }
    )
})

router.post("/email", async (req, res) =>{
    console.log("email fetch:" + req.body.email)
    sql = "SELECT email FROM 00member WHERE email=?"
    await db.connection.query(sql, [req.body.email],
        (error, data) =>{
            if(error){
                console.log(error);
                return res.status().send(500, "something wrong");
            }
            else if(data.length > 0){
                return res.json({result:"email exist"});
            }
            else{
                console.log("ok");
                return;
            }
        }
    )

})

router.post("/phone", async (req, res) =>{
    console.log("phone fetch:" + req.body.phone)
    sql = "SELECT phone FROM 00member WHERE phone=?"
    await db.connection.query(sql, [req.body.phone],
        (error, data) =>{
            if(error){
                console.log(error);
                return res.status().send(500, "something wrong");
            }
            else if(data.length > 0){
                return res.json({result: "phone exist"});
            }
            else{
                console.log("ok");
                return;
            }
        }
    )
})

router.post("/check",(req, res)=>{
    console.log("fetch /check")
    const info ={
        mAccount:  req.body.mAccount,
        mPwd: req.body.mPwd,
        mName: req.body.mName,
        pId: req.body.pId,
        email: req.body.email,
        gender: req.body.gender,
        address: req.body.address,
        phone: req.body.phone,
        birthday: req.body.birthday
    };
    console.log(info.mAccount, info.mPwd, info.mName, info.pId, info.email, info.gender, info.address, info.phone, info.birthday);
    
    sql = "INSERT INTO `00member`(`mId`, `mAccount`, `mPwd`, `mName`, `pId`, `email`, `gender`, `address`, `phone`, `birthday`) VALUES (?,?,?,?,?,?,?,?,?,?)";
    
    const userId = generateMId();

    db.connection.query(
        sql,
        [userId, info.mAccount, info.mPwd, info.mName, info.pId, info.email, info.gender, info.address, info.phone, info.birthday],
        (error, data)=>{
            console.log(data);
            if(error){
                console.log(error);
                res.status(500).json({ error: "伺服器錯誤" });
            }
            else{
                console.log(data);
                return res.send({result: "驗證成功"});
            }
        }
    )
})

module.exports = router;
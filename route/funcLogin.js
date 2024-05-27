var express = require('express');
var router = express.Router();
var app = express();
var cors = require('cors');
app.use(cors());

const mysql = require('mysql');

const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "root123456",
    database: "group_15"
})

connection.connect((error) => {
    if (error) console.log(error);
    else console.log('Connected to the remote database!');
  });

router.post("/verify", (req, res) =>{

    console.log("fetch:" + req.body.mAccount+ " " + req.body.mPassword);

    const reqInfo = {
        mAccount: req.body.mAccount,
        mPwd: req.body.mPassword
    }
   if(typeof reqInfo.mAccount === 'undefined' || typeof reqInfo.mPwd){
        res.status(400).send("data type undefined");
   }
    else{
        try{
        connection.query(
            "SELECT * FROM `00member` WHERE `mAccount`=? AND `mPwd`=?",
            [reqInfo.mAccount, reqInfo.mPwd],
            (error) => {
                if(response, error) {
                    console.error(err);
                    res.status(500).send({err : err});
                }else{
                    if(response.length > 0){
                        console.log(response);
                        res.json({message: 'success'})
                    }else{
                        console.log("wrong");
                    }
                }
            }
        )
        }catch(error){
            console.log(error)
        }
    }
    
    // mysql.connection.query("INSERT INTO `course` (stdno, course) VALUES(?, ?)",
    //     ["S1111112", "test2"],
    // (err) =>{
    //     if(err) {
    //         res.status(500).send({err: err});    
    //     }
    //     else{
    //         res.json({message: "success"});
    //         console.log("success")
    //     }
    // })
})

module.exports = router;
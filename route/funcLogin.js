var express = require('express');
var router = express.Router();
var db = require('../model/localhost_connection');

router.post("/verify", (req, res) =>{

    const mAccount = req.body.mAccount;
    const mPwd = req.body.mPwd;

    console.log("fetch:" + mAccount+ " " + mPwd);

    try{
        db.connection.query(
            "SELECT * FROM `00member` WHERE `mAccount`=? AND `mPwd`=?;",
            [mAccount, mPwd],
            (error, data) => {
                if(error){
                    console.log(error);
                    res.send(error);
                }
                else{
                    if(data.length > 0){
                        console.log({data: data});
                        // for (let user of users) {
                            
                        //     req.session.user = mAccount;
                        //     return res.redirect('/welcome')
                            
                        // };
                        res.send(data);
                        return;
                    }
                    else{
                        console.log("No result");
                        return res.send({result: "Login failed"});
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



module.exports = router;
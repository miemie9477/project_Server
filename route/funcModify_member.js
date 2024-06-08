var express = require('express');
var router = express.Router();
var db = require('../model/localhost_connection');

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

router.post("/modifySubmit/:userAccount", (req, res)=>{
    const sql = "UPDATE `00member` SET `mId`=?,`mAccount`=?,`mPwd`=?,`mName`=?,`pId`=?,`email`=?,`gender`=?,`address`=?,`phone`=?',`birthday`=? WHERE `mAccount`=?"
    const mAccount = req.params.userAccount;
})

module.exports = router
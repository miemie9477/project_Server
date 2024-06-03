var express = require('express');
var router = express.Router();
var db = require('../model/localhost_connection');

router.get("/getData/:userAccount", (req, res) =>{
    const mAccount = req.params.userAccount;

    console.log("fetch:" + mAccount);

    try{
        db.connection.query(
            "SELECT * FROM `00member` WHERE `mAccount`=?;",
            [mAccount],
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
                        res.send(data);
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

module.exports = router
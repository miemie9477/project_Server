var express = require('express');
var router = express.Router();
var db = require('../model/localhost_connection');

// checkNull(data) {
//     for (var key in data) {
//         // 不為空
//         return false;
//     }
//     // 為空值
//     return true;
// }

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
                    res.send(data);
                    console.log(data);
                }
                else{
                    res.send({result: "Found no data"})
                }
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

module.exports = router;
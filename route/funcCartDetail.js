var express = require('express');
var router = express.Router();
var db = require('../model/localhost_connection');

router.get("/getItem/:userAccount", (req, res) =>{
    const mId = req.params.userAccount
    const sql = "SELECT cart.tId, cartdetail.*, product.* FROM 00cart cart JOIN 00cartdetail cartdetail ON cart.tId = cartdetail.tId JOIN 00product product ON cartdetail.pNo = product.pNo WHERE cart.mId=?;"
    //用 會員 選購物車的 交易編號
    //用 交易編號 選 購物車明細
    db.connection.query(sql, [mId],
        (error, data) =>{
            if(error){
                console.log(error);
                res.status(500).send({result: "Error", data, error});
            }
            else{
                if(data.length < 0){
                    res.send({result: "null"})
                }
                else{
                    console.log(data);
                    res.send({data});
                }
            }
        }
    )
})

router.post("/modifyAmount", async (req, res) =>{
    const tId = req.body.tId;
    const pNo = req.body.pNo;
    const amount = req.body.amount;
    var salePrice;
    var sql = "SELECT unitPrice FROM 00product WHERE pNo=?"
    await db.connection.query(sql, [pNo],
        (error, data) =>{
            if(error){
                console.log(error);
                res.status(500).send({result: "Error", data, error});
            }
            else{
                console.log("unitPrice", data[0].unitPrice)
                salePrice = parseInt(data[0].unitPrice, 10) * amount;
                console.log("salePrice:", salePrice);
                
                sql = "UPDATE `00cartdetail` SET `amount`='?',`salePrice`='?' WHERE tId=? AND pNo=?"
                db.connection.query(sql, [amount, salePrice, tId, pNo],
                    (error, data) =>{
                        if(error){
                            console.log(error);
                            res.status(500).send(error);
                        }
                        else{
                            res.send({result: "success", data});
                        }
                    }
                )
            }
        }
    )
    
})

function generateTId() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const numbers = String(Math.floor(Math.random() * 10000000)).padStart(7, '0');
    const userId = letter + numbers;
    return userId;
}

async function getGenerateTId(){
    const id = generateTId();
    console.log("get userId:" + id);
    // Check if the generated ID is unique
    const query = 'SELECT * FROM 00member WHERE mId = ?';
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
            return getGenerateTId();  // 递归调用以生成新的 id
        }
    } catch (error) {
        console.error('Database query failed:', error);
        throw error;
    }
    
}

const create = (mId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const tId = await getGenerateTId();
            const sql = "INSERT INTO 00cart (`mId`, `tId`) VALUES (?, ?)";
            db.connection.query(sql, [mId, tId],
                (error, data) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log("adding", data);
                    resolve(tId); // 返回生成的 tId
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

router.post("/checkExist", async (req, res) => {
    const mId = req.body.userAccount;
    console.log(mId);
    const sql = "SELECT tId FROM 00cart WHERE mId=?";
    db.connection.query(sql, [mId], async (error, data) => {
        if(error){
            console.log(error);
            res.status(500).send({result: "Error", data, error});
        }else {
            console.log("result", data);
            if (data.length === 0) {
                try {
                    const tId = await create(mId); // 等待 create 函數完成
                    res.send({
                        result: "ready",
                        tId: tId, // 包含生成的 tId
                    });
                } catch (createError) {
                    console.log(createError);
                    res.status(500).send({result:"Error creating cart", createError});
                }
            } else if (data.length === 1) {
                console.log(data[0].tId);
                res.send({
                    result: "ready",
                    tId: data[0].tId
                });
            } else {
                res.status(500).send("not found");
            }
        }
    });
});

router.post("/add", (req, res) =>{
    const tId = req.body.tId;
    const pNo = req.body.pNo;
    const amount = req.body.amount;
    const salePrice = req.body.salePrice;
    console.log("Adding.")
    var sql = "INSERT INTO `00cartdetail`(`tId`, `pNo`, `amount`, `salePrice`) VALUES (?,?,?,? );"
    db.connection.query(sql, [tId, pNo, amount, salePrice],
        (error, data) =>{
            if(error){
                console.log(error);
                res.status(500).send({result: "Error", data, error});
            }
            else{
                console.log("success:", data);
                res.send({result: "Add", data});
            }
        }
    )
})

router.post("/cartDiscard", (req, res) =>{
    const tId = req.body.tId;
    const pNo = req.body.pNo;
    const sql = "DELETE FROM `00cartdetail` WHERE tId=? AND pNo=?"

    db.connection.query(sql, [tId, pNo],
        (error, data) =>{
            if(error){
                console.log(error);
                res.status(500).send({result: "Error", data, error});
            }
            else{
                console.log(data);
                res.send({result:"success"});
            }
        }
    )
})


module.exports = router;
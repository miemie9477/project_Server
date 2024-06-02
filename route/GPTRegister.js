var express = require('express');
var router = express.Router();
var db = require('../model/localhost_connection');
const mysql = require('mysql2/promise');

function generateMemberId() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const numbers = String(Math.floor(Math.random() * 10000000)).padStart(7, '0');
    return letter + numbers;
}

async function getGeneratemId() {
    let isUnique = false;
    let userId = '';

    while (!isUnique) {
        userId = generateMemberId();
        console.log("userId:" + userId);
        const query = 'SELECT COUNT(*) AS count FROM 00member WHERE mId = ?';

        try {
            const [rows] = await db.connection.execute(query, [userId]);
            if (typeof rows[0].count === 'undefined') {
                isUnique = true;
            }
        } catch (error) {
            console.error('Database query failed:', error);
            throw error;
        }
    }
    return userId;
}

router.post("/check", async (req, res) => {
    const info = {
        mAccount: req.body.mAccount,
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

    try {
        const queries = [
            { field: 'mAccount', value: info.mAccount, errorCode: 1 },
            { field: 'pId', value: info.pId, errorCode: 2 },
            { field: 'email', value: info.email, errorCode: 3 },
            { field: 'phone', value: info.phone, errorCode: 4 }
        ];

        for (const query of queries) {
            const sql = `SELECT ${query.field} FROM 00member WHERE ${query.field} = ?`;
            const [data] = await db.connection.query(sql, [query.value]);
            if (typeof data === 'undefined') {
                return res.json(query.errorCode);
            }
        }

        const userId = await getGeneratemId();
        const sql = "INSERT INTO `00member`(`mId`, `mAccount`, `mPwd`, `mName`, `pId`, `email`, `gender`, `address`, `phone`, `birthday`) VALUES (?,?,?,?,?,?,?,?,?,?)";
        const [data] = await db.connection.query(sql, [userId, info.mAccount, info.mPwd, info.mName, info.pId, info.email, info.gender, info.address, info.phone, info.birthday]);

        console.log(data);
        return res.send({ result: "驗證成功" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "伺服器錯誤" });
    }
});

module.exports = router;

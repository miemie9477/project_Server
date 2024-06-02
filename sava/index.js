var express = require('express');
const cors = require('cors');
var app = express();

app.use(cors({
    origin: 'http://localhost:3000',   
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true})); 


const mysql = require('mysql');

const connection = mysql.createConnection({
    host:"120.107.152.110",
    user: "a0207",
    password: "pwd0207",
    database: "a0207"
})

connection.connect((error) => {
    if (error) console.log(error);
    else console.log('Connected to the remote database!');
  });

app.post("/verify", (req, res) =>{

    const mAccount = req.body.mAccount;
    const  mPwd = req.body.mPwd;

    console.log("fetch:" + mAccount+ " " + mPwd);
    
    try{
        connection.query(
            "SELECT * FROM `00member` WHERE `mAccount`=? AND `mPwd`=?;",
            [mAccount, mPwd],
            (error, data) => {
                if(error){
                    console.log(error);
                }
                else{
                    if(data.length > 0){
                        console.log({data: data})
                        res.send({result: "success"});
                    }
                    else{
                        res.send({result: ""});
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

const port = 3001;

app.listen(port, () =>{
    console.log("Server run on port:" + port);
})
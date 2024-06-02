var express = require('express');
const cors = require('cors');
var app = express();
// var session = require('/model/setUpSession')


app.use(cors({
    origin: 'http://localhost:3000',   
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

var loginRoute = require("./route/funcLogin");
var registerRoute = require("./route/funcRegister");
var GPTRegister = require("./route/GPTRegister");
app.use("/login", loginRoute);
app.use("/register", registerRoute);
// app.use("/register", GPTRegister);
    

const port = 3001;

app.listen(port, () =>{
    console.log("Server run on port:" + port);
})
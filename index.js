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
var modifyMemberSide = require("./route/funcModify_member");
var modifyAdminSide = require("./route/funcModify_admin");
var productDetail = require("./route/funcProductDetail");
var cartDetail = require("./route/funcCartDetail");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/modifyMemberSide", modifyMemberSide);
app.use("/modifyAdminSide", modifyAdminSide);
app.use("/pDetail", productDetail);
app.use("/cart", cartDetail)


const port = 3001;

app.listen(port, () =>{
    console.log("Server run on port:" + port);
})
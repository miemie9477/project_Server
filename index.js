var express = require('express');
const cors = require('cors');
var app = express();
// var session = require('/model/setUpSession')

// 允许所有来源访问（你可以根据需要限制特定的来源）
app.use(cors({
origin: '*',
credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var loginRoute = require("./route/funcLogin");
var registerRoute = require("./route/funcRegister");
var modifyMemberSide = require("./route/funcModify_member");
var modifyAdminSide = require("./route/funcModify_admin");
var productDetail = require("./route/funcProductDetail");
var cartDetail = require("./route/funcCartDetail");
var check = require("./route/funcCheck");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/modifyMemberSide", modifyMemberSide);
app.use("/modifyAdminSide", modifyAdminSide);
app.use("/pDetail", productDetail);
app.use("/cart", cartDetail);
app.use("/check", check);

// 使用 Heroku 提供的端口号，或在本地运行时使用 3001 端口
const port = process.env.PORT || 3001;

app.listen(port, () => {
console.log("Server run on port:" + port);
});
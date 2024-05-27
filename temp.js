var express = require('express');
const cors = require('cors');
var app = express();

app.get("/", (req, res) =>{
    res.send("Home page");
})

app.use(cors({
    origin: 'http://localhost:3000',   
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

var loginRoute = require("./route/funcLogin");
app.use("/login", loginRoute);



const port = 3001;

app.listen(port, () =>{
    console.log("Server run on port:" + port);
})
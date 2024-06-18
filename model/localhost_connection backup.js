
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:"120.107.152.110",
    // path :"/phpmyadmin",
    user: "a0207",
    password: "pwd0207",
    database: "a0207"},
)

connection.connect((error) => {
  if (error) console.log(error);
  else console.log('Connected to the remote database!');
});

// connection.on('error', function(err) {
//     console.log("[mysql error]",err);
// });

module.exports = {
    connection
}
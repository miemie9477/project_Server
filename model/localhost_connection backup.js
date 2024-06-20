
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:"eu-cluster-west-01.k8s.cleardb.net",
    // path :"/phpmyadmin",
    user: "bad8eb8b61aee3",
    password: "10ea15d7",
    database: "heroku_3387a94419c088b"},
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
const mysql = require("mysql");
//create connection to the db
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Makeitea$y8",
    database: "burgers_db"
})
//connecting
connection.connect(function(err){
    if(err) throw err
    console.log("connected as i" + connection.threadId)
})

module.exports = connection
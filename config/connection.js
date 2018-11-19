//Sets up MySQL connection
const mysql = require("mysql");
require("dotenv").config({path: "../.env"});
let connection;

//Database is JawsDB on Heroku
if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
//Database is local
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "burgers_db"
    });
}

//Makes connection to database
connection.connect(function(err) {
    if (err) {
        console.log("error connecting" + err.stack);
        return;
    }
    console.log("Connected as ID " + connection.threadId);
});

//Exports connection
module.exports = connection;
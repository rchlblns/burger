//Sets up MySQL connection
const mysql = require("mysql");
const connection

if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        database: "burgers_db",
        user: "root",
        password: "root"
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
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "burgers_db",
    user: "root",
    password: "root"
});

connection.connect(function(err){
    if (err) {
        console.log("error connecting" + err.stack);
        return;
    }

    console.log("Connected as ID " + connection.threadId);
});

module.exports(connection);
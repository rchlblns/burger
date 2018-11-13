const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    database: "burgers_db",
    user: "root",
    password: "root"
});

connection.connect(function(err){
    if (err) throw err;

    console.log("Connected as ID " + connection.threadId);
});

module.exports(connection);
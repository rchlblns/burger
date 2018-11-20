//Imports MySQL connection
const connection = require("../config/connection.js");

//Function to print question marks
function printQuestionMarks(num) {
    let arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
}

//Function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    let arr = [];

    for (let key in ob) {
      let value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }

    return arr.toString();
}

//All of our SQL statement functions in one object
const orm = {
    selectAll: function(tableInput, cb){
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result){
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result){
            if (err){
                throw err;
            }

            cb(result);
        });
    },
    //E.g. objColVals = {burger_name: Crusty Burger, devoured: false}
    updateOne: function(table, objColVals, condition, cb){
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += obToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err){
                throw err;
            }

            cb(result);
        });
    },

    deleteOne: function(table, condition, cb){
        let queryString = "DELETE FROM " + table;

        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err,result){
            
            if (err){
                throw err;
            }

            cb(result);
        });
    }
};

//Exports the orm object
module.exports = orm;

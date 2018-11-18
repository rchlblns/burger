//Imports MySQL connection
const connection = require("../config/connection.js");


function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
}

function objToSql(ob) {
    var arr = [];
  
    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }

        arr.push(key + "=" + value);

      }
    }

    return arr.toString();
}

const orm = {
    
    selectAll: function(tableInput, cb){
        const queryString = "SELECT * FROM" + tableInput + ";";

        connection.query(queryString, function(err, result){

            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    insertOne: function(table, cols, vals, cb) {

        const queryString = "INSERT INTO " + table;

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

    updateOne: function(table, objColVals, condition, cb){

        const queryString = "UPDATE " + table;

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

        const queryString = "DELETE FROM " + table;

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

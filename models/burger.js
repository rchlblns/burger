const orm = require("../config/orm.js");

const burger = {

    selectAll: function(cb) {
        orm.selectAll("burgers", function(res){
            cb(res);
        });
    },

    insertOne: function(cols,vals,cb){
        orm.insertOne("burgers", cols, vals, function(res){
            cb(res);
        });
    },

    updateOne: function(objColVals, condition, cb){
        orm.updateOne("burgers", objColVals, condition, function(res){
            cb(res);
        });
    },

    deleteOne: function(table, condition, cb){
        orm.deleteOne("burgers", table, condition, function(res){
            cb(res);
        });
    }
};

//Exports the burger model
module.exports = burger;
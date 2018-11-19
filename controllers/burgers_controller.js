const express = require("express");

const router = express.Router();

//Imports the burgers model
const burger = require("../models/burger.js");


router.get("/", function(req,res){
    burger.all(function(data){
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req,res){
    burger.insert([
        "burger_name"
    ], [
        req.body.burger_name, req.body.devoured
    ], function() {
        res.json({
            id: result.insertId
        });
    });
});

router.put("/api/burgers/:id", function(req,res){
    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result){
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req,res){
    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.delete(condition, function(result){
        if (result.affectedRows === 0) {

            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//Exports router for server.js to use
module.exports = router;
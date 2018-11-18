const express = require("express");

const router = express.Router();

//Imports the burgers model
const burger = require("../models/burger.js");


router.get("/", function(req,res){
    burger.selectAll(function(data){
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/", function(req,res){
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function() {
        res.redirect("/");
    });
});

router.put("/:id", function(req,res){
    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result){
        if (result.changedRows === 0) {
            return res.status(404).end();
        }else{
            res.status(200).end();
        }
    });
});

router.delete("/:id", function(req,res){
    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.deleteOne(condition, function(result){
        if (result.affectedRows === 0) {

            return res.status(404).end();
        }else{
            res.status(200).end();
        }
    });
});

//Exports router for server.js to use
module.exports = router;
const express = require("express");

const router = express.Router();

//Imports the burgers model
const burger = require("../models/burger.js");

//Renders all burgers to the DOM
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

//POST request adds burger to the database
router.post("/api/burgers", function (req, res) {
    burger.insertOne([
        "burger_name"
    ], [
            req.body.burger_name
    ], function (result) {
            res.json({ id: result.insertId });
    });
});

//PUT request updates burger from "not devoured" to "devoured"
router.put("/api/burgers:id", function (req, res) {
    let condition = "id = " + req.params.id;

    console.log("Burger status changed for", condition);

    burger.updateOne({
        devoured: 1
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers:id", function (req, res) {
    let condition = "id = " + req.params.id;

    console.log("Burger deleted", condition);

    burger.deleteOne(condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//Exports router for server.js to use
module.exports = router;
const express = require("express");

const router = express.Router();

//imports the burgers.js model
const burger = require("../models/burger.js");


router.get("/", function(req,res){
    burger.all(function (data){
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

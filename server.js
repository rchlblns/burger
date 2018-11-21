const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

//Serve static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Sets up handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Imports routes and gives server access to them
const router = require("./controllers/burgers_controller");

app.use(router);

const methodOverride = require("method-override");

app.use(methodOverride("_method"));

// Port information
const PORT = process.env.PORT || 8000;
//Starts server and listens to client requests
app.listen(PORT, function(){
    console.log("Server running on http://localhost:" + PORT);
});

module.exports = dotenv;
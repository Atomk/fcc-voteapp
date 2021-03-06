"use strict";

const express = require("express");
const routes = require("./app/routes/index.js");
const mongo = require("mongodb").MongoClient;

const app = express();

//app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.static("public"));
// Every client request for "/controllers" will be forwarded to the server folder "/app/controllers"
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

let mongoUrl = "mongodb://localhost:27017";
mongo.connect(mongoUrl, (err, client) => {
    if(err) {
        // Throw a custom error message
        throw new Error("Connection to the database failed :(");
    } else {
        console.log("Connection with MongoDB successful, on port 27017");
    }
    
    let db = client.db("voteapp");
    routes(app, db);
});

let port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server listening on port " + port);
});
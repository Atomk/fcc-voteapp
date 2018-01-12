"use strict";

const express = require("express");
const routes = require("./app/routes/index.js");
const mongo = require("mongodb").MongoClient;

const app = express();

//app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.static("public"));

routes(app);

let mongoUrl = "mongodb://localhost:27017";
mongo.connect(mongoUrl, (err, client) => {
    if(err) {
        throw new Error("Connection to the database failed.");
    } else {
        console.log("Connection with MongoDB successful, on port 27017");
    }
    
    let db = client.db("voteapp");
    //console.log("Database:", db);
    client.close();
});

let port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server listening on port " + port);
});
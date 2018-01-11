"use strict";

const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (request, response) => {
   response.sendFile(__dirname + "/views/index.html"); 
});

let port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server listening on port " + port);
});
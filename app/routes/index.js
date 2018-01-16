"use strict";

//console.log("This file's location: " + __dirname);
let ClickHandler = require(process.cwd() + "/app/controllers/clickHandler.server.js");

// Make the function available to other Node files
module.exports = function(app, db) {
  // Create a new clickHandler object.
  var clickHandler = new ClickHandler(db);

  // This is an alternative to app.get, and lets us bundle together several types of routes for a single page request.
  app.route("/")
    .get((request, response) => {
       response.sendFile(process.cwd() + "/public/index.html");
    });
    
  app.route("/api/clicks")
    // When the server receives a GET request for this route, it will execute the getClicks function 
    .get(clickHandler.getClicks)
    .post(clickHandler.addClick)
    .delete(clickHandler.resetClicks);
};
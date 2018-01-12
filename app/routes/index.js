"use strict";

//console.log("This file's location: " + __dirname);

// Make the function available to other Node files
module.exports = function(app) {
  // This is an alternative to app.get, and lets us bundle together several types of routes for a single page request.
  app.route("/")
    .get((request, response) => {
       response.sendFile(process.cwd() + "/public/index.html");
    });
};
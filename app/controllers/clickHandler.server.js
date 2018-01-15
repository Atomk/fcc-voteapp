"use strict";

const clickHandler = function(db) {
    // Create and/or retrieve a collection from MongoDB
    let clicksCollection = db.collection("clicks");
    
    this.getClicks = function(request, response) {
        // Allows to exclude the "_id" field from the results (including/excluding fields is called projection)
        let clickProjection = { projection: { "_id": false } };
        
        clicksCollection.findOne({}, clickProjection, (err, doc) => {
            if(err) {
                // Interrupt the application and throw an error message.
                throw err;
            }
            
            // If the collection is not empty (doc is null), send the document found. If not, insert a document and repeat.
            if(doc) {
                response.json(doc);
            } else {
                clicksCollection.insertOne({"clicks": 0}, (err, result) => {
                    if(err) { throw err; }
                    
                    // Alternatively I could return result.ops[0], after removing the "_id" field
                    clicksCollection.findOne({}, clickProjection, function (err, doc) {
                        if (err) { throw err; }
        
                        response.json(doc);
                    });
                });
            }
        });
    };
};

module.exports = clickHandler;
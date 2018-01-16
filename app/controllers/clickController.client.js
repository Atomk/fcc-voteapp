"use strict";

// IIFE: Immediately invoked function expression (self-executing anonymous function)
/* An IIFE is going to bind all the variables within to the local scope of that function.
This means that any variables declared within this function will not conflict with
other variables within the application that may share the same name or need to be re-used. */

(function() {
    let addButton = document.getElementById("btn-click");
    let deleteButton = document.getElementById("btn-reset");
    let clickNumber = document.getElementById("numclicks");
    let apiUrl = "https://fcc-voteapp-atomk.c9users.io/api/clicks";
    
    const ready = function(fn) {
        // Allow only a function as an argument
        if(typeof fn !== "function") {
            return; // Don't take any action
        }
        
        // If the document has loaded completely
        if (document.readyState === "complete") {
            return fn();
        }
        
        // If the document hasn't loaded completely yet
        document.addEventListener("DOMContentLoaded", fn, false);
    };
    
    const ajaxRequest = function(method, url, callback) {
        let xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = () => {
            if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                callback(xmlhttp.response);
            }
        };
        
        xmlhttp.open(method, url, true);
        xmlhttp.send();
    };
    
    // Update the number of clicks displayed in the HTML with the value retrieved from the server
    const updateClickCount = function(data) {
        try {
            let clicksObj = JSON.parse(data);
            clickNumber.textContent = clicksObj.clicks;
        }
        catch(err) {
            console.error(err);
        }
    };
    
    ready(ajaxRequest("GET", apiUrl, updateClickCount));
    
    addButton.addEventListener("click", () => {
        ajaxRequest("POST", apiUrl, () => {
           ajaxRequest("GET", apiUrl, updateClickCount); 
        });
    }, false);
    
    deleteButton.addEventListener("click", () => {
        ajaxRequest("DELETE", apiUrl, () => {
            ajaxRequest("GET", apiUrl, updateClickCount); 
        });
    }, false);
})();
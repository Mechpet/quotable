"use strict";

function appendItem(event) {
    // Must prevent default event to have the change persist
    event.preventDefault();
    var li = document.createElement("li");
    li.innerHTML = "<li>" + $("input[name = quote]").val() + "</li>";

    var ul = document.getElementsByTagName("ul")[0];
    ul.appendChild(li.firstChild);
    // Attach click event back to all list items
    $("li").on("click", removeItem);
}

/* Asynchonous method to get setting and set setting using closure from the caller getSaved() */
function getKeyValue(keyName, callback, ...args) {
    chrome.storage.sync.get(keyName, function(keyObj) {
        // Spread arguments (split back to ...args of callback)
        return callback(keyObj, ...args);
    });
}

function removeItem(event) {
    // Remove a list item (this) from the unordered list
    var ul = document.getElementsByTagName("ul")[0];
    ul.removeChild(this);
}

function setIfEmpty(keyObj, ...args) {
    // args[0] : key
    // args[1] : value
    // Initializes a key-value pair if it does not exist in Chrome storage
    if (Object.keys(keyObj).length === 0) {
        setKeyValue(args[0], args[1]);
    }
}

function setKeyValue(keyName, value) {
    // Set a keyobject in Chrome storage
    let keyObj;
    keyObj = {};
    keyObj[keyName] = value;
    chrome.storage.sync.set(keyObj, function() {
        console.log("Saved setting: ", keyObj);
    });
}

function rmvKeyValue(keyName) {
    // Remove a keyobject from Chrome storage (all attempts to get it will return `undefined`)
    chrome.storage.sync.remove(keyName, function() {
        console.log("Removed setting w/ key name: ", keyName);
    });
}

// Run-time function
$(function() {
    // Initialize number of quotes to 0 if the setting does not exist
    getKeyValue("number", setIfEmpty, "number", 0);
    getKeyValue("keys", setIfEmpty, "keys", []);

    // Attach event functions to the initial elements
    $("button").click(appendItem);
    $("li").click(removeItem);
    
})
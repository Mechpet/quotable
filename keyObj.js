"use strict";

/* Asynchonous method to get keyobject and set it using closure from the caller */
function getKeyValue(keyName, callback, ...args) {
    chrome.storage.sync.get(keyName, function(keyObj) {
        // Spread arguments (split back to ...args of callback)
        callback(keyObj, ...args);
    });
}


/* Initializes a keyobject if it does not exist in Chrome storage */
function setIfEmpty(keyObj, ...args) {
    // args[0] : key name
    // args[1] : value
    console.log("[sie]key obj = ", keyObj);
    if (Object.keys(keyObj).length === 0) {
        console.log("0");
        setKeyValue(args[0], args[1]);
    }
}

/* Appends a value to the keyobject (value is an array) */
function pushVal(keyObj, ...args) {
    // args[0] : new value to push
    var valueArray = Object.values(keyObj)[0];
    valueArray.push(args[0]);
    setKeyValue(Object.keys(keyObj)[0], valueArray);
}

/* Asynchronous method to set a keyobject in Chrome storage */
function setKeyValue(keyName, value) {
    let keyObj;
    keyObj = {};
    keyObj[keyName] = value;
    chrome.storage.sync.set(keyObj, function() {
        console.log("Saved setting: ", keyObj);
    });
}

/* Asynchronous method to remove a keyobject from Chrome storage (all consequent attempts to get it will return `undefined`) */
function rmvKeyValue(keyName) {
    chrome.storage.sync.remove(keyName, function() {
        console.log("Removed setting w/ key name: ", keyName);
    });
}

/* Updates a keyobject's value by displacing it */
function displaceValue(keyObj, ...args) {
    // args[0] : displacement
    console.log("Old value = ", Object.values(keyObj)[0]);
    var newValue = Object.values(keyObj)[0] + args[0];
    console.log("New value = ", newValue);
    setKeyValue(Object.keys(keyObj)[0], newValue);
}

/* Deletes a specific value from a keyobject (expected value to be array-type) */
function delValue(keyObj, ...args) {
    // args[0] : value to delete
    const valueArray = Object.values(keyObj)[0];
    const index = valueArray.indexOf(args[0]);

    console.log("Old array = ", valueArray);

    if (index > -1) {
        valueArray.splice(index, 1);
    }

    console.log("New array = ", valueArray);

    setKeyValue(Object.keys(keyObj)[0], valueArray);
}

/* Asynchronous method to delete all keyobjects from Chrome storage */
function reset() {
    if (confirm("Are you sure you want to reset all data?") == true) {
        chrome.storage.sync.clear(function() {
            console.log("Cleared all keys.");
        })
    }
}
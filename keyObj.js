"use strict";

function appendItem(keyObj) {
    // Must prevent default event to have the change persist
    var li = constructListItem(Object.keys(keyObj)[0], Object.values(keyObj)[0].quote);

    var ul = document.getElementsByTagName("ul")[0];
    ul.appendChild(li.firstChild);
    // Attach click event back to all list items
    $("li").on("click", removeItem);
}

/* Asynchonous method to get setting and set setting using closure from the caller getSaved() */
function getKeyValue(keyName, callback, ...args) {
    chrome.storage.sync.get(keyName, function(keyObj) {
        // Spread arguments (split back to ...args of callback)
        callback(keyObj, ...args);
    });
}

function setIfEmpty(keyObj, ...args) {
    // args[0] : key
    // args[1] : value
    // Initializes a key-value pair if it does not exist in Chrome storage
    if (Object.keys(keyObj).length === 0) {
        setKeyValue(args[0], args[1]);
    }
}

function pushVal(keyObj, ...args) {
    // args[0] : new value to push
    // Appends a value to the key-value pair (value is an array)
    var valueArray = Object.values(keyObj)[0];
    valueArray.push(args[0]);
    setKeyValue(Object.keys(keyObj)[0], valueArray);
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

function displaceValue(keyObj, ...args) {
    // args[0] : displacement
    console.log("Old value = ", Object.values(keyObj)[0]);
    var newValue = Object.values(keyObj)[0] + args[0];
    console.log("New value = ", newValue);
    setKeyValue(Object.keys(keyObj)[0], newValue);
}

function delValue(keyObj, ...args) {
    // keyObj value : array type
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

function reset() {
    chrome.storage.sync.clear(function() {
        console.log("Cleared all keys.");
    })
}
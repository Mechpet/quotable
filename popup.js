"use strict";

const KEY_LEN = 32;
const ALPHA_NUM = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function appendNewItem(event) {
    // Must prevent default event to have the change persist
    event.preventDefault();

    var li = createNewQuote($("input[name = quote").val(), $("input[name = author").val(), $("input[name = source").val());

    var ul = document.getElementsByTagName("ul")[0];
    ul.appendChild(li.firstChild);
    // Attach click event back to all list items
    $("li").on("click", removeItem);
}

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

function pushVal(keyObj, ...args) {
    // args[0] : new value to push
    // Appends a value to the key-value pair (value is an array)
    var valueArray = Object.values(keyObj)[0];
    valueArray.push(args[0]);
    setKeyValue(Object.keys(keyObj)[0], valueArray);
}

function createNewQuote(quote, author, source) {
    // Generate a unique keyname
    var key = randomString(KEY_LEN, ALPHA_NUM);
    while (document.getElementById(key)) {
        key = randomString(KEY_LEN, ALPHA_NUM);
    }

    var quoteData = {};
    quoteData.quote = quote;
    quoteData.author = author;
    quoteData.source = source;

    getKeyValue("keys", pushVal, key);
    setKeyValue(key, quoteData);
    return constructListItem(key, quote);
}

function constructListItem(key, quote) {
    var li = document.createElement("li");
    li.innerHTML = "<li id = " + key + ">" + quote + "</li>";

    return li;
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

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function loadQuotes(keyObj, ...args) {
    // Expects key "keys" in keyObj
    for (const key of Object.values(keyObj)[0]) {
        getKeyValue(key, appendItem);
    }
}

function reset() {
    chrome.storage.sync.clear(function() {
        console.log("Cleared all keys.");
    })
}

// Run-time function
$(function() {
    // Initialize number of quotes to 0 if the setting does not exist
    getKeyValue("number", setIfEmpty, "number", 0);
    getKeyValue("keys", setIfEmpty, "keys", []);    
    getKeyValue("keys", loadQuotes);

    // Attach event functions to the initial elements
    $("button").click(appendNewItem);
    $("li").click(removeItem);
})
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

function removeItem(event) {
    // Remove a list item (this) from the unordered list
    var ul = document.getElementsByTagName("ul")[0];
    getKeyValue("keys", delValue, this.id);
    ul.removeChild(this);

    getKeyValue("number", displaceValue, -1);
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
    getKeyValue("number", displaceValue, 1);
    return constructListItem(key, quote);
}

function constructListItem(key, quote) {
    var li = document.createElement("li");
    li.innerHTML = "<li id = " + key + ">" + quote + "</li>";
    
    return li;
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function loadQuotes(keyObj, ...args) {
    // Expects key "keys" in keyObj
    if (Object.values(keyObj)[0]) {
        for (const key of Object.values(keyObj)[0]) {
            getKeyValue(key, appendItem);
        }
    }
}

// Run-time function
$(function() {
    // Initialize number of quotes to 0 if the setting does not exist
    getKeyValue("number", setIfEmpty, "number", 0);
    getKeyValue("keys", setIfEmpty, "keys", []);    
    getKeyValue("keys", loadQuotes);

    // Attach event functions to the initial elements
    $("#adder").click(appendNewItem);
    $("#reseter").click(reset);
    $("li").click(removeItem);
})
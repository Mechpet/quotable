"use strict";

const KEY_LEN = 32;
const ALPHA_NUM = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/* Appends a new list item (based on inputs) to the unordered list based on inputs & updates settings accordingly */
function appendNewItem(event) {
    // Must prevent default event to have the change persist
    event.preventDefault();

    var li = createNewQuote($("input[name = quote").val(), $("input[name = author").val(), $("input[name = source").val());

    if (!li) {
        return;
    }

    var ul = document.getElementsByTagName("ul")[0];
    ul.appendChild(li.firstChild);
    // Attach click event back to all list items
    getKeyValue("locked", updateLi);
}

/* Appends a list item (based on keyobject) to the unordered list */
function appendItem(keyObj) {
    // Must prevent default event to have the change persist
    var li = constructListItem(Object.keys(keyObj)[0], Object.values(keyObj)[0].quote);

    var ul = document.getElementsByTagName("ul")[0];
    ul.appendChild(li.firstChild);
}

/* Removes this list item permanently from the unordered list */
function removeItem(event) {
    var ul = document.getElementsByTagName("ul")[0];
    getKeyValue("keys", delValue, this.id);
    ul.removeChild(this);

    getKeyValue("number", displaceValue, -1);
}

/* Create a new quote object in Chrome storage - returns the linked list item */
function createNewQuote(quote, author, source) {
    if (!quote) {
        return null;
    }
    // Generate a unique keyname
    var key = randomString(KEY_LEN, ALPHA_NUM);
    while (document.getElementById(key)) {
        key = randomString(KEY_LEN, ALPHA_NUM);
    }

    // Construct a quote object
    var quoteData = {};
    quoteData.quote = quote;
    quoteData.author = author;
    quoteData.source = source;

    // Update settings
    getKeyValue("keys", pushVal, key);
    setKeyValue(key, quoteData);
    getKeyValue("number", displaceValue, 1);
    return constructListItem(key, quote);
}

/* Returns a list item linked to a quote object */
function constructListItem(key, quote) {
    var li = document.createElement("li");
    li.innerHTML = `<li id = ${key}>${quote}</li>`;
    
    return li;
}

/* Returns a random string based on arguments */
function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

/* Initialize the unordered list with list items persisting in Chrome storage */
function loadQuotes(keyObj, ...args) {
    // Expects key "keys" in keyobject
    if (Object.values(keyObj)[0]) {
        for (const key of Object.values(keyObj)[0]) {
            getKeyValue(key, appendItem);
        }
    }
}

/* Sets the source of the image element based on whether the quote table is locked or not */
function setLock(keyObj, ...args) {
    if (Object.values(keyObj)[0]) {
        $("img").attr("src", "locked.png");

        $("#reseter").prop("disabled", "true");
        $("#reseter").off("click");
        $("li").off("click");
    }
    else {
        $("img").attr("src", "unlocked.png");

        $("#reseter").on("click", reset);
        $("li").on("click", removeItem);
    }
}

function updateLock() {
    getKeyValue("locked", invertLock);
}

/* Sets the new value to not value */
function invertLock(keyObj, ...args) {
    // args : none
    var newValue = !Object.values(keyObj)[0];
    setKeyValue(Object.keys(keyObj)[0], newValue);
    getKeyValue("locked", setLock);
}

function updateLi(keyObj, ...args) {
    if (Object.values(keyObj)[0]) {
        $("li")[-1].off("click");
    }
    else {
        $("li")[-1].on("click", removeItem);
    }
}

// Run-time function
$(function() {
    // Initialize number of quotes to 0 if the setting does not exist
    getKeyValue("number", setIfEmpty, "number", 0);
    getKeyValue("keys", setIfEmpty, "keys", []); 
    getKeyValue("locked", setIfEmpty, "locked", false);

    // Initialize the appearance
    getKeyValue("keys", loadQuotes);
    getKeyValue("locked", updateLi);
    getKeyValue("locked", setLock);
    $("div#theme-select").load("./themes.html", readyThemes);

    // Attach event functions to the initial elements
    $("#adder").on("click", appendNewItem);
    $("img").on("click", updateLock);
})
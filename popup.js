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

    // Add item to storage
}

/* Asynchonous method to get setting and set setting using closure from the caller getSaved() */
function getKeyValue(keyName, callback, element) {
    chrome.storage.sync.get(keyName, function(keyObj) {
        callback(keyObj, element);
    });
}

function removeItem(event) {
    var ul = document.getElementsByTagName("ul")[0];
    ul.removeChild(this);
}

function checkValue(keyObj, element) {
    if (Object.keys(keyObj).length === 0)
        console.log("True");
    else
        console.log("False");
}

function setKeyValue(keyName, value) {
    let keyObj;
    keyObj = {};
    keyObj[keyName] = value;
    chrome.storage.sync.set(keyObj, function() {
        console.log("Saved setting: ", keyObj);
    });
}

// Run-time function
$(function() {
    // Attach event functions to the initial elements
    $("button").click(appendItem);
    $("li").click(removeItem);
    setKeyValue("number", "0");
    getKeyValue("number", checkValue);
})
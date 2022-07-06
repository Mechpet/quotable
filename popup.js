"use strict";

function appendItem(event) {
    // Must prevent default event to have the change persist
    event.preventDefault();
    var li = document.createElement("li");
    li.innerHTML = "<li>" + $("input[name = quote]").val() + "</li>"

    var ul = document.getElementsByTagName("ul")[0];
    ul.appendChild(li.firstChild);
    // Attach click event back to all list items
    $("li").on("click", removeItem)
}

function removeItem(event) {
    var ul = document.getElementsByTagName("ul")[0];
    ul.removeChild(this)
}

// Run-time function
$(function() {
    $("button").click(appendItem)

    $("li").click(removeItem)

    var fs = require('fs');
    var SQL = require('sql.js');
    var filebuffer = fs.readFileSync('test.sqlite');
    // Load the db
    var db = new SQL.Database(filebuffer);
})
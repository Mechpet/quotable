"use strict";

function appendItem() {
    $("ul").append("<li>Empty</li>");
}

// Run-time function
$(function() {
    $("button").click(appendItem)
})
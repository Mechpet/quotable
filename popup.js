"use strict";

function appendItem(event) {
    event.preventDefault();
    $("ul").append("<li>" + $("input[name = quote]").val() + "</li>");
}

function removeItem(event) {
    //event.preventDefault();
    $(this).parent().remove()
}

// Run-time function
$(function() {
    $("button").click(appendItem)

    $("li").click(removeItem)
})
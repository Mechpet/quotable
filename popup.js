"use strict";

function appendItem(event) {
    event.preventDefault();
    var li = document.createElement("li");
    li.innerHTML = "<li>" + $("input[name = quote]").val() + "</li>"


    var ul = document.getElementsByTagName("ul")[0];
    ul.appendChild(li.firstChild);
    $("li").on("click", removeItem)
}

function removeItem(event) {
    //event.preventDefault();
    console.log("RMV")
    var ul = document.getElementsByTagName("ul")[0];
    ul.removeChild(this)
}

// Run-time function
$(function() {
    $("button").click(appendItem)

    $("li").click(removeItem)
})
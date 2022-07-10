"use strict";

function randomizeNumber(keyObj, ...args) {
    // keyObj values = number of quotes
    // args : empty
    console.log("Object = ", keyObj);
    var index = Math.floor(Math.random() * Object.values(keyObj)[0]);
    console.log("Index = ", index);
    getKeyValue("keys", selectQuote, index);
}

function selectQuote(keyObj, ...args) {
    // keyObj : keys
    // args[0] : index
    console.log("keyoBJ OF SELECTQUOTE = ", keyObj);
    var key = Object.values(keyObj)[0][args[0]];
    console.log("key = ", key);
    if (key) {
        getKeyValue(key, setQuote);
    }
}

function setQuote(keyObj, ...args) {
    var quoteObj = Object.values(keyObj)[0];
    console.log("quoteObj = ", quoteObj);
    $("title").html(quoteObj.quote);
    $("q").html(quoteObj.quote)
    getKeyValue("theme", setTheme);
    $("p").html(citation(quoteObj.author, quoteObj.source));
}

function citation(author, source) {
    if (author && source) {
        return `- ${author}, <i>${source}</i>`;
    }
    else {
        return "";
    }
}

function setTheme(keyObj, ...args) {
    console.log("Theme = ", Object.values(keyObj)[0]);
    switch (Object.values(keyObj)[0]) {
        case "shadow":
            console.log("Yup");
            $("q").css("color", "white");
            $("p").css("color", "gray");
            $("html").css("background-color", "black");
            break;
        case "enlighten":
            $("q").css("color", "lemonchiffon");
            $("p").css("color", "cornsilk");
            $("html").css("background-color", "navajowhite");
            break;
        default:
            console.log("hi");
            $("q").css("color", "black");
            $("p").css("color", "black");
            $("html").css("background-color", "white");
            break;
    }
}

$(function() {
    getKeyValue("number", randomizeNumber);
})
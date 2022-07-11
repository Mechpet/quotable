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
    var citationArr = citation(quoteObj.author, quoteObj.source);
    $("p").html(citationArr[0]);
    $("i").html(citationArr[1]);
    getKeyValue("theme", setTheme);
}

function citation(author, source) {
    var retArr = [];
    if (author) {
        retArr.push(`- ${author},`);
    }
    else {
        retArr.push("");
    }

    if (source) {
        retArr.push(`${source}`);
    }
    else {
        retArr.push("");
    }

    return retArr;
}

function setTheme(keyObj, ...args) {
    console.log("Theme = ", Object.values(keyObj)[0]);
    switch (Object.values(keyObj)[0]) {
        case "shadow":
            $("q").css("color", "white");
            $("p").css("color", "gray");
            $("i").css("color", "gray");
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
    $("*").css("transition", "all 0.5s");
}

$(function() {
    getKeyValue("number", randomizeNumber);
})
"use strict";

function randomizeNumber(keyObj, ...args) {
    // keyObj values = number of quotes
    // args : empty
    var index = Math.floor(Math.random() * Object.values(keyObj)[0]);
    getKeyValue("keys", selectQuote, index);
}

function selectQuote(keyObj, ...args) {
    // keyObj : keys
    // args[0] : index
    var key = Object.values(keyObj)[0][args[0]];
    if (key) {
        getKeyValue(key, setQuote);
    }
}

function setQuote(keyObj, ...args) {
    var quoteObj = Object.values(keyObj)[0];
    $("title").html(quoteObj.quote);
    $("q").html(quoteObj.quote)
    var citationArr = citation(quoteObj.author, quoteObj.source);
    $("p").html(citationArr[0]);
    $("i").html(citationArr[1]);
    getKeyValue("theme", loadTheme);
}

function citation(author, source) {
    var retArr = [];
    if (author) {
        retArr.push(`&#8212; ${author},`);
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

function loadTheme(keyObj, ...args) {
    // Random theme:
    if (Object.values(keyObj)[0]["val"] == "random") {
        $("div").load("./themes.html", randomizeTheme);
    }
    // Selected theme:
    else {
        getKeyValue(Object.keys(keyObj)[0], htmlStylize);
    }
}

function htmlStylize(keyObj, ...args) {
    // args[0] = data-style if forced style change
    var dataStyle;
    if (args[0]) {
        dataStyle = args[0];
    }
    else if (!keyObj) {
        console.log("Something failed with stylizing the quote tab.");
    }
    else {
        dataStyle = Object.values(keyObj)[0]["style"];
    }
    var string1 = dataStyle.replace(/ /g, "\"");
    var string2 = string1.replace(/;/g, ",");
    var jsonString = `{${string2}}`;
    var themeObj = JSON.parse(jsonString);
    
    $("q").css("color", themeObj["color"]);
    $("html").css("background-color", themeObj["background-color"]);
    $("p, i").css("color", themeObj["text-decoration-color"]);
    $("*").css("transition", "all 0.5s");
}

function randomizeTheme() {
    var themes = $("option");
    // Index range : [1, last theme] because 0th theme is random
    var index = Math.floor(Math.random() * (themes.length - 1)) + 1;
    var randomTheme = themes[index];
    var randomDataStyle = randomTheme.getAttribute("data-style");
    htmlStylize(null, randomDataStyle);
}

$(function() {
    // On new tab load, randomize the displayed quote (takes from the saved quote table)
    getKeyValue("number", randomizeNumber);
})
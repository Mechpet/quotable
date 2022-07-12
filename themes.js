"use strict";

function defaultTheme() {
    var themeObj = {};
    themeObj["val"] = "default";
    themeObj["style"] = $("option[value = default").attr("data-style");
    return themeObj;
}

function setTheme() {
    var newTheme = this.value;
    var themeObj = {};
    themeObj["val"] = newTheme;
    themeObj["style"] = $(`option[value = ${newTheme}`).attr("data-style");
    console.log(`Set theme of ${newTheme} object to `, themeObj);
    setKeyValue("theme", themeObj);
}

function loadOption(keyObj, ...args) {
    // Set the selected theme (trigger select2 events only)
    var themeObj = Object.values(keyObj)[0];
    console.log("Theme object = ", themeObj);
    $("#theme").val(themeObj["val"]).trigger("change.select2");
}

function formatState(state) {
    if (!state.id) {
        return state.text;
    }

    return $(
        `<div style = "${$(state.element).data("style")}">${state.text}</div>`
    );
}

function readyThemes() {
    getKeyValue("theme", setIfEmpty, "theme", defaultTheme()); 
    $("select").select2({
        dropdownParent: $("form")[0],
        templateResult: formatState
    });
    $("select").each(function() {
        console.log("There is a select element");
    });
    getKeyValue("theme", loadOption);
    $("select").change(setTheme);
}

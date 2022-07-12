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

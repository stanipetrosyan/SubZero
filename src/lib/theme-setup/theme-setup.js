module.exports = {
    setTheme(current_theme) {
        var html = document.getElementsByTagName('html')[0];
        if(current_theme['name'] == 'default') { 
            setDarkTheme(html);
        } else {
            setLightTheme(html);
        }
    }
}

function setDarkTheme(obj) {  
    obj.style.setProperty("--main-background-color", "#1e1e1e");
    obj.style.setProperty("--main-secondary-background-color", "#131313");
    obj.style.setProperty("--main-text-color", "white");
    obj.style.setProperty("--main-color-hover-group", "#222222");
    obj.style.setProperty("--main-secondary-text-color", "#d7dbdd")
}

function setLightTheme(obj) {
    obj.style.setProperty("--main-background-color", "white");
    obj.style.setProperty("--main-secondary-background-color", "white");
    obj.style.setProperty("--main-text-color", " #424242");  
    obj.style.setProperty("--main-color-hover-group", "#eceff1");  
    obj.style.setProperty("--main-secondary-text-color", "#616a6b")

}
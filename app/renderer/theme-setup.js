function setTheme(current_theme) {
    if(current_theme['name'] == 'default') { 
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
    }
}
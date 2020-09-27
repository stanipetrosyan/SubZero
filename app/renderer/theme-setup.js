function setTheme(currentTheme) {
  if (currentTheme['name'] === 'default') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

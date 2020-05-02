setTheme(window.request.theme());

document.getElementById('light-theme').addEventListener('click', _ =>{
    window.user.updatetheme('light')
})

document.getElementById('default-theme').addEventListener('click', _ =>{
    window.user.updatetheme('default')
})

document.getElementById('cancel').addEventListener('click', _ =>{
    window.modals.close();
})
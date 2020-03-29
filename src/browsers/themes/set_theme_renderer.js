setTheme(window.api.themerequest());

document.getElementById('light-theme').addEventListener('click', _ =>{
    window.api.updatetheme('light')
})

document.getElementById('default-theme').addEventListener('click', _ =>{
    window.api.updatetheme('default')
})

document.getElementById('cancel').addEventListener('click', _ =>{
    window.api.closeModal();
})
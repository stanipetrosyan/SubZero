const { ipcRenderer } = require('electron');

document.getElementById('light-theme').addEventListener('click', _ =>{
    ipcRenderer.send('update-theme', {name: 'light'});
})

document.getElementById('default-theme').addEventListener('click', _ =>{
    ipcRenderer.send('update-theme', {name: 'default'});
})

document.getElementById('cancel').addEventListener('click', _ =>{
    ipcRenderer.send('close-modal');
})
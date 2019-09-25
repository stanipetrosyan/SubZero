const { ipcRenderer } = require('electron');


document.getElementById('cancel').addEventListener('click', () =>{
    ipcRenderer.send('close-modal');
})
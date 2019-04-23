const { ipcRenderer } = require('electron');
const git = require('../../lib/git-cli');



const project = ipcRenderer.sendSync('data-request');



document.getElementById("cancel").addEventListener('click', _=>{
    ipcRenderer.send("close-modal");
})
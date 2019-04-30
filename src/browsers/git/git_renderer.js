const { ipcRenderer } = require('electron');
const git = require('../../lib/git-cli');



const project = ipcRenderer.sendSync('project-request');



let openDialog = document.getElementById('openDialog');
let dialogWindow = document.getElementById('dialogWindow');
//let submitBtn = document.getElementById('submit');

openDialog.addEventListener('click', _ => {
    dialogWindow.showModal();
})

git.getCommitList(project['path']).then(res => {
    console.log(res);
});

git.status(project['path']).then(res => {
    console.log(res);
})

document.getElementById("cancel").addEventListener('click', _=>{
    ipcRenderer.send("close-modal");
});
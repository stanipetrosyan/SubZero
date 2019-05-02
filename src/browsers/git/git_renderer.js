const { ipcRenderer } = require('electron');
const git = require('../../lib/git-cli');
const {createDialog} = require('../../lib/dialog')


const project = ipcRenderer.sendSync('project-request');
let USERNAME = null;
let PASSWORD = null;
let setUsername = true;


let openDialog = document.getElementById('openDialog');
let dialogWindow = createDialog('text', 'Username');
document.getElementById('dialog-position').appendChild(dialogWindow);
let submitBtn = document.getElementById('submit');
let inputValue = document.getElementById('val');

openDialog.addEventListener('click', _ => {
    inputValue.value = '';
    setUsername = true;
    dialogWindow.showModal();
})


submitBtn.addEventListener('click', _=>{
    if(setUsername == true){
        USERNAME = inputValue.value;
        setUsername = false;
        openDialog.click();
    }else{
        PASSWORD = inputValue.value;
    }
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
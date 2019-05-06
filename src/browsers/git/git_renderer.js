const { ipcRenderer } = require('electron');
const git = require('../../lib/git-cli');
const {createDialog} = require('../../lib/dialog')


const project = ipcRenderer.sendSync('project-request');
let USERNAME = null;
let PASSWORD = null;
let setUsername = true;
let submitBtn;
let inputValue;


let openDialog = document.getElementById('openDialog');
let dialogWindow;

openDialog.addEventListener('click', _ => {
    if(setUsername == true){
        dialogWindow = createDialog('text', 'Username');
    }else{
        dialogWindow = createDialog('password', 'Password'); 
    }

    // TODO: replace first username dialog with password dialog
    document.getElementById('dialog-position').append(dialogWindow);
    //document.getElementById('dialog-position').removeChild(dialogWindow);
    
    submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', _=>{
        setDialog();
    })
    dialogWindow.showModal();
})


function setDialog(){
    inputValue = document.getElementById('val');
    if(setUsername == true){
        USERNAME = inputValue.value;
        setUsername = false;
        openDialog.click();
    }else{
        PASSWORD = inputValue.value;
        setUsername = true;    
    }
}

git.getCommitList(project['path']).then(res => {
    console.log(res);
});

git.status(project['path']).then(res => {
    console.log(res);
})

document.getElementById("cancel").addEventListener('click', _=>{
    ipcRenderer.send("close-modal");
});
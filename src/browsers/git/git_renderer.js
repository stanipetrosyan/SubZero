const { ipcRenderer } = require('electron');
const git = require('../../lib/git-cli');
const {createDialog} = require('../../lib/dialog')
const {autocomplete} = require('../../lib/autoComplete');

const project = ipcRenderer.sendSync('project-request');

git.getAllBranches(project['path']).then(res => {
    let branches = res['all'];
    autocomplete(document.getElementById("branch-name"), branches);
})

let USERNAME = null;
let PASSWORD = null;
let COMMIT = null;
let submitBtn;
let inputValue;
let changeDialog = 1;

let openDialog = document.getElementById('openDialog');

openDialog.addEventListener('click', _ => {
    switch(changeDialog){
        case 1:
                replaceDialog('Username', 'text');
            break;
        case 2:
                replaceDialog('Password', 'password');
            break;
        case 3:
                replaceDialog('Commit', 'text');
            break;
    }
    submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', _=>{
        setDialog();
    })
    document.getElementById('dialog-req').showModal();
})

function setDialog(){
    inputValue = document.getElementById('val');
    switch(changeDialog){
        case 1:
                USERNAME = inputValue.value;
                changeDialog++;
                openDialog.click();
            break;
        case 2:
                PASSWORD = inputValue.value;
                changeDialog++;
                openDialog.click();
            break;
        case 3:
                COMMIT = inputValue.value;
                changeDialog = 1;
                pushCommit();
            break;
    }
}

function replaceDialog(label, type){
    var dialog = document.getElementById('dialog-req');
    if(!dialog){
        document.body.appendChild(createDialog(type, label));
        return;
    }
    dialog.parentNode.removeChild(dialog);
    document.body.appendChild(createDialog(type, label));
}

// TODO: check push with subzero and addconfig function
function pushCommit(){ 
   
    git.getRemoteRepoURL(project['path']).then(res => {
        let remote = `https://${USERNAME}:${PASSWORD}@${res}`;
        let options = ['-u', 'origin', 'master'];
        /*git.push(project['path'], COMMIT, remote, options).then(res => {
            console.log(res);
        })*/
        git.syncPush(project['path'], USERNAME, COMMIT, remote, options);
    })
}

document.getElementById("cancel").addEventListener('click', _=>{
    ipcRenderer.send("close-modal");
});
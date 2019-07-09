const { ipcRenderer } = require('electron');
const git = require('../../lib/git-cli');
const { createDialog } = require('../../lib/dialog')
const { autocomplete } = require('../../lib/autoComplete');
const userMessages = require('../../lib/message');

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

document.getElementById('push_btn').addEventListener('click', _ => {
    switchDialogForm(pushCommit);
})

document.getElementById('pull_btn').addEventListener('click', _ =>{
    pullRepo();
})

function switchDialogForm(callback){
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
        setDialog(callback);
    })
    document.getElementById('dialog-req').showModal();
}
function setDialog(callback){
    inputValue = document.getElementById('val');
    switch(changeDialog){
        case 1:
                USERNAME = inputValue.value;
                changeDialog++;
                switchDialogForm(callback);
            break;
        case 2:
                PASSWORD = inputValue.value;
                changeDialog++;
                switchDialogForm(callback);
            break;
        case 3:
                COMMIT = inputValue.value;
                changeDialog = 1;
                callback();
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

function pushCommit(){    
    git.getRemoteRepoURL(project['path']).then(URL => {
        let remote = `https://${USERNAME}:${PASSWORD}@${URL}`;
        let options = ['-u', 'origin', 'master'];
        git.setAuthRemote(project['path'], remote.replace('https://www.', ''));
        git.push(project['path'], COMMIT, remote, options).then(res => {
            git.setAuthRemote(project['path'], URL);
            userMessages.showInfoMessageBox();
        })
    })
}


function pullRepo(){
    git.pull(project['path'], 'master').then(res => {
        userMessages.showInfoMessageBox();
    })
}

document.getElementById("cancel").addEventListener('click', _=>{
    ipcRenderer.send("close-modal");
});
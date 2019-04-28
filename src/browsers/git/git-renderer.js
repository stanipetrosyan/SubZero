const { ipcRenderer } = require('electron');
const git = require('../../lib/git-cli');



const project = ipcRenderer.sendSync('project-request');
console.log(project);
git.getCommitList(project['path']).then(res => {
    console.log(res);
});

git.status(project['path']).then(res => {
    console.log(res);
});

document.getElementById("cancel").addEventListener('click', _=>{
    ipcRenderer.send("close-modal");
});
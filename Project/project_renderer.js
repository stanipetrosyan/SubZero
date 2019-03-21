const { ipcRenderer } = require('electron');
const { createGroupListWithSelect } = require('../Component/Initializer');


const groupList = document.getElementById('group-list');
const data = ipcRenderer.sendSync('data-request');

let project_folder = null;

createGroupListWithSelect(data, groupList);


function setProject(){
    return {
        name: document.getElementById('project-name').value,
        language: document.getElementById('project-type').value,
        group: document.getElementById('project-group').value, 
        path: project_folder,
        editor: document.getElementById('editors-list').value
    }
}

document.getElementById('cancel').addEventListener('click', () =>{
    ipcRenderer.send('close-modal');
})

document.getElementById('open').addEventListener('click', () =>{
    project_folder = ipcRenderer.sendSync('open-folder-dialog');
    document.getElementById('project-path').value = project_folder;
})

document.getElementById('add').addEventListener('click', () =>{
    let project = setProject();
    ipcRenderer.send('add-project', project);
})
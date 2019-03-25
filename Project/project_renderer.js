const { ipcRenderer } = require('electron');
const { createGroupListWithSelect } = require('../Component/Initializer');


const groupList = document.getElementById('group-list');
const data = ipcRenderer.sendSync('data-request');

let project_folder = null;
let projectToUpdate = null;

projectToUpdate = ipcRenderer.sendSync('project-request');

createGroupListWithSelect(data, groupList);

if(projectToUpdate){
    document.getElementById('add').innerText = 'UPDATE'
    setProject(projectToUpdate);
}

function getProject(){
    return {
        name: document.getElementById('project-name').value,
        language: document.getElementById('project-type').value,
        group: document.getElementById('project-group').value, 
        path: project_folder,
        editor: document.getElementById('editors-list').value
    }
}

function setProject(project){
    document.getElementById('project-name').value = project.name;
    document.getElementById('project-type').value = project.language;
    document.getElementById('project-group').value = project.group;
    document.getElementById('project-path').value = project.path;
    document.getElementById('editors-list').value = project.editor;
}

document.getElementById('cancel').addEventListener('click', () =>{
    ipcRenderer.send('close-modal');
})

document.getElementById('open').addEventListener('click', () =>{
    project_folder = ipcRenderer.sendSync('open-folder-dialog');
    document.getElementById('project-path').value = project_folder;
})

document.getElementById('add').addEventListener('click', () =>{
    let project = getProject();
    if(projectToUpdate){
        ipcRenderer.send('updated-project', project);
    }else{
        ipcRenderer.send('add-project', project);
    }
    
    
})
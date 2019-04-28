const { ipcRenderer } = require('electron');
const { createArrayGroupContainer, setOpacityRight } = require('../../lib/Initializer');
const { showErrorMessageBox } = require('../../lib/message');
const git  = require('../../lib/git-cli');


const groupList = document.getElementById('group-list');
const editors = document.getElementsByClassName('editor-icon');


const data = ipcRenderer.sendSync('data-request');

let project_folder = null;
let projectToUpdate = null;
let editorSelected = null;
let groupSelected = null;

projectToUpdate = ipcRenderer.sendSync('project-request');

setGroupListSelection();

if(projectToUpdate){
    document.getElementById('add').innerText = 'UPDATE'
    setProject(projectToUpdate);
}

function setGroupListSelection(){
    let containers = createArrayGroupContainer(data);
    for(let x in containers){
        containers[x].addEventListener('click', () =>{
            groupSelected = data[x].name;
            containers[x].style.opacity = 0.8;
            containers = setOpacityRight(containers, x);
        })
        groupList.appendChild(containers[x]);
    }
}

function getProject(){
    return {
        name: document.getElementById('project-name').value,
        language: document.getElementById('project-type').value,
        group: groupSelected,
        path: project_folder[0],
        editor: editorSelected,
        repo: '',
        remote_url: ''
    }
}

function setProject(project){
    document.getElementById('project-name').value = project['name'];
    document.getElementById('project-type').value = project['language'];
    document.getElementById('project-path').value = project['path'];
    document.getElementById(project['group']).style.opacity = 0.8;
    document.getElementById(project['editor']).style.opacity = 1;
    groupSelected = document.getElementById(project['group']).id;
    editorSelected = document.getElementById(project['editor']).id;
    project_folder = project['path'];
}

function checkValue(project){
    return (project['name'] && project['path'] && project['group'] && project['editor']);
}


function sender(project){
    if(projectToUpdate){
        ipcRenderer.send('updated-project', project);
    }else{
        if(checkValue(project))
            ipcRenderer.send('add-project', project);
        else
            showErrorMessageBox();
    }
}

document.getElementById('cancel').addEventListener('click', () =>{
    ipcRenderer.send('close-modal');
})

document.getElementById('open').addEventListener('click', () =>{
    project_folder = ipcRenderer.sendSync('open-folder-dialog');
    document.getElementById('project-path').value = project_folder[0];
})

document.getElementById('add').addEventListener('click', () =>{
    let project = getProject();
    git.isRepo(project['path']).then(res => {
        project['repo'] = res;
        sender(project);
    })
})

editors[0].addEventListener('click', () =>{
    editorSelected = 'vscode';
    editors[0].style.opacity = '1';
    editors = setOpacityRight(editors, 0);
})

editors[1].addEventListener('click', () =>{
    editorSelected = 'atom';
    editors[1].style.opacity = '1';
    editors = setOpacityRight(editors, 1);

})

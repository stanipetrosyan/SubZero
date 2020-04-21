'use strict'

const groupList = document.getElementById('group-list');
const editors = document.getElementsByClassName('editor-icon');

setTheme(window.api.themerequest());

let data = window.api.request();
let project_folder = null;
let projectToUpdate = null;
let editorSelected = null;
let groupSelected = null;

projectToUpdate = window.api.projectrequest();

setGroupListSelection();

if(projectToUpdate) {
    document.getElementById('add').innerText = 'UPDATE'
    setProject(projectToUpdate);
    document.getElementById('delete').style.visibility = 'visible';
} else {
    document.getElementById('add').innerText = 'ADD'
}

function setGroupListSelection() {
    for (let group of data) {
        let container = document.createElement('sub-group-container');
        container.setAttribute('color', group['color']);
        container.setAttribute('name', group['name']);
        container.addEventListener('click', () => {
            container.style.opacity = '0.8';
            groupSelected = group.name;
        })
        groupList.appendChild(container);
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
    project_folder = project['path'][0];
}

document.getElementById('open').addEventListener('click', () => {
    let directory = window.api.opendirdialog();
    document.getElementById('project-path').value = directory[0];
}) 

document.getElementById('add').addEventListener('click', () => {
    let project = getProjectValues();
    if (checkInputValues(project)) {
        if (projectToUpdate) {
            window.api.updatedproject(project);
        } else {
            window.api.addproject(project);
        }
    } else {
        window.api.showErrorMessage();
    }
})


function getProjectValues() {
    return {
        name: document.getElementById('project-name').value,
        language: document.getElementById('project-type').value,
        group: groupSelected,
        path: document.getElementById('project-path').value,
        editor: editorSelected,
        repo: null,
        remote_url: null
    }
}

function checkInputValues(project) {
    return (project['name'] && document.getElementById('project-path').value && project['group'] && project['editor']);
}

document.getElementById('delete').addEventListener('click', _ => {
    window.api.deleteproject();
}) 


document.getElementById('cancel').addEventListener('click', () => {
    window.api.closeModal();
})

editors[0].addEventListener('click', () => {
    editorSelected = 'vscode';
    editors[0].style.opacity = '1';
    editors = setOpacity(editors, 0);
})

editors[1].addEventListener('click', () => {
    editorSelected = 'atom';
    editors[1].style.opacity = '1';
    editors = setOpacity(editors, 1);
})

 
function setOpacity(array, index){
    for(var x in array){
        if(x != index){
            array[x].style.opacity = 0.4;
        }
    }
    return array
}

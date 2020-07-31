'use strict'

const groupList = document.getElementById('group-list');
let editors = document.getElementsByTagName('img');

console.log(window.request.setup());

setTheme(window.request.theme());

let data = window.request.data();
let project_folder = null;
let projectToUpdate = null;
let editorSelected = null;
let groupSelected = null;

projectToUpdate = window.request.project();

setGroupListSelection();

if(projectToUpdate) {
    document.getElementById('add').innerText = 'UPDATE'
    setProject(projectToUpdate);
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
            setOpacity(groupList.children, container.getAttribute('id'))
        })
        groupList.appendChild(container);
    }
}

function setProject(project) {
    document.getElementById('project-name').value = project['name'];
    document.getElementById('project-type').value = project['language'];
    document.getElementById('project-path').innerText = project['path'];
    document.getElementById(project['group']).style.opacity = 0.8;
    document.getElementById(project['editor']).style.opacity = 1;
    groupSelected = document.getElementById(project['group']).id;
    editorSelected = document.getElementById(project['editor']).id;
    project_folder = project['path'][0];
}

document.getElementById('open').addEventListener('click', () => {
    let directory = window.modals.folder();
    document.getElementById('project-path').innerText = directory[0];
}) 

document.getElementById('add').addEventListener('click', () => {
    let project = getProjectValues();
    if (checkInputValues(project)) {
        if (projectToUpdate) {
            window.projects.updated(project);
        } else {
            window.projects.add(project);
        }
    } else {
        window.notifies.error();
    }
})


function getProjectValues() {
    return {
        name: document.getElementById('project-name').value,
        language: document.getElementById('project-type').value,
        group: groupSelected,
        path: document.getElementById('project-path').innerText,
        editor: editorSelected,
        repo: null,
        remote_url: null
    }
}

function checkInputValues(project) {
    return (project['name'] && project['path'] && project['group'] && project['editor']);
}

document.getElementById('cancel').addEventListener('click', () => {
    window.modals.close();
})

editors[0].addEventListener('click', () => {
    editorSelected = 'vscode';
    editors[0].style.opacity = '1';
    editors = setOpacity(editors, 'vscode');
})

editors[1].addEventListener('click', () => {
    editorSelected = 'atom';
    editors[1].style.opacity = '1';
    editors = setOpacity(editors, 'atom');
})

 
function setOpacity(array, id){
    for(let element of array){
        if (element.getAttribute('id') != id)
            element.style.opacity = 0.4
    }
    return array
}

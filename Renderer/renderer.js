const { ipcRenderer } = require('electron');
const path = require('path');

const initializer = require('../Component/Initializer');

const group_list = document.getElementById('group-list');
const project_list = document.getElementById('project-list');

let data = null;

refresh();

function refresh(){
    data = ipcRenderer.sendSync('data-request');
    printProjectList();
    printGroupList();
}

function printProjectForGroup(group){
    let projects = initializer.createProjectArrayToAppend(group);
    let i = 0;
    for(let i = 0; i < group.projects.length; i++){
        var element = projects[i];
        element.childNodes[2].addEventListener('click', () => {
            ipcRenderer.send('open-project', group.projects[i])
        })
        element.childNodes[3].addEventListener('click', () => {
            ipcRenderer.send('delete-project', group.projects[i])
        })
        element.childNodes[4].addEventListener('click', () => {
            ipcRenderer.send('update-project', group.projects[i])
        })
    }
    initializer.appendToProjectList(projects, project_list);
}

function printProjectList(){
    project_list.innerHTML = '';
    data.forEach(element => {
       printProjectForGroup(element);
    });
}

function printGroupList(){
    let groups = initializer.createGroupArrayToAppend(data);
    for(let i = 0; i < data.length; i++){
        groups[i].childNodes[1].addEventListener('click', () => {
            project_list.innerHTML = '';
            printProjectForGroup(data[i]);
        })
        groups[i].childNodes[2].addEventListener('click', () => {
            ipcRenderer.send('update-group', data[i]);
        })
    }
    initializer.appendToGroupList(groups, group_list);
}

document.getElementById('newGroup').addEventListener('click', () =>{
    let file = path.join('./Group', 'group_modal.html')
    ipcRenderer.send('open-modal', file);
})

document.getElementById('newProject').addEventListener('click', () =>{
    let file = path.join('./Project', 'project_modal.html')
    ipcRenderer.send('open-modal', file);
})

document.getElementById('group-all').addEventListener('click', () => {
    refresh();
})

ipcRenderer.on('added-group', (event, arg) =>{
    let group = initializer.initializeGroupElement(arg);
    group_list.append(group);
})

ipcRenderer.on('refresh', () =>{
    refresh();
})
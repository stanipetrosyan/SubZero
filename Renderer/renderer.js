const { ipcRenderer } = require('electron');
const path = require('path');

const initializer = require('../Component/Initializer');

const group_list = document.getElementById('group-list');
const project_list = document.getElementById('project-list');

let data = null;

refresh();

function data_request(){
    return ipcRenderer.sendSync('data-request');
}

function printProjectForGroup(group){
    let projects = initializer.createProjectArrayToAppend(group);
    projects.forEach((element) => {
        // qui vanno gli event listener per ogni progetto

        //###############################################
    })

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
        groups[i].addEventListener('click', () => {
            project_list.innerHTML = '';
            printProjectForGroup(data[i]);
        })
    }
    initializer.appendToGroupList(groups, group_list);
}

function refresh(){
    data = data_request();
    printProjectList();
    printGroupList();
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

ipcRenderer.on('added-project', (event, arg) =>{
    printProjectList(arg);  
})
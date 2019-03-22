const { ipcRenderer } = require('electron');
const path = require('path');

const initializer = require('../Component/Initializer');

const group_list = document.getElementById('group-list');
const project_list = document.getElementById('project-list');

refresh();

function data_request(){
    return ipcRenderer.sendSync('data-request');
}

function printProjectList(data){
    project_list.innerHTML = '';
    data.forEach(element => {
        let projects = initializer.createProjectArrayToAppend(element);
        // qui vanno gli event listener per ogni progetto

        //###############################################

        initializer.appendToProjectList(projects, project_list);
    });
}
function printGroupList(data){
    let groups = initializer.createGroupArrayToAppend(data);
    groups.forEach((element) =>{
        // qui vanno gli event listener per ogni progetto

        //###############################################
    })
    initializer.appendToGroupList(groups, group_list);
}

function refresh(){
    data = data_request();
    printProjectList(data);
    printGroupList(data);
}

document.getElementById('newGroup').addEventListener('click', () =>{
    let file = path.join('./Group', 'group_modal.html')
    ipcRenderer.send('open-modal', file);
})

document.getElementById('newProject').addEventListener('click', () =>{
    let file = path.join('./Project', 'project_modal.html')
    ipcRenderer.send('open-modal', file);
})

ipcRenderer.on('added-group', (event, arg) =>{
    let group = initializer.initializeGroupElement(arg);
    group_list.append(group);

})

ipcRenderer.on('added-project', (event, arg) =>{
    printProjectList(arg);  
})
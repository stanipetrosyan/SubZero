const { ipcRenderer } = require('electron');
const path = require('path');

const initializer = require('../lib/Initializer');
const { defineGroup } = require('../custom/sub_group');

const group_list = document.getElementById('group-list');
const project_list = document.getElementById('project-list');

let data = null;

refresh();

//defineGroup();

function refresh(){
    data = ipcRenderer.sendSync('data-request');
    printProjectList();
    printGroupList();
}

function printProjectForGroup(group){
    let projects = initializer.createProjectArrayToAppend(group);
    for(let i = 0; i < group.projects.length; i++){
        var element = projects[i];
        element.childNodes[2].addEventListener('click', _=> {
            ipcRenderer.send('open-project', group.projects[i])
        })
        element.childNodes[3].addEventListener('click', _=> {
            ipcRenderer.send('update-project', group.projects[i])
        })
        element.lastChild.addEventListener('click', _=>{
            ipcRenderer.send("open-git", group.projects[i]);
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
        groups[i].childNodes[1].addEventListener('click', _=> {
            project_list.innerHTML = '';
            printProjectForGroup(data[i]);
        })
        groups[i].childNodes[2].addEventListener('click', _=> {
            ipcRenderer.send('update-group', data[i]);
        })
    }
    initializer.appendToGroupList(groups, group_list);
}

document.getElementById('newGroup').addEventListener('click', _=>{
    let file = path.join(__dirname, '../browsers/group/group_modal.html')
    ipcRenderer.send('open-modal', file);
})

document.getElementById('newProject').addEventListener('click', _=>{
    let file = path.join(__dirname, '../browsers/project/project_modal.html')
    ipcRenderer.send('open-modal', file);
})

document.getElementById('themes').addEventListener('click', _=>{
    let file = path.join(__dirname, '../browsers/themes/set_theme.html')
    ipcRenderer.send('open-modal', file);
})

document.getElementById('group-all').addEventListener('click', _=> {
    refresh();
})

ipcRenderer.on('added-group', (event, arg) =>{
    let group = initializer.initializeGroupElement(arg);
    group_list.append(group);
})

ipcRenderer.on('refresh', () =>{
    refresh();
})
const { ipcRenderer } = require('electron');
const path = require('path');

const initializer = require('../Component/Initializer');

const group_list = document.getElementById('group-list');

let data = data_request();

refresh();

function data_request(){
    return ipcRenderer.sendSync('data-request');
}

function refresh(){
    data = data_request();
    initializer.set_groupList(data, group_list);
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
// TODO:
ipcRenderer.on('added-project', (event, arg) =>{
    console.log(arg);
})
const { ipcRenderer } = require('electron');
const path = require('path');

const DataStore = require('../Component/DataStore');
const initializer = require('../Component/Initializer');

const group_list = document.getElementById('group-list');

let data = data_request();

function data_request(){
    return ipcRenderer.sendSync('data-request');
}
refresh();

function refresh(){
    //builder.setInner(group_list, '');
    //builder.setInner(project_list, '');
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
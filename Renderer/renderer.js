const { ipcRenderer } = require('electron');
const path = require('path');

const DataStore = require('../Component/DataStore');
const initializer = require('../Component/Initializer');

const group_list = document.getElementById('group-list');


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
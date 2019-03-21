const { ipcRenderer } = require('electron');
const path = require('path');

const DataStore = require('../Component/DataStore');
const groupData = new DataStore({name: 'Groups Main'})

document.getElementById('newGroup').addEventListener('click', () =>{
    let file = path.join('./Group', 'group_modal.html')
    ipcRenderer.send('open-modal', file);
})

document.getElementById('newProject').addEventListener('click', () =>{
    let file = path.join('./Project', 'project_modal.html')
    ipcRenderer.send('open-modal', file);
})




// cose per ora :)
 /*let group = {
        name: "desktop2",
        color: "red",
        projects : []
    }
    groupData.deleteGroup("desktop");

    console.log(groupData.getData().data);*/

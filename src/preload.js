const { contextBridge, ipcRenderer } = require('electron');
const initializer = require('./lib/Initializer');


contextBridge.exposeInMainWorld('api', {
 // example
    modal: (data) => { return document.createElement('div') },

    createproject: (data) => { return initializer.createProjectElement(data) }, 
    request: () => { 
        return ipcRenderer.sendSync('data-request');
    },
    openGroupModal: () => ipcRenderer.send('open-modal',  'browsers/group/group_modal.html'),
    openProjectModal: () => ipcRenderer.send('open-modal',  'browsers/project/project_modal.html'),
   
})

ipcRenderer.on('open-group', () => {
    sender('open-modal',  'browsers/group/group_modal.html')
});

ipcRenderer.on('open-project', () => {
    sender('open-modal',  'browsers/project/project_modal.html')
});

ipcRenderer.on('open-theme', () => {
    sender('open-modal',  'browsers/themes/set_theme.html')
});

function sender(channel, message) {
  ipcRenderer.send(channel, message)
}


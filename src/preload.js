const { contextBridge, ipcRenderer } = require('electron');

// TODO use standard for api
contextBridge.exposeInMainWorld('api', {
 // example
    modal: (data) => { return document.createElement('div') },
//
    request: () => { 
        return ipcRenderer.sendSync('data-request');
    },
    openproject: (data) => ipcRenderer.send('open-project', data),
    updateproject: (data) => ipcRenderer.send('update-project', data),
    
    updategroup: (data) => ipcRenderer.send('update-group', data),

    openGroupModal: () => ipcRenderer.send('open-modal',  'browsers/group/group_modal.html'),
    openProjectModal: () => ipcRenderer.send('open-modal',  'browsers/project/project_modal.html'),
    closeModal: () => ipcRenderer.send('close-modal')
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


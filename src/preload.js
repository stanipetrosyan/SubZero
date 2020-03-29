const { contextBridge, ipcRenderer } = require('electron');

// TODO use standard for api
contextBridge.exposeInMainWorld('api', {
 // example
    modal: (data) => { return document.createElement('div') },
//
    request: () => { return ipcRenderer.sendSync('data-request') },

    addgroup: (data) => ipcRenderer.send('add-group', data),
    addproject: (data) => ipcRenderer.send('add-project', data),
    openproject: (data) => ipcRenderer.send('open-project', data),
    updateproject: (data) => ipcRenderer.send('update-project', data),
    updategroup: (data) => ipcRenderer.send('update-group', data),
    updatedgroup: (data) => ipcRenderer.send('updated-group', data),
    updatedproject: (data) => ipcRenderer.send('updated-project', data),
    deletegroup: () => ipcRenderer.sendSync('delete-group'),
    deleteproject: () => ipcRenderer.sendSync('delete-project'),

    grouprequest: () => { return ipcRenderer.sendSync('group-request') },
    projectrequest: () => { return ipcRenderer.sendSync('project-request') },
    
    opendirdialog: () => { return ipcRenderer.sendSync('open-folder-dialog'); },

    openGroupModal: () => ipcRenderer.send('open-modal',  'browsers/group/group_modal.html'),
    openProjectModal: () => ipcRenderer.send('open-modal',  'browsers/project/project_modal.html'),
    closeModal: () => ipcRenderer.send('close-modal')
})

ipcRenderer.on('open-group', () => {
    send('open-modal',  'browsers/group/group_modal.html')
});

ipcRenderer.on('open-project', () => {
    send('open-modal',  'browsers/project/project_modal.html')
});

ipcRenderer.on('open-theme', () => {
    send('open-modal',  'browsers/themes/set_theme.html')
});

function send(channel, message) {
  ipcRenderer.send(channel, message)
}


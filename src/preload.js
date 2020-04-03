const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');


const project_path = path.join(__dirname, '../src/browsers/project/project_modal.html')
const group_path = path.join(__dirname, '../src/browsers/group/group_modal.html')
const theme_path = path.join(__dirname, '../src/browsers/themes/set_theme.html')


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

    updatetheme: (data) => ipcRenderer.send('update-theme', {name: data}),
    themerequest: () => {return ipcRenderer.sendSync('theme-request')},

    opendirdialog: () => { return ipcRenderer.sendSync('open-folder-dialog'); },

    openGroupModal: () => ipcRenderer.send('open-modal',  group_path),
    openProjectModal: () => ipcRenderer.send('open-modal',  project_path),
    closeModal: () => ipcRenderer.send('close-modal'),

    showErrorMessage: () => { ipcRenderer.send('error-message') }
})

ipcRenderer.on('open-group', () => {
    send('open-modal',  group_path)
});

ipcRenderer.on('open-project', () => {
    send('open-modal',  project_path)
});

ipcRenderer.on('open-theme', () => {
    send('open-modal',  theme_path)
});

function send(channel, message) {
  ipcRenderer.send(channel, message)
}


const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');

const project_path = path.join(__dirname, '../src/browsers/project/project_modal.html')
const group_path = path.join(__dirname, '../src/browsers/group/group_modal.html')
const theme_path = path.join(__dirname, '../src/browsers/themes/set_theme.html')

contextBridge.exposeInMainWorld('api', {
    updatetheme: (data) => ipcRenderer.send('update-theme', {name: data}),

    opendirdialog: () => { return ipcRenderer.sendSync('open-folder-dialog'); },

    openGroupModal: () => ipcRenderer.send('open-modal',  group_path),
    openProjectModal: () => ipcRenderer.send('open-modal',  project_path),
    closeModal: () => ipcRenderer.send('close-modal'),

    showErrorMessage: () => { ipcRenderer.send('error-message') }
})

contextBridge.exposeInMainWorld('groups', {
    add: (data) => ipcRenderer.send('add-group', data),
    update: (data) => ipcRenderer.send('update-group', data),
    updated: (data) => ipcRenderer.send('updated-group', data),
    delete: (data) => ipcRenderer.send('delete-group', data)
})

contextBridge.exposeInMainWorld('projects', {
    add: (data) => ipcRenderer.send('add-project', data),
    update: (data) => ipcRenderer.send('update-project', data),
    updated: (data) => ipcRenderer.send('updated-project', data),
    delete: () => ipcRenderer.sendSync('delete-project'),
    open: (data) => ipcRenderer.send('open-project', data)
})

contextBridge.exposeInMainWorld('request', {
    group: () => { return ipcRenderer.sendSync('group-request') },
    project: () => { return ipcRenderer.sendSync('project-request') },
    theme: () => { return ipcRenderer.sendSync('theme-request') },
    data: () => { return ipcRenderer.sendSync('data-request') }
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


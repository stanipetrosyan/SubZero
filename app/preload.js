const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');

const projectPath = path.join(__dirname, '../app/pages/projectWindow/index.html')
const groupPath = path.join(__dirname, '../app/pages/groupWindow/index.html')
const themePath = path.join(__dirname, '../app/pages/preferenceWindow/index.html')

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
    delete: (data) => ipcRenderer.send('delete-project', data),
    open: (data) => ipcRenderer.send('open-project', data)
})

contextBridge.exposeInMainWorld('user', {
    updatetheme: (data) => ipcRenderer.send('update-theme', { name: data })
})

contextBridge.exposeInMainWorld('request', {
    group: () => { return ipcRenderer.sendSync('group-request') },
    project: () => { return ipcRenderer.sendSync('project-request') },
    theme: () => { return ipcRenderer.sendSync('theme-request') },
    data: () => { return ipcRenderer.sendSync('data-request') },
    setup: () => { return ipcRenderer.sendSync('setup-request') }
})

contextBridge.exposeInMainWorld('modals', {
    group: () => ipcRenderer.send('open-modal', groupPath),
    project: () => ipcRenderer.send('open-modal', projectPath),
    theme: () => ipcRenderer.send('open-modal', themePath),
    folder: () => { return ipcRenderer.sendSync('open-folder-dialog') },
    close: () => ipcRenderer.send('close-modal')
})

contextBridge.exposeInMainWorld('notifies', {
    error: () => ipcRenderer.send('error-message')
})

ipcRenderer.on('open-group', () => {
    send('open-modal', groupPath)
});

ipcRenderer.on('open-project', () => {
    send('open-modal', projectPath)
});

ipcRenderer.on('open-preferences', () => {
    send('open-modal', themePath)
});

function send(channel, message) {
    ipcRenderer.send(channel, message)
}

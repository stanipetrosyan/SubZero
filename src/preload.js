const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
 // it works
  modal: (data) => ipcRenderer.send(data,  'browsers/group/group_modal.html'),
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


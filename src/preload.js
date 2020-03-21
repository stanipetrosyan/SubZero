const { contextBridge, ipcRenderer } = require('electron')

process.once('loaded', () => {
  /* window.addEventListener('message', evt => {
    
    if (evt.data.type === 'open-group') {
      ipcRenderer.send('open-modal', 'browsers/group/group_modal.html');
    }
  }) */

  contextBridge.exposeInMainWorld(
    'electron', {
      doThing: () => sender('open-modal',  'browsers/group/group_modal.html')
      //ipcRenderer.send('open-modal', 'browsers/group/group_modal.html')
    }
  )

  ipcRenderer.on('open-group', () => {
    sender('open-modal',  'browsers/group/group_modal.html')
  })
})

function sender(channel, message) {
  ipcRenderer.send(channel, message)
}


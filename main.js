const path = require('path');
const { app, ipcMain } = require('electron');

const Window = require('./Component/Window');
const DataStore = require('./Component/DataStore');

let modal = null;

function main(){
    let mainWindow = new Window({
        file: path.join('./Renderer', 'index.html'),
    })
}

ipcMain.on('open-modal', (event, arg) => {
    if(!modal){
        modal = new Window({
            file: arg,
            width: 400,
            height: 400,
            frame: false
        })
    }
})

ipcMain.on('close-modal', () => {
    if(modal){
        modal.close();
        modal = null;
    }
})


app.on('ready', main)

app.on('window-all-closed', () => {
    app.quit()
})
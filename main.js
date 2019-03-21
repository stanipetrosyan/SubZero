const path = require('path');
const { app, ipcMain } = require('electron');

const Window = require('./Component/Window');
const DataStore = require('./Component/DataStore');

const groupData = new DataStore({name: 'Groups Main'})

let modal = null;
let mainWindow = null;

function main(){
    mainWindow = new Window({
        file: path.join('./Renderer', 'index.html'),
    })
}

function close_modal(){
    if(modal){
        modal.close();
        modal = null;
    }
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
    close_modal();
})

ipcMain.on('add-group', (event, arg) =>{
    groupData.addGroup(arg);
    mainWindow.webContents.send('added-group', arg);
    close_modal();
})


app.on('ready', main)

app.on('window-all-closed', () => {
    app.quit()
})
const electron = require('electron');
const path = require('path');
const { app, ipcMain} = require('electron');
const dialog = electron.dialog;

const Window = require('./Component/Window');
const DataStore = require('./Component/DataStore');
const Terminal = require('./Component/Terminal');

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
// TODO: 
function selectDirectory(){
    return dialog.showOpenDialog(modal ,{
        properties: ["openDirectory"]
    });
}


ipcMain.on('open-modal', (event, arg) => {
    if(!modal){
        modal = new Window({
            file: arg,
            width: 500,
            height: 500,
            frame: false
        })
    }
})

ipcMain.on('close-modal', () => {
    close_modal();
})

ipcMain.on('data-request', (event, arg)=>{
    event.returnValue = groupData.getData().data;
})

ipcMain.on('add-group', (event, arg) =>{
    groupData.addGroup(arg);
    mainWindow.webContents.send('added-group', arg);
    close_modal();
})

ipcMain.on('add-project', (event, arg) =>{
    groupData.addProject(arg);
    mainWindow.webContents.send('added-project');
    close_modal();
})

ipcMain.on('open-project', (event, arg) => {
    Terminal.openProjectUsingEditor(arg.path, arg.editor);
})

ipcMain.on('delete-project', (event, arg) => {
    groupData.removeProject(arg);
    event.returnValue = 'finish'; // random return value to block the renderer request
})

ipcMain.on('open-folder-dialog', (event, arg) =>{
    let dir = selectDirectory();
    event.returnValue = dir;
})



app.on('ready', main)

app.on('window-all-closed', () => {
    app.quit()
})
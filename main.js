const electron = require('electron');
const path = require('path');
const { app, ipcMain} = require('electron');
const dialog = electron.dialog;

const Window = require('./Component/Window');
const DataStore = require('./Component/DataStore');
const Terminal = require('./Component/Terminal');
const config = require('./config')

const groupData = new DataStore({name: 'Groups Main'})

let modal = null;
let mainWindow = null;
let tmp_project = null;

function main(){
    mainWindow = new Window({
        file: path.join('./Renderer', 'index.html'),
    })
}

function openModal(arg){
    if(!modal){
        modal = new Window({
            file: arg,
            width: 500,
            height: 500,
            frame: false,
            resizable: false
        })
    }
}

function closeModal(){
    if(modal){
        modal.close();
        modal = null;
        tmp_project = null;
    }
}
// TODO: 
function selectDirectory(){
    return dialog.showOpenDialog(mainWindow ,{
        properties: ['openDirectory']
    });
}


ipcMain.on('open-modal', (event, arg) => {
    openModal(arg);
})

ipcMain.on('close-modal', () => {
    closeModal();
})

ipcMain.on('data-request', (event, arg)=>{
    event.returnValue = groupData.getData().data;
})

ipcMain.on('add-group', (event, arg) =>{
    groupData.addGroup(arg);
    mainWindow.webContents.send('added-group', arg);
    closeModal();
})

ipcMain.on('add-project', (event, arg) =>{
    groupData.addProject(arg);
    mainWindow.webContents.send('refresh');
    closeModal();
})

ipcMain.on('open-project', (event, arg) => {
    Terminal.openProjectUsingEditor(arg.path, arg.editor);
})

ipcMain.on('delete-project', (event, arg) => {
    let options = config('question');
    let response = dialog.showMessageBox(null, options);
    if(response === 1){
        groupData.removeProject(arg);
    }
    // random return value to block the renderer request
    event.returnValue = 'finish'; 
})

ipcMain.on('update-project', (event, arg) =>{
    openModal('./Project/project_modal.html'); 
    tmp_project = arg;
})

ipcMain.on('project-request', (event, arg) =>{
    event.returnValue = tmp_project;
})

ipcMain.on('updated-project', (event, arg) => {
    groupData.updateProject(tmp_project, arg);
    closeModal();
    mainWindow.webContents.send('refresh');
})

ipcMain.on('open-folder-dialog', (event, arg) =>{
    let dir = selectDirectory();
    event.returnValue = dir;
})

app.on('ready', main)

app.on('window-all-closed', () => {
    app.quit()
})

app.on('window-all-closed', () => {
    // Su macOS è comune che l'applicazione e la barra menù
    // restano attive finchè l'utente non esce espressamente tramite i tasti Cmd + Q
    if(process.platform !== 'darwin'){
        app.quit();
    }
})

app.on('activate', () => {
    // Su macOS è comune ricreare la finestra dell'app quando
    // viene cliccara l'icona sul dock e non ci sono altre finestre aperte
    if(mainWindow === null){
        main();
    }
})
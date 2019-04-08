const electron = require('electron');
const path = require('path');
const { app, ipcMain} = require('electron');
const dialog = electron.dialog;

const Window = require('./Component/Window');
const DataStore = require('./Component/DataStore');
const { openProjectUsingEditor } = require('./Component/terminal');
const config = require('./config')

const groupData = new DataStore({name: 'Groups Main'})

let modal = null;
let mainWindow = null;
let tmp_project = null;
let tmp_group = null;

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
            height: 600,
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
        tmp_group = null;
    }
}

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
    if(groupData.addGroup(arg) == false){
        dialog.showMessageBox(null, config('equals'));
    }else{
        mainWindow.webContents.send('added-group', arg);
        closeModal();
    }   
})

ipcMain.on('add-project', (event, arg) =>{
    groupData.addProject(arg);
    mainWindow.webContents.send('refresh');
    closeModal();
})

ipcMain.on('open-project', (event, arg) => {
    openProjectUsingEditor(arg['path'], arg['editor']);
})

ipcMain.on('delete-project', (event, arg) => {
    let response = dialog.showMessageBox(null, config('question'));
    if(response === 1){
        groupData.removeProject(arg);
    }
    mainWindow.webContents.send('refresh');
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

ipcMain.on('update-group', (event, arg) => {
    openModal('./Group/group_modal.html'); 
    tmp_group = arg;
})

ipcMain.on('group-request', (event, arg) => {
    event.returnValue = tmp_group;
})

ipcMain.on('updated-group', (event, arg) => {
    groupData.updateGroup(tmp_group, arg);
    closeModal();
    mainWindow.webContents.send('refresh');
})

ipcMain.on('delete-group', (event, arg) => {
    let response = dialog.showMessageBox(null, config('question'));
    if(response === 1){
        groupData.deleteGroup(tmp_group.name);
        mainWindow.webContents.send('refresh');
    }
    closeModal();
})

app.on('ready', main)

app.on('window-all-closed', () => {
    app.quit()
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
})

app.on('activate', () => {
    if(mainWindow === null){
        main();
    }
})
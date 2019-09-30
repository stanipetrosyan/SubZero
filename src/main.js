const electron = require('electron');
const path = require('path');
const { app, ipcMain} = require('electron');
const dialog = electron.dialog;

const Window = require('./lib/window');
const DataStore = require('./lib/storage');
const { openProjectUsingEditor } = require('./lib/terminal');
const config = require('../config')

const groupData = new DataStore({name: 'Groups Main'})


const Store = require('./lib/store');
const groupInterface = require('./lib/groupDataInterface');

const store = new Store({
    configName: 'data-user',
    defaults: {
      groups: [],
      theme: { name: "Default"},
      user_setup: {}
    }
});

console.log(store);

const project_path = path.join(__dirname, '../src/browsers/project/project_modal.html')
const group_path = path.join(__dirname, '../src/browsers/group/group_modal.html')
const index_path = path.join(__dirname, '../src/renderer/index.html');
const git_path = path.join(__dirname, '../src/browsers/git/git_modal.html');

let modal = null;
let mainWindow = null;
let tmp_project = null;
let tmp_group = null;

function main() {
    mainWindow = new Window({
        file: index_path,
    })
}

function openModal(arg) {
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

function closeModal() {
    if(modal) {
        modal.close();
        modal = null;
        tmp_project = null;
        tmp_group = null;
    }
}

function selectDirectory() {
    let options = { properties: ["openDirectory"]}
    return dialog.showOpenDialog(options);
}

ipcMain.on('open-modal', (event, arg) => {
    openModal(arg);
})

ipcMain.on('close-modal', () => {
    closeModal();
})

ipcMain.on('data-request', (event, arg) => {
    event.returnValue = groupData.getData().data;
})

ipcMain.on('add-group', (event, arg) => {
    if(groupData.addGroup(arg) == false) {
        dialog.showMessageBox(null, config('equals'));
    } else {
        mainWindow.webContents.send('added-group', arg);
        closeModal();
    }   
})

ipcMain.on('add-project', (event, arg) => {
    groupData.addProject(arg);
    mainWindow.webContents.send('refresh');
    closeModal();
})

ipcMain.on('open-project', (event, arg) => {
    openProjectUsingEditor(arg['path'], arg['editor']);
})
ipcMain.on('open-git', (event, arg) => {
    tmp_project = arg;
    openModal(git_path);
})

ipcMain.on('delete-project', (event, arg) => {
    let response = dialog.showMessageBox(null, config('question'));
    if(response === 1) {
        groupData.removeProject(arg);
    }
    mainWindow.webContents.send('refresh');
    closeModal();
})

ipcMain.on('update-project', (event, arg) => {
    openModal(project_path); 
    tmp_project = arg;
})

ipcMain.on('project-request', (event, arg) => {
    event.returnValue = tmp_project;
})

ipcMain.on('updated-project', (event, arg) => {
    groupData.updateProject(tmp_project, arg);
    closeModal();
    mainWindow.webContents.send('refresh');
})

ipcMain.on('open-folder-dialog', (event, arg) => {
    let dir = selectDirectory();
    event.returnValue = dir;
})

ipcMain.on('update-group', (event, arg) => {
    openModal(group_path); 
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
    if(response === 1) {
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
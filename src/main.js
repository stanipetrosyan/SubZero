const electron = require('electron');
const path = require('path');
const { app, ipcMain } = require('electron');
const dialog = electron.dialog;


const { BrowserWindow } = require('electron');


const Window = require('./lib/window');
const { openProjectUsingEditor } = require('./lib/terminal');
const config = require('../config')

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

const project_path = path.join(__dirname, '../src/browsers/project/project_modal.html')
const group_path = path.join(__dirname, '../src/browsers/group/group_modal.html')
const index_path = path.join(__dirname, '../src/renderer/index.html');
const git_path = path.join(__dirname, '../src/browsers/git/git_modal.html');

const webPreferences = {
    preload: path.join(__dirname, 'preload.js'),
    nodeIntegration: false,
    enableRemoteModule: false,
    contextIsolation: true,
}

let modal = null;
let mainWindow = null;
let tmp_project = null;
let tmp_group = null;

function main() {
    mainWindow = new Window({
        file: index_path,
        webPreferences
    }) 
    require('./renderer/menu');     
}

function openModal(arg) {
    if(!modal){
        modal = new Window({
            file: arg,
            width: 500,
            height: 600,
            frame: false,
            resizable: false,
            webPreferences
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

ipcMain.on('open-modal', (event, arg) => {
    openModal(arg);
})

ipcMain.on('close-modal', () => {
    closeModal();
})

ipcMain.on('error-message', (event, arg) => {
    return dialog.showMessageBoxSync(null, config('error'))
})

ipcMain.on('data-request', (event, arg) => {
    event.returnValue = store.get('groups');
})

ipcMain.on('theme-request', (event, arg) => {
    event.returnValue = store.get('theme');
})

ipcMain.on('update-theme', (event, arg) => {
    store.set('theme', arg);
    closeModal();
})

ipcMain.on('add-group', (event, arg) => {
    if(groupInterface.addGroup(arg, store) == false) {
        dialog.showMessageBox(null, config('equals'));
    } else {
        closeModal();
    }   
})

ipcMain.on('add-project', (event, arg) => {
    groupInterface.addProject(arg, store);
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
    let response = dialog.showMessageBoxSync(null, config('question'));
    if(response === 1) {
        groupInterface.removeProject(tmp_project, store);
    }
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
    groupInterface.updateProject(store, tmp_project, arg);
    closeModal();
})

ipcMain.on('open-folder-dialog', (event, arg) => {
    event.returnValue = dialog.showOpenDialogSync({ properties: ["openDirectory"]});
})

ipcMain.on('update-group', (event, arg) => {
    openModal(group_path); 
    tmp_group = arg;
})

ipcMain.on('group-request', (event, arg) => {
    event.returnValue = tmp_group;
})

ipcMain.on('updated-group', (event, arg) => {
    groupInterface.updateGroup(store, tmp_group, arg);
    closeModal();
})

ipcMain.on('delete-group', (event, arg) => {
    let response = dialog.showMessageBoxSync(null, config('question'));
    if(response === 1) {
        groupInterface.removeGroup(tmp_group.name, store);
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
const electron = require('electron');
const path = require('path');
const { app, ipcMain } = require('electron');
const dialog = electron.dialog;

const Window = require('./lib/window');
const { openProjectUsingEditor } = require('./lib/terminal');
const config = require('./config')

const Store = require('./models/store')
const GroupInterface = require('./models/groupStoreInterface');
const UserSetupInterface = require('./models/userSetupInterface')

const store = new Store()
const groups = new GroupInterface(store);
const userSetup = new UserSetupInterface(store);

const projectPath = path.join(__dirname, '../app/pages/projectWindow/index.html')
const groupPath = path.join(__dirname, '../app/pages/groupWindow/index.html')
const indexPath = path.join(__dirname, '../app/renderer/index.html');

const webPreferences = {
    preload: path.join(__dirname, 'preload.js'),
    nodeIntegration: false,
    enableRemoteModule: false,
    contextIsolation: true
}

let modal = null;
let mainWindow = null;
let selectedProject = null;
let selectedGroup = null;

userSetup.setEditors();

function main() {
    mainWindow = Window({
        file: indexPath,
        webPreferences
    })
    require('./renderer/menu');
}

function openModal(arg) {
    if (!modal) {
        modal = Window({
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
    if (modal) {
        modal.close();
        modal = null;
        selectedProject = null;
        selectedGroup = null;
    }
}

/*
    GROUPS EVENTS
*/
ipcMain.on('add-group', (event, arg) => {
    if (groups.addGroup(arg) === false) {
        dialog.showMessageBox(modal, config('equals'));
    } else {
        closeModal();
    }
})

ipcMain.on('update-group', (event, arg) => {
    openModal(groupPath);
    selectedGroup = groups.getGroupByName(arg);
})

ipcMain.on('updated-group', (event, arg) => {
    groups.updateGroup(selectedGroup, arg);
    closeModal();
})

ipcMain.on('delete-group', (event, arg) => {
    const group = groups.getGroupByName(arg);
    const response = dialog.showMessageBoxSync(mainWindow, config('question'));
    if (response === 0) {
        store.removeGroup(group);
    }
})

/*
    PROJECTS EVENTS
*/
ipcMain.on('add-project', (event, arg) => {
    groups.addProject(arg);
    closeModal();
})

ipcMain.on('update-project', (event, arg) => {
    openModal(projectPath);
    selectedProject = groups.getProjectByName(arg);
})

ipcMain.on('updated-project', (event, arg) => {
    groups.updateProject(selectedProject, arg);
    closeModal();
})

ipcMain.on('delete-project', (event, arg) => {
    const project = groups.getProjectByName(arg);
    const response = dialog.showMessageBoxSync(mainWindow, config('question'));
    if (response === 0) {
        groups.removeProject(project);
    }
    closeModal();
})

ipcMain.on('open-project', (event, arg) => {
    const project = groups.getProjectByName(arg);
    openProjectUsingEditor(project['path'], project['editor'], userSetup.getSettingValue('openTerminal'));
})

/*
    REQUEST DATA
*/
ipcMain.on('group-request', (event, arg) => {
    event.returnValue = selectedGroup;
})

ipcMain.on('project-request', (event, arg) => {
    event.returnValue = selectedProject;
})

ipcMain.on('data-request', (event, arg) => {
    event.returnValue = store.get('groups');
})

ipcMain.on('setup-request', (event, arg) => {
    event.returnValue = store.get('userSetup');
})

ipcMain.on('theme-request', (event, arg) => {
    event.returnValue = store.get('theme');
})

/*
    MODAL & DIALOG EVENTS
*/
ipcMain.on('open-modal', (event, arg) => {
    openModal(arg);
})

ipcMain.on('close-modal', () => {
    closeModal();
})

ipcMain.on('error-message', (event, arg) => {
    return dialog.showMessageBoxSync(modal, config('error'))
})

ipcMain.on('open-folder-dialog', (event, arg) => {
    event.returnValue = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
})

ipcMain.on('update-theme', (event, arg) => {
    store.set('theme', arg);
    closeModal();
})

app.on('ready', main)

app.on('window-all-closed', () => {
    app.quit()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        main();
    }
})

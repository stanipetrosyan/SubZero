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

function close_modal(){
    if(!modal){
        modal.close();
    }
}

ipcMain.on('open-modal', (event, arg) => {
    if(!modal){
        modal = new Window({
            file: arg,
            width: 500,
            height: 500,
        })

        modal.on('closed', () =>{
            modal = null;
        })
    }
})


app.on('ready', main)

app.on('window-all-closed', () => {
    app.quit()
})
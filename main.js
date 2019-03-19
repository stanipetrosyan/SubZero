const path = require('path');
const { app } = require('electron');

const Window = require('./Component/Window');
const DataStore = require('./Component/DataStore');
function main(){
    let mainWindow = new Window({
        file: path.join('./Renderer', 'index.html')
    })
}

app.on('ready', main)

app.on('window-all-closed', () => {
    app.quit()
})
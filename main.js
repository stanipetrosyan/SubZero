const { app } = require('electron');
const Window = require('./Component/window');

function main(){
    let mainWindow = new Window({
        file: 'index.html'
    })
}

app.on('ready', main)

app.on('window-all-closed', () => {
    app.quit()
})
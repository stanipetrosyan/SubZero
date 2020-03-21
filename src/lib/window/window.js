'use strict'

const { BrowserWindow } = require('electron');
const path = require('path')


const defaultProps = {
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 600,
    show: false,
    webPreferences: {
        preload: path.join('home/stanislav/Documenti/Electron/SubZero/src', 'preload.js'),
        nodeIntegration: false
        /* enableRemoteModule: false,
        contextIsolation: true,
        sandbox: true */
    }
}

class Window extends BrowserWindow{
    constructor({file, ...windowSettings}){
        super({...defaultProps, ...windowSettings})

        this.loadFile(file);
        this.once('ready-to-show', () =>{
            this.show()
        })
    }
}

module.exports = Window
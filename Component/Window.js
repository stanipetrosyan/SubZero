'use strict'

const { BrowserWindow } = require('electron');

const defaultProps = {
    width: 800,
    height: 600,
    show: false
}

class Window extends BrowserWindow{
    constructor({file, ...windowSettings}){
        super({...defaultProps, ...windowSettings})

        this.loadFile(file);
        //this.webContents.openDevTools();
        this.once('ready-to-show', () =>{
            this.show()
        })
    }
}

module.exports = Window
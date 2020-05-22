'use strict'

const { BrowserWindow } = require('electron');

const defaultProps = {
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 600,
    show: false,
    title: "SubZero"
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
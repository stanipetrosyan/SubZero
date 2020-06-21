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

module.exports = function Window({file, ...settings}) {
    let window = new BrowserWindow({...defaultProps, ...settings})
    window.loadFile(file);
    window.once('ready-to-show', () =>{
        window.show()
    })
    return window;
}
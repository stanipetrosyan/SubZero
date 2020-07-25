'use strict'

const cmd = require('node-cmd');

module.exports = {
    findEditor(editor) {
        return new Promise((resolve, reject) => {
            cmd.get(editor + " --version", (err, data, stderr) => {
                resolve(!err);
            })  
        })        
    }
}
'use strict'

const cmd = require('node-cmd');

// For first purpose VSCODE & Atom are enough
const editors = ["code", "atom"]; 

module.exports = {
    async findEditorsOnPC() {
        let found = [];
        for (const item of editors) {
            cmd.get(item + " --version", (err, data, stderr) => {
                if (!err) {
                    found.push(true);
                } else {
                    found.push(false);
                }
            })
        }   
        return found;
    }
    
}
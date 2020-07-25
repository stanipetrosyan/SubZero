'use strict'

const electron = require('electron');
const path = require('path');
const fs = require('fs');

const options = require('./options.json')

class Store {
    constructor() {
        const userDataPath = (electron.app || electron.remote.app).getPath('userData');
        this.path = path.join(userDataPath, options.configName + '.json');
        
        this.data = parseDataFile(this.path, options.defaults);
    }
    
    get(key) {
        return this.data[key];
    }
    
    set(key, val) {
        this.data[key] = val;
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.data));
        } catch (error) {}
    }

    delete() {
        fs.unlinkSync(this.path);
    }
}

function parseDataFile(filePath, defaults) {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch(error) {
        return defaults;
    }
}

module.exports = Store;
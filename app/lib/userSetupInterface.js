'use strict'

const Store = require('./store');
const key = 'user_setup';
const { findEditor } = require('./editor-checker');
const editors = require('../config')('editors')

class UserSetupInterface extends Store {
    setEditors() {
        let setup = this.get(key);
        let array = [];
        for (const item of editors) {
            array.push({
                name: item['name'],
                exist: findEditor(item['name'])
            })
        }
        setup['editors'] = array;
        this.set(key, setup);
    }
        
}
module.exports = UserSetupInterface;

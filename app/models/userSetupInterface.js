'use strict'

const key = 'user_setup';
const { findEditor } = require('../lib/editor-checker');
const editors = require('../config')('editors')

class UserSetupInterface {
    constructor(store) {
        this.store = store
    }
    setEditors() {
        let setup = this.store.get(key);
        let array = [];
        for (const item of editors) {
            array.push({
                name: item['name'],
                exist: findEditor(item['name'])
            })
        }
        setup['editors'] = array;
        this.store.set(key, setup);
    }
        
}
module.exports = UserSetupInterface;

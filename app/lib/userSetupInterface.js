'use strict'

const Store = require('./store');
const key = 'user_setup';
const { findEditor } = require('./editor-checker');

class UserSetupInterface extends Store {
    setEditors() {
        let setup = this.get(key);
        let editors = setup['editors'];

        for (const item in editors) {
            editors[item]['exist'] = findEditor(editors[item]['name']);
            this.set(key, setup);
        }
    }
        
}
module.exports = UserSetupInterface;

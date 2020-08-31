'use strict'

const { execSync } = require('child_process');

module.exports = {
  findEditor(editor) {
    try {
      execSync(editor + ' -v');
      return true;
    } catch (error) {
      return false;
    }
  }
}

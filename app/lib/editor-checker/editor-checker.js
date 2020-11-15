'use strict'

const cmd = require('node-cmd')

module.exports = {
  findEditor(editor) {
    let command = cmd.runSync(editor + ' -v')
    return command.err === null
  }
}

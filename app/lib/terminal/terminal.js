'use strict'

const cmd = require('node-cmd');
const platform = process.platform;

module.exports = {

    /**
     * @param {string} path project['path']
     * @param {string} editor project['editor']
     */
    openProjectUsingEditor(path, editor, terminalSetting) {
        path = normalizePathWithSpace(path);
        const comand = [editor, ' ', path].join('')

        cmd.run(comand)
        
        if (terminalSetting) { openTerminalInsidePath(path) }
    }
}

/**
 * Replace space with \\
 * @param {string} path
 * @returns {string}
 */
function normalizePathWithSpace(path) {
    return (String(path).replace(/\s/g, '\\ '));
}

/**
 * @param {string} path
 */
function openTerminalInsidePath(path) {
    switch (platform) {
    case 'linux': cmd.run('gnome-terminal -x bash -c "cd ' + path + '; exec bash"')
        break;
    case 'darwin': cmd.run('open -a Terminal ' + path)
        break;
    case 'win32': cmd.run('cd' + path + ' && start cmd')
        break;
    }
}

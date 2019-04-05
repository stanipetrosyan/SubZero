const cmd = require('node-cmd');
const platform = process.platform;

module.exports = {

    /**
     * @param {String} path project['path']
     * @param {String} editor project['editor']
     */
    openProjectUsingEditor(path, editor){
        path = normalizePathWithSpace(path);

        switch(editor){
            case "vscode" : cmd.run('code ' + path);
                break;
                
            case "atom" : cmd.run('atom.cmd ' + path);
                break;
        }
        openTerminalInsidePath(path);
    },
}

/**
 * Replace space with \\
 * @param {String} path 
 * @returns {String}
 */
function normalizePathWithSpace(path){
    return (String(path).replace(/\s/g, "\\ "));
}

/**
 * @param {String} path 
 */
function openTerminalInsidePath(path){
    switch(platform){
        case 'linux': cmd.run('gnome-terminal -x bash -c "cd ' + path + '; exec bash"')
            break;
        case 'darwin': cmd.run('open -a Terminal ' + path)
            break;
        case 'win32': cmd.run('cd' + path + ' && start cmd')
            break;
    }
}

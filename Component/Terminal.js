const cmd = require('node-cmd');

module.exports = {

    /**
     * 
     * @param {String} path project.path
     * @param {String} editor project.editor
     */
    openProjectUsingEditor(path, editor){
        path = normalizePathWithSpace(path);

        switch(editor){
            case "vscode" : cmd.run('code ' + path);
                break;
                
            case "atom" : cmd.run('atom.cmd ' + path);
                break;
        }
    },
    // TODO :
    openTerminalInsidePath(path){

    }
}

/**
 * 
 * @param {String} path 
 * @returns {String}
 */
function normalizePathWithSpace(path){
    return (String(path).replace(/\s/g, "\\ "));
}
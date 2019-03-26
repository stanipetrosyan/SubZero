const cmd = require('node-cmd');

function normalizePathWithSpace(path){
    return (String(path).replace(/\s/g, "\\ "));
}
module.exports = {

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
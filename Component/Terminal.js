const cmd = require('node-cmd');

function normalizePathWithSpace(path){
    return (String(path).replace(/\s/g, "\\ "));
}
module.exports = {

    openProjectUsingEditor(path, editor){
        path = normalizePathWithSpace(path);

        switch(editor){
            case "VSCode" : cmd.run('code ' + path);
                break;
                
            case "Atom" : cmd.run('atom.cmd ' + path);
                break;
        }
    }
}
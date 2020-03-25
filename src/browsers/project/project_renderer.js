/* const { ipcRenderer } = require('electron');
const { showErrorMessageBox } = require('../../lib/message');
const git  = require('../../lib/git-cli');
const { setTheme } = require('../../lib/theme-setup'); */

const groupList = document.getElementById('group-list');
const editors = document.getElementsByClassName('editor-icon');
const builder = new HTMLBuilder();

// setTheme(ipcRenderer.sendSync('theme-request'));

let data = window.api.request();
let project_folder = null;
let projectToUpdate = null;
let editorSelected = null;
let groupSelected = null;

//projectToUpdate = ipcRenderer.sendSync('project-request');

setGroupListSelection();

if(projectToUpdate) {
    document.getElementById('add').innerText = 'UPDATE'
    setProject(projectToUpdate);
    document.getElementById('delete').style.visibility = 'visible';
} else {
    document.getElementById('add').innerText = 'ADD'
}

function setGroupListSelection() {
    for (let group of data) {
        let container = builder.createElement('div', 'group-container' , String(group.name[0]).toUpperCase(), group.name);
        container.style.backgroundColor = group.color;
        container.addEventListener('click', () => {
            groupSelected = group.name;
            container.style.opacity = 0.8;
        })
        groupList.appendChild(container);
    }

}
/* 
function setOpacityOfSelectedGroup(array, index){
    for(var x in array){
        if(x != index){
            array[x].style.opacity = 0.4;
        }
    }
    return array
} */


/* function setProject(project){
    document.getElementById('project-name').value = project['name'];
    document.getElementById('project-type').value = project['language'];
    document.getElementById('project-path').value = project['path'];
    document.getElementById(project['group']).style.opacity = 0.8;
    document.getElementById(project['editor']).style.opacity = 1;
    groupSelected = document.getElementById(project['group']).id;
    editorSelected = document.getElementById(project['editor']).id;
    project_folder = project['path'][0];
} */

/* 
function sender(project) {
    if(!checkValue(project)) {
        showErrorMessageBox();
        return;
    }     
    if(projectToUpdate){
        ipcRenderer.send('updated-project', project);
    } else {
        ipcRenderer.send('add-project', project);
    }
}
 */


document.getElementById('open').addEventListener('click', () => {
    let directory = window.api.opendirdialog();
    //document.getElementById('project-path').value = project_folder[0];
}) 

document.getElementById('add').addEventListener('click', () => {
    let project = getProjectValues();
    if (checkInputValues(project)) {
        window.api.addproject(project);
    }
/*     git.isRepo(project['path']).then(res => {
        project['repo'] = res;
        sender(project);
    }) */
})


function getProjectValues() {
    return {
        name: document.getElementById('project-name').value,
        language: document.getElementById('project-type').value,
        group: groupSelected,
        path: project_folder[0],
        editor: editorSelected,
        repo: null,
        remote_url: null
    }
}

function checkInputValues(project) {
    return (project['name'] && document.getElementById('project-path').value && project['group'] && project['editor']);
}

/* document.getElementById('delete').addEventListener('click', _ => {
    ipcRenderer.send('delete-project', projectToUpdate);
}) 
 */
/* editors[0].addEventListener('click', () => {
    editorSelected = 'vscode';
    editors[0].style.opacity = '1';
    editors = setOpacityRight(editors, 0);
})

editors[1].addEventListener('click', () => {
    editorSelected = 'atom';
    editors[1].style.opacity = '1';
    editors = setOpacityRight(editors, 1);

}) */

document.getElementById('cancel').addEventListener('click', () => {
    window.api.closeModal();
})

const { ipcRenderer } = require('electron');
const { showErrorMessageBox } = require('../../lib/message');
const git  = require('../../lib/git-cli');
const { setTheme } = require('../../lib/theme-setup');

const groupList = document.getElementById('group-list');
const editors = document.getElementsByClassName('editor-icon');

setTheme(ipcRenderer.sendSync('theme-request'));

let data = ipcRenderer.sendSync('data-request');
let project_folder = null;
let projectToUpdate = null;
let editorSelected = null;
let groupSelected = null;

projectToUpdate = ipcRenderer.sendSync('project-request');

setGroupListSelection();

if(projectToUpdate) {
    document.getElementById('add').innerText = 'UPDATE'
    setProject(projectToUpdate);
    document.getElementById('delete').style.visibility = 'visible';
} else {
    document.getElementById('add').innerText = 'ADD'
}

function setGroupListSelection() {
    let containers = createArrayGroupContainer(data);
    for(let x in containers){
        containers[x].addEventListener('click', () => {
            groupSelected = data[x].name;
            containers[x].style.opacity = 0.8;
            containers = setOpacityRight(containers, x);
        })
        groupList.appendChild(containers[x]);
    }
}

function getProject() {
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

function setProject(project){
    document.getElementById('project-name').value = project['name'];
    document.getElementById('project-type').value = project['language'];
    document.getElementById('project-path').value = project['path'];
    document.getElementById(project['group']).style.opacity = 0.8;
    document.getElementById(project['editor']).style.opacity = 1;
    groupSelected = document.getElementById(project['group']).id;
    editorSelected = document.getElementById(project['editor']).id;
    project_folder = project['path'][0];
}

function checkValue(project) {
    return (project['name'] && document.getElementById('project-path').value && project['group'] && project['editor']);
}


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

document.getElementById('cancel').addEventListener('click', () => {
    ipcRenderer.send('close-modal');
})

document.getElementById('open').addEventListener('click', () => {
    window.postMessage({
        type: 'select-dirs'
    }, '*')
    //document.getElementById('project-path').value = project_folder[0];
})

document.getElementById('add').addEventListener('click', () => {
    let project = getProject();
    git.isRepo(project['path']).then(res => {
        project['repo'] = res;
        sender(project);
    })
})
document.getElementById('delete').addEventListener('click', _ => {
    ipcRenderer.send('delete-project', projectToUpdate);
}) 

editors[0].addEventListener('click', () => {
    editorSelected = 'vscode';
    editors[0].style.opacity = '1';
    editors = setOpacityRight(editors, 0);
})

editors[1].addEventListener('click', () => {
    editorSelected = 'atom';
    editors[1].style.opacity = '1';
    editors = setOpacityRight(editors, 1);

})



/**
     *  @param { array } data
     *  @returns { HTMLCollection } array of containers
     */
    function createArrayGroupContainer(data){
        let array = [];
        let container;
        for(var x in data){
            container = builder.createElement('div', 'group-container' , String(data[x].name[0]).toUpperCase(), data[x].name);
            container.style.backgroundColor = data[x].color;
            array.push(container);
        }
        return array;
        
    }
    /**
     * @param { array } array 
     * @param { number } index element to do not set
     * @returns { array } opacity setted
     */
    function setOpacityRight(array, index){
        for(var x in array){
            if(x != index){
                array[x].style.opacity = 0.4;
            }
        }
        return array
    }

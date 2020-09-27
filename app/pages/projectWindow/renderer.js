'use strict'

const groupList = document.getElementById('group-list');
setTheme(window.request.theme());

const data = window.request.data();
let projectFolder = null;
let projectToUpdate = null;
let editorSelected = null;
let groupSelected = null;

projectToUpdate = window.request.project();

setGroupListSelection();
createEditors();

let editors = document.getElementsByTagName('img');

if (projectToUpdate) {
  document.getElementById('add').innerText = 'UPDATE'
  setProject(projectToUpdate);
} else {
  document.getElementById('add').innerText = 'ADD'
}

function setGroupListSelection() {
  for (const group of data) {
    const container = document.createElement('sub-group-container');
    container.setAttribute('color', group['color']);
    container.setAttribute('name', group['name']);
    container.addEventListener('click', () => {
      container.style.opacity = '0.8';
      groupSelected = group.name;
      setOpacity(groupList.children, container.getAttribute('id'))
    })
    groupList.appendChild(container);
  }
}

function setProject(project) {
  document.getElementById('project-name').value = project['name'];
  document.getElementById('project-type').value = project['language'];
  document.getElementById('project-path').innerText = project['path'];
  document.getElementById(project['group']).style.opacity = 0.8;
  document.getElementById(project['editor']).style.opacity = 1;
  groupSelected = document.getElementById(project['group']).id;
  editorSelected = document.getElementById(project['editor']).id;
  projectFolder = project['path'][0];
}

document.getElementById('open').addEventListener('click', () => {
  const directory = window.modals.folder();
  document.getElementById('project-path').innerText = directory[0];
})

document.getElementById('add').addEventListener('click', () => {
  const project = getProjectValues();
  if (checkInputValues(project)) {
    if (projectToUpdate) {
      window.projects.updated(project);
    } else {
      window.projects.add(project);
    }
  } else {
    window.notifies.error();
  }
})

function getProjectValues() {
  return {
    name: document.getElementById('project-name').value,
    language: document.getElementById('project-type').value,
    group: groupSelected,
    path: document.getElementById('project-path').innerText,
    editor: editorSelected,
    repo: null,
    remote_url: null
  }
}

function checkInputValues(project) {
  return (project['name'] && project['path'] && project['group'] && project['editor']);
}

document.getElementById('cancel').addEventListener('click', () => {
  window.modals.close();
})

function createEditors() {
  console.log(window.request.setup())
  const userEditors = window.request.setup()['editors'];
  
  for (const item of userEditors) {
    if (item['exist']) {
      const editor = document.createElement('img');
      editor.setAttribute('src', `../../assets/icons/${item['name']}_icon.png`);
      editor.setAttribute('id', item['name']);
      editor.className = 'icon editor-icon';

      editor.addEventListener('click', _ => {
        editorSelected = item['name'];
        editor.style.opacity = '1';
        editors = setOpacity(editors, item['name']);
      })
      document.getElementById('editors').appendChild(editor);
    }
  }
}

function setOpacity(array, id) {
  for (const element of array) {
    if (element.getAttribute('id') !== id) { element.style.opacity = 0.4 }
  }
  return array
}

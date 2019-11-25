const { ipcRenderer } = require('electron');
const { appendAllChild } = require('../../lib/Builder');
const { initializeColorPickerElement } = require('../../lib/Initializer')
const { showErrorMessageBox } = require('../../lib/message');
const { setTheme } = require('../../lib/theme-setup');

setTheme(ipcRenderer.sendSync('theme-request'));

const select = document.getElementById('select');
const ul_element = document.getElementById('color-list');
const shower_color_selected = document.getElementById('cs-placeholder');
let addBtn = document.getElementById('add-update');
let active = false;
let groupToUpdate = null;
let selected = null;

groupToUpdate = ipcRenderer.sendSync('group-request');

if(groupToUpdate) {
    setGroup();
    addBtn.innerHTML = 'UPDATE';
    document.getElementById('delete').style.visibility = 'visible';
} else {
    addBtn.innerHTML = 'ADD';
}

initializeColorPickerElementsWithClickEvent();

function initializeColorPickerElementsWithClickEvent() {
    let colors = initializeColorPickerElement();
    colors.forEach(function(element){
        element.addEventListener('click', () =>{
            selected = element.getAttribute('data-value');
            shower_color_selected.style.backgroundColor = selected;
        })
    })
    appendAllChild(ul_element, colors);
}

select.addEventListener('click', () => {
    if(active){
        select.className = select.className.substring(0, select.className.length - 10);
    }else{
        select.className += " cs-active";
    }
    active = !active;
})

function getGroup() {
    return {
        name: document.getElementById('group-name').value,
        color : selected,
        projects : []
    }
}

function setGroup() {
    document.getElementById('group-name').value = groupToUpdate['name'];
    shower_color_selected.style.backgroundColor = groupToUpdate['color'];
    selected = groupToUpdate['color'];
}

function checkValue(group) {
    return (group['name'] && group['color']);
}

document.getElementById('cancel').addEventListener('click', () => {
    ipcRenderer.send('close-modal');
})

document.getElementById('add-update').addEventListener('click', () => {
    let group = getGroup();
    if(groupToUpdate) {
        group['projects'] = groupToUpdate['projects'];
        ipcRenderer.send('updated-group', group);
    } else {
        if(checkValue(group)) {
            ipcRenderer.send('add-group', group);
        } else {
            showErrorMessageBox();
        }
    }
})

document.getElementById('delete').addEventListener('click', () => {
    ipcRenderer.send('delete-group');
})





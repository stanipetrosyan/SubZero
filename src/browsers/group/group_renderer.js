'use strict'

//const { showErrorMessageBox } = require('../../lib/message');
//const { setTheme } = require('../../lib/theme-setup');

//setTheme(ipcRenderer.sendSync('theme-request'));
const colors = ["F44336", "E91E63", "9C27B0", "673AB7", "3F51B5","2196F3", "03A9F4","00BCD4", "009688", "4CAF50", "8BC34A","CDDC39", "FFEB3B","FFC107","FF9800","FF5722","795548","9E9E9E","607D8B","f1c1bd"]

const select = document.getElementById('select');
const ul_element = document.getElementById('color-list');
const shower_color_selected = document.getElementById('cs-placeholder');
let addBtn = document.getElementById('add-update');
let active = false;
let groupToUpdate = null;
let selected = null;

const builder = new HTMLBuilder();

groupToUpdate = null //ipcRenderer.sendSync('group-request'); 

if(groupToUpdate) {
    setGroup();
    addBtn.innerHTML = 'UPDATE';
    document.getElementById('delete').style.visibility = 'visible';
} else {
    addBtn.innerHTML = 'ADD';
}

createColorPicker();

select.addEventListener('click', () => {
    if(active){
        select.className = select.className.substring(0, select.className.length - 10);
    }else{
        select.className += " cs-active";
    }
    active = !active;
})

document.getElementById('add-update').addEventListener('click', () => {
    let group = getGroupValues();
    if (checkInputValues(group)) {
        window.api.addgroup(group)
    }
    /* if(groupToUpdate) {
        group['projects'] = groupToUpdate['projects'];
        ipcRenderer.send('updated-group', group);
    } else {
        if(checkValue(group)) {
            ipcRenderer.send('add-group', group);
        } else {
            showErrorMessageBox();
        }
    } */
})

function getGroupValues() {
    return {
        name: document.getElementById('group-name').value,
        color : selected,
        projects : []
    }
}

function checkInputValues(group) {
    return (group['name'] && group['color']);
}
/*

function setGroup() {
    document.getElementById('group-name').value = groupToUpdate['name'];
    shower_color_selected.style.backgroundColor = groupToUpdate['color'];
    selected = groupToUpdate['color'];
}



document.getElementById('delete').addEventListener('click', () => {
    ipcRenderer.send('delete-group');
}) */

document.getElementById('cancel').addEventListener('click', () => {
    window.api.closeModal();
})

function createColorPicker() {
    colors.forEach(color => {
        let colorPickerElement = builder.createElement('li', 'color-' + color);
        builder.setAttribute(colorPickerElement, "data-option", "");
        builder.setAttribute(colorPickerElement, "data-value", '#' + color);
        colorPickerElement.addEventListener('click', () =>{
            selected = colorPickerElement.getAttribute('data-value');
            shower_color_selected.style.backgroundColor = selected;
        })
        ul_element.appendChild(colorPickerElement);
    })
}
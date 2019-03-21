const { ipcRenderer } = require('electron');
const { appendAllChild } = require('../Component/Builder');
const { initializeColorPickerElement } = require('../Component/Initializer')

const select = document.getElementById('select');
const ul_element = document.getElementById('color-list');
const shower_color_selected = document.getElementById('cs-placeholder');
let active = false;



initializeColorPickerElementsWithClickEvent();
let selected;

function initializeColorPickerElementsWithClickEvent(){
    let colors = initializeColorPickerElement();
    colors.forEach(function(element){
        element.addEventListener('click', () =>{
            selected = element.getAttribute('data-value');
            shower_color_selected.style.backgroundColor = selected;
        })
    })
    appendAllChild(ul_element, colors);
}

select.addEventListener('click', () =>{
    if(active){
        select.className = select.className.substring(0, select.className.length - 10);
    }else{
        select.className += " cs-active";
    }
    active = !active;
})

document.getElementById('cancel').addEventListener('click', () => {
    ipcRenderer.send('close-modal');
})


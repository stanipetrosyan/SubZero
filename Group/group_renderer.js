const {ipcRenderer} = require('electron');
const BuilderHTML = require('../Component/Builder');

const builder = new BuilderHTML();

const closeModal = document.getElementById('add-update');
const cancelBtn = document.getElementById('cancel');
const deleteBtn = document.getElementById('delete');
const select = document.getElementById('select');
const ul_element = document.getElementById('color-list');
const shower_color_selected = document.getElementById('cs-placeholder');
var color_list = ["F44336", "E91E63", "9C27B0", "673AB7", "3F51B5","2196F3", "03A9F4","00BCD4", "009688", "4CAF50", "8BC34A","CDDC39", "FFEB3B" ,"FFC107", "FF9800","FF5722","795548","9E9E9E","607D8B","f1c1bd"];
let active = false;


initializeColorPickerElementsWithClickEvent();
let selected;

function initializeColorPickerElementsWithClickEvent(){
    let el; 
    for(let i = 0; i < color_list.length; i++){
        el = builder.createElement('li', 'color-' + color_list[i], '');
        el.setAttribute("data-option", "");
        el.setAttribute("data-value", '#'+ color_list[i]);
        el.addEventListener('click', () =>{
            selected = '#' + color_list[i];
            shower_color_selected.style.backgroundColor = selected;
        })
        ul_element.appendChild(el);
    }
}

select.addEventListener('click', () =>{
    if(active){
        select.className = select.className.substring(0, select.className.length - 10);
    }else{
        select.className += " cs-active";
    }
    active = !active;
})

const builder = require('../classes/html_builder');

const color_list = require('../../config')('colors');


module.exports = {

    /**
     * @returns {HTMLCollection}
     */
    initializeColorPickerElement(){
        let array = [];
        let el; 
        for(let i = 0; i < color_list.length; i++){
            el = builder.createElement('li', 'color-' + color_list[i], '');
            builder.setAttribute(el, "data-option", "");
            builder.setAttribute(el, "data-value", '#' + color_list[i]);
            array.push(el);
        }
        return array;
    },
    
    /**
     *  @param { array } data
     *  @returns { HTMLCollection } array of containers
     */
    createArrayGroupContainer(data){
        let array = [];
        let container;
        for(var x in data){
            container = builder.createElement('div', 'group-container' , String(data[x].name[0]).toUpperCase(), data[x].name);
            container.style.backgroundColor = data[x].color;
            array.push(container);
        }
        return array;
        
    },
    /**
     * @param { array } array 
     * @param { number } index element to do not set
     * @returns { array } opacity setted
     */
    setOpacityRight(array, index){
        for(var x in array){
            if(x != index){
                array[x].style.opacity = 0.4;
            }
        }
        return array
    }
}
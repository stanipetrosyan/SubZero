const builder = require('./Builder');

const color_list = ["F44336", "E91E63", "9C27B0", "673AB7", "3F51B5","2196F3", "03A9F4","00BCD4", "009688", "4CAF50", "8BC34A","CDDC39", "FFEB3B" ,"FFC107", "FF9800","FF5722","795548","9E9E9E","607D8B","f1c1bd"];


module.exports = {
    initializeColorPickerElement(){
        let array = [];
        let el; 
        for(let i = 0; i < color_list.length; i++){
            el = builder.createElement('li', 'color-' + color_list[i], '');
            el.setAttribute("data-option", "");
            el.setAttribute("data-value", '#'+ color_list[i]);
            array.push(el);
        }
        return array;
    }
}
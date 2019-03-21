const builder = require('./Builder');

const color_list = ["F44336", "E91E63", "9C27B0", "673AB7", "3F51B5","2196F3", "03A9F4","00BCD4", "009688", "4CAF50", "8BC34A","CDDC39", "FFEB3B" ,"FFC107", "FF9800","FF5722","795548","9E9E9E","607D8B","f1c1bd"];


module.exports = {
    initializeColorPickerElement(){
        let array = [];
        let el; 
        for(let i = 0; i < color_list.length; i++){
            el = builder.createElement('li', 'color-' + color_list[i], '');
            builder.setAttribute(el, "data-option", "");
            builder.setAttribute(el, "data-value", '#'+ color_list[i]);
            array.push(el);
        }
        return array;
    },

    initializeGroupElement(group){
        let div = builder.createElement('div','group-item', '');
        let g_type = builder.createElement('div', 'group-type', '')
        let g_color = builder.createElement('span', 'group-color', '');
        g_color.style.backgroundColor = group.color;
        g_type.appendChild(builder.createElement('p', 'group-label', group.name));
        builder.appendAllChild(div, [g_color, g_type]);
        return div;
    }
}
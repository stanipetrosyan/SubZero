const builder = require('./Builder');

const color_list = ["F44336", "E91E63", "9C27B0", "673AB7", "3F51B5","2196F3", "03A9F4","00BCD4", "009688", "4CAF50", "8BC34A","CDDC39", "FFEB3B" ,"FFC107", "FF9800","FF5722","795548","9E9E9E","607D8B","f1c1bd"];


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
            builder.setAttribute(el, "data-value", '#'+ color_list[i]);
            array.push(el);
        }
        return array;
    },

    /**
     * @param { Object } group 
     * @returns { HTMLElement }
     */
    initializeGroupElement(group){
        let div = builder.createElement('div','group-item', '');
        let g_type = builder.createElement('div', 'group-type', '')
        let g_color = builder.createElement('span', 'group-color', '');
        let modify = builder.createElement('div', 'group-modify-icon', '');
        g_color.style.backgroundColor = group['color'];
        g_type.appendChild(builder.createElement('p', 'group-label', group['name']));
        builder.appendAllChild(div, [g_color, g_type, modify]);
        return div;
    },

    /**
     * @param { Object } data 
     * @returns { HTMLCollection } array about div of group
     * @see initializeGroupElement
     */
    createGroupArrayToAppend(data){
        let array = [];
        for(let i = 0; i < data.length; i++){
            array.push(this.initializeGroupElement(data[i]));
        }
        return array;
    },
    
    /**
     *  @param { Array } data
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
     * @param {Object} project 
     * @returns {HTMLElement}
     */
    createProjectElement(project){
        let div = builder.createElement('div', 'item', '');
        builder.appendAllChild(div, [
            builder.createElement('p', 'title-project', project['name']),
            builder.createElement('p', 'title-project', project['language']),
            builder.createElement('button', 'button button-subzero', 'OPEN'),
            builder.createElement('div', 'project-delete-icon', '', 'del'),
            builder.createElement('div', 'project-modify-icon', '', 'up')   
        ]);
        return div;
    },

    /**
     * @param {Object} group 
     * @returns {Array}
     * @see createProjectElement
     */
    createProjectArrayToAppend(group){
        let array = [];
        group.projects.forEach((project) => {
            array.push(this.createProjectElement(project));
        })
        return array;
    },
    
    /**
     * @param {Array} projects 
     * @param {HTMLDivElement} elem 
     */
    appendToProjectList(projects, elem){
        builder.appendAllChild(elem, projects);
    }, 

    /**
     * @param {Array} groups 
     * @param {HTMLDivElement} elem 
     */
    appendToGroupList(groups, elem){
        builder.setInner(elem, '');
        builder.appendAllChild(elem, groups);
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
const builder = require('../services/html_builder');

const color_list = require('../../config')('colors');


module.exports = {
    /**
     * @param {object} project 
     * @returns {HTMLElement}
     */
    createProjectElement(project){
        let div = builder.createElement('div', 'item', '');
        let title = builder.createElement('h2', 'title-project', project['name']);
        title.appendChild(builder.createElement('div', 'project-modify-icon', '', 'up'));
        builder.appendAllChild(div, [
            title,
            builder.createElement('p', 'subtitle-project', project['language']),
            builder.createElement('button', 'button button-subzero button-right', 'OPEN'),
            
        ]);
        if(project['repo']){
            div.appendChild(builder.createElement('div', 'project-git-icon', '', 'git'));
        }
        return div;
    },

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
     * @param { object } group 
     * @returns { HTMLElement }
     */
    createGroupElement(group){
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
     * @param { object } data 
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
     * @param {object} group 
     * @returns {array}
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
     * @param {array} projects 
     * @param {HTMLDivElement} elem 
     */
    appendToProjectList(projects, elem){
        builder.appendAllChild(elem, projects);
    }, 

    /**
     * @param {array} groups 
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
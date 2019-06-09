module.exports = {

    /**
     * @param {string} tagName
     * @param {string} className 
     * @param {string} innerText 
     * @param {string} id 
     * @returns {HTMLElement}
     */
     createElement(tagName, className, innerText, id){
        let elem =  document.createElement(tagName);
        if(className)
            elem = this.setClassName(elem, className);
        if(innerText)
            elem = this.setInner(elem, innerText);
        if(id)
            elem.id = id;

        return elem;
    },

    setClassName(elem, className){
        elem.className = className;
        return elem;
    },

    setInner(elem, text){
        elem.innerHTML = text;
        return elem;
    },
    
    /**
     * @param { HTMLElement } parent 
     * @param { HTMLCollection } childs 
     */
    appendAllChild(parent, childs){
        for(var x in childs){
            parent.appendChild(childs[x]);
        }
    },
    
    /**
     * @param {HTMLElement} elem 
     * @param {string} name_attribute 
     * @param {any} value
     * @returns {HTMLElement}  
     */
    setAttribute(elem, name_attribute, value){
        return elem.setAttribute(name_attribute, value);
    }
}


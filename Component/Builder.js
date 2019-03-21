module.exports= {

     createElement(tagName, className, innerText){
        let elem =  document.createElement(tagName);
        elem = this.setClassName(elem, className);
        elem = this.setInner(elem, innerText);
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

    appendAllChild(parent, childs){
        for(var x in childs){
            parent.appendChild(childs[x]);
        }
    },
    setAttribute(elem, name_attribute, value){
        return elem.setAttribute(name_attribute, value);
    }

}

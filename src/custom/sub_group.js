class Label extends HTMLElement{
    constructor(){
        super();

        var self = this;
        self.innerText = this.value;
        self.style.display = 'inline-block';
        self.style.width = '100px';
        self.style.marginLeft = '10px';
        self.style.fontSize = '14px';
        self.style.color = 'white'; 
    }

    get value(){
        return this.getAttribute('value');   
    }

    set value(newValue){
        this.setAttribute('value', newValue);
    }
}

class Circle extends HTMLElement{
    constructor(){
        super();

        var self = this;
        self.style.backgroundColor = this.color;
        self.setAttribute('class', 'group-color');
        
        /*self.style.display = 'inline-block';
        self.style.width = '10px';
        self.style.height = '10px';
        self.style.borderRadius = '50%';
        self.style.marginLeft = '10px';*/
    }

    get color() {
        return this.getAttribute('color');
    }
      
    set color(newValue) {
        this.setAttribute('color', newValue);
    }
}


class Group extends HTMLElement{
    constructor(){
        super();

        var self = this;
        self.innerText = this.label;

        self.style.width = '100%';
        self.style.height = '50px';
        self.style.marginBottom = '5px';

        var shadow = self.attachShadow( { mode: 'open' } );
        var c = document.createElement('sub-group-color');
        var l = document.createElement('sub-group-label');
        var style = document.createElement('style');
        style.innerHTML = '@import url(../style/index.css)';
        c.setAttribute('color', this.color);
        l.setAttribute('value', this.label);
        shadow.appendChild(c);
        shadow.appendChild(l);
        shadow.appendChild(style);

    }

    get color() {
        return this.getAttribute('color');
    }
      
    set color(newValue) {
        this.setAttribute('color', newValue);
    }

    get label(){
        return this.getAttribute('label');
    }
    
    set label(newValue){
        this.setAttribute('label', newValue);
    }

    static get observedAttributes() {
        return ['color', 'label'];
    }
}

module.exports = {
    defineGroup(){
        customElements.define('sub-group', Group);
        customElements.define('sub-group-color', Circle);
        customElements.define('sub-group-label', Label);   
    }
}


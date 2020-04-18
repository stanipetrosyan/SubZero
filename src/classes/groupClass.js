class Group extends HTMLDivElement {
    constructor() {
      	super();
    }
  
    static get observedAttributes() {
        return ['name', 'color']
    }
  
    get name() {
        return this.getAttribute('name')
    }
  
    get color() {
        return this.getAttribute('color')
    }
  
    set name(name) {
        this.setAttribute('name', name)
    }
  
    set color(color) {
        this.setAttribute('color', color)
    }
  
    connectedCallback() {
        let shadow = this.attachShadow({mode:'open'});
        this.style.width = '100%';
        this.style.marginBottom = '5px';
        this.style.height = '50px';
        this.style.cursor = 'pointer';

        let color = document.createElement('span');  
        color.style.display = 'inline-block';
        color.style.marginLeft = '10px';
        color.style.marginRight = '10px';
        color.style.width = '10px';
        color.style.height = '10px';
        color.style.borderRadius = '50%';
        color.style.backgroundColor = this.color;
  
        let container = document.createElement('div');
        container.style.display = 'inline-block';
        container.style.width = '100px';
        container.style.color = 'white';
        container.style.fontSize = '14px';
        container.innerText = `${this.name}`

        shadow.appendChild(color);
        shadow.appendChild(container)
    }
}
  
  
customElements.define('sub-group', Group, {extends: "div"});
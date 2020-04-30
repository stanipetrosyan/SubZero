class GroupContainerDOM extends HTMLElement {
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
        this.style.display = 'inline-block';
        this.style.lineHeight = '40px';
        this.style.width = '40px';
        this.style.height = '40px';
        this.style.color = 'white';
        this.style.marginLeft = '10px';
        this.style.fontSize = '1.6em';
        this.style.backgroundColor = this.color;
        this.style.textAlign = 'center';
        this.style.borderRadius = '50%';
        this.style.border = '2px solid var(--font-color)';
        this.style.opacity = '0.4';
        this.style.cursor = 'pointer';
        this.style.verticalAlign = 'center';

        this.innerHTML = this.name[0].toUpperCase();
        this.setAttribute('id', this.name);
    }
}
  
  
customElements.define('sub-group-container', GroupContainerDOM);
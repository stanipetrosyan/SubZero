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

        this.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
        this.style.borderRadius = '5px';
        this.style.width = '40%';
        this.style.display = 'block'
        this.style.backgroundColor = "#1e1e1e"
        this.style.color = 'var(--main-text-color)'

        let color = document.createElement('span');
        
        color.style.display = 'inline-block';
        color.style.marginLeft = '10px';
        color.style.marginRight = '10px';
        color.style.width = '10px';
        color.style.height = '10px';
        color.style.borderRadius = '50%';
        color.style.backgroundColor = this.color;
  
        let label = document.createElement('div');
        label.style.display = 'inline-block';
        label.style.width = '100px';
        label.style.color = 'white';
        label.style.fontSize = '14px';
        label.innerText = `${this.name}`

        shadow.appendChild(color);
        shadow.appendChild(label)
    }
}
  
  
customElements.define('sub-group', Group, {extends: "div"});
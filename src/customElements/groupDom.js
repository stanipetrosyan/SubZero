class GroupDOM extends HTMLElement {
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
        
        this.style.display = 'block'
        this.style.width = '100%';
        this.style.marginBottom = '5px';
        this.style.marginTop = '10px';
        this.style.height = '50px';
        this.style.lineHeight = '50px';
        this.style.cursor = 'pointer';
       
        this.addEventListener('mouseover', _ => {
			this.style.backgroundColor = '#252525';
		})
		this.addEventListener('mouseout', _ => {
			this.style.backgroundColor = 'var(--bg-color)';
		})

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
        container.style.color = 'var(--font-color)';
        container.style.fontSize = '14px';
		container.innerText = `${this.name}`

		shadow.appendChild(color);
		shadow.appendChild(container)
    }
}
  
  
customElements.define('sub-group', GroupDOM);
class ProjectDOM extends HTMLElement {
	constructor() {
		super();
	}

	static get observedAttributes() {
		return ['name']
	}

	get name() {
		return this.getAttribute('name')
	}

	set name(name) {
		this.setAttribute('name', name)
	}

	connectedCallback() {
		let shadow = this.attachShadow({mode:'open'});

		this.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
		this.style.borderRadius = '5px';
		this.style.width = '40%';
		this.style.display = 'block'
		this.style.backgroundColor = "var(--card-bg-color)"
		this.style.color = 'var(--font-color)'
		this.style.margin = '20px';

		let container = document.createElement('div');
		container.style.padding = '10px 16px'

		let name =  document.createElement('h3');
		name.innerHTML = `${this.name}`;

		let settings = document.createElement('button');
		settings.style.backgroundColor = 'var(--card-bg-color)';
		settings.style.border = 'none';
		settings.style.color = 'var(--primary-color)';
		settings.style.display = 'inline-block';
		settings.innerHTML = "SETTING";


		let open = document.createElement('button');
		open.style.backgroundColor = 'var(--card-bg-color)';
		open.style.border = 'none';
		open.innerHTML = "OPEN";
		open.style.color = 'var(--primary-color)';

		open.addEventListener('click', _ => {
			window.projects.open(this.name);
		})

		settings.addEventListener('click', _ => {
			window.projects.update(this.name);
		})

		this.addEventListener('mouseover', _ => {
			this.style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.2)';
		})
		this.addEventListener('mouseout', _ => {
			this.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
		})

		container.appendChild(name);
		container.appendChild(settings);
		container.appendChild(open);
		shadow.appendChild(container);
	}
}


customElements.define('sub-project', ProjectDOM);
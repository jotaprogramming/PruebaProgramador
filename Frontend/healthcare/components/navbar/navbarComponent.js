import './style.css';

class navbarElement extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.innerHTML = `
        <header class="index-header">
            <a href="/" class="index-header__brand">Healthcare</a>
            <nav class="index-header__navbar">
                <button class="navbar__item"><i class="fas fa-search"></i></button>
                <button class="navbar__item"><i class="fas fa-shopping-cart"></i></button>
                <button class="navbar__item"><i class="fas fa-user"></i></button>
            </nav>
        </header>
        `;
	}
}

customElements.define('nav-bar', navbarElement);

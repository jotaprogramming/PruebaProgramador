import './style.css';

class navbarElement extends HTMLElement {
	constructor() {
		super();
	}
	menuListener() {
		const menu = document.getElementById('menu');
		menu.addEventListener('click', () => {
			const navbar = document.getElementById('navbar');
			navbar.classList.contains('active-navbar')
				? navbar.classList.remove('active-navbar')
				: navbar.classList.add('active-navbar');
		});
	}
	connectedCallback() {
		this.innerHTML = `
        <header class="index-header">
            <a href="/" class="index-header__brand">Healthcare</a>
            <div class="index-header__tail" id="tail">
                <button class="index-header__menu" id="menu"><i class="fas fa-bars"></i></button>
                <nav class="index-header__navbar" id="navbar">
                    <button class="navbar__item" id="search"><i class="fas fa-search"></i></button>
                    <button class="navbar__item" id="cart"><i class="fas fa-shopping-cart"></i></button>
                    <button class="navbar__item" id="user"><i class="fas fa-user"></i></button>
                </nav>
            </div>
        </header>
        `;
		this.menuListener();
	}
}

customElements.define('nav-bar', navbarElement);

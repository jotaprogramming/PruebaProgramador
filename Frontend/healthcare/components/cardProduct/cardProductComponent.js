import './style.css';

class cardProduct extends HTMLElement {
	constructor() {
		super();
		this.id;
		this.summary;
		this.path;
		this.price;
		this.stock;
	}
	static get observedAttributes() {
		return ['id', 'summary', 'path', 'description', 'price', 'stock'];
	}
	attributeChangedCallback(attr, oldVal, newVal) {
		if (newVal != oldVal) {
			switch (attr) {
				case 'id':
					this.id = newVal;
					break;
				case 'summary':
					this.summary = newVal;
					break;
				case 'path':
					this.path = newVal;
					break;
				case 'price':
					this.price = newVal;
					break;
				case 'stock':
					this.stock = newVal;
					break;
			}
		}
	}
	connectedCallback() {
		this.innerHTML = `
        <div class="product__card" id="${this.id}">
            <figure class="card__header">
                <img src="${this.path}" alt="image" class="card__image">
            </figure>
            <div class="card__body">
                <h2 class="card__title">${this.summary}</h2>
                <span class="card__price">$ ${this.price}</span>
                <div class="card__cart">
                    <div class="cart__quantity">
                        <button class="quantity__item btn" id="decrease"><i class="fa-solid fa-minus" type="button"></i></button>
                        <span type="number" class="quantity__item" id="quantity" min="1" max="${this.stock}">1</span>
                        <button class="quantity__item btn" id="increase"><i class="fa-solid fa-plus" type="button"></i></button>
                    </div>
                    <button class="cart__addtocart btn" type="button" id="addtocart">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
        `;
	}
}

customElements.define('cart-product', cardProduct);

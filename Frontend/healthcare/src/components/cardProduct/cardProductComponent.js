import './style.css';

/* It's a custom element that creates a card with a product image, a title, a price, and a button that
adds the product to the cart. */
class cardProduct extends HTMLElement {
	constructor() {
		super();
		this.id;
		this.summary;
		this.path;
		this.price;
		this.stock;
		this.description;
		this.type;
		this.supplied;
		this.min = 1;
		this.cartTemplate;
	}
	/**
	 * It returns an array of attributes that the component will observe.
	 * @returns An array of strings.
	 */
	static get observedAttributes() {
		return [
			'id',
			'summary',
			'path',
			'description',
			'price',
			'stock',
			'type',
			'supplied',
		];
	}
	/**
	 * A function that is called when an attribute is changed.
	 * @param attr - The name of the attribute that changed.
	 * @param oldVal - The value of the attribute before the change.
	 * @param newVal - The new value of the attribute.
	 */
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
				case 'description':
					newVal != 'null'
						? (this.description = newVal)
						: (this.description = 'Sin descripción');
					break;
				case 'type':
					newVal != 'null'
						? (this.type = newVal)
						: (this.type = 'Sin presentación');
					break;
				case 'supplied':
					newVal != 'null'
						? (this.supplied = newVal)
						: (this.supplied = 'No especificada');
					break;
			}
		}
	}
	/**
	 * It returns a string of HTML code that contains a button with an id of "decrease", a span with an id
	 * of "quantity", and a button with an id of "increase".
	 * @returns The template literal is being returned.
	 */
	get CartTemplate() {
		return `<div class="card__cart">
			<div class="cart__quantity">
				<button class="quantity__item btn" id="decrease"><i class="fa-solid fa-minus" type="button"></i></button>
				<span type="number" class="quantity__item" id="quantity" min="${this.min}" max="${this.stock}">${this.min}</span>
				<button class="quantity__item btn" id="increase"><i class="fa-solid fa-plus" type="button"></i></button>
			</div>
			<button class="cart__addtocart btn" type="button" id="${this.id}">
				Añadir al carrito
			</button>
		</div>`;
	}
	connectedCallback() {
		/* Checking if the stock is 0, if it is, it sets the minimum to 0 and sets the cartTemplate to a div
		with the class of soldout and the text of "Sin stock disponible". If the stock is not 0, it sets
		the cartTemplate to the CartTemplate method. */
		if (this.stock == 0) {
			this.min = 0;
			this.cartTemplate = `<div class="soldout">Sin stock disponible</div>`;
		} else {
			this.cartTemplate = this.CartTemplate;
		}
		this.innerHTML = `
        <div class="product__card" id="${this.id}">
            <figure class="card__header">
                <img src="${this.path}" alt="image" class="card__image">
            </figure>
            <div class="card__body">
                <h2 class="card__title">${this.summary}</h2>
                <span class="card__price">$ ${this.price}</span>
                ${this.cartTemplate}
				<div class="card__extra">
					<p class="card__description">${this.description}</p>
					<p class="card__type">${this.type}</p>
					<p class="card__supplied">Via de administración: ${this.supplied}</p>
				</div>
            </div>
        </div>
        `;
	}
}

customElements.define('cart-product', cardProduct);

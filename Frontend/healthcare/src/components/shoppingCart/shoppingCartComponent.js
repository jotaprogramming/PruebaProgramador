import { GetShoppingCart } from '../../service/apiService.js';
import './style.css';

class shoppingCart extends HTMLElement {
	constructor() {
		super();
		this.elements = '';
		this.total = 0;
		this.test;
		this.products = [];
	}
	GetElements({price, iva, product_id, image_path, summary, quantity}) {
        let subtotal = 0;
		if (iva) {
            subtotal = price + price * iva;
		} else {
            console.log('YES')
			subtotal = price;
		}
		// this.total += subtotal;
		return `<div class="product__item" id="${product_id}">
            <figure class="product__figure">
                <img src="${image_path}" alt="" class="product__image">
            </figure>
            <div class="product__body">
                <h4 class="product__summary">${summary}</h4>
                <div class="product__info">
                    <p class="product__quantity"><strong>Cantidad: </strong>${
					quantity
				}</p>
                    <p class="procuct__price"><strong>Valor unidad: </strong>$${
					price
				}</p>
                    <p class="procuct__total"><strong>Valor total: </strong>$${
					price * quantity
				}</p>
                    <p class="product__shipping"><strong>Envío: </strong>$0</p>
                </div>
            </div>
        </div>`;
	}
	GetCartProducts = async () => {
		const products = await GetShoppingCart();
		this.elements = (products || []).map(this.GetElements).join('\n');
	};
	connectedCallback() {
        this.GetCartProducts();
        console.log(this.elements);
		// console.log(this.products);
		// console.log(this.products[0]);
		this.innerHTML = `
        <div class="modal" id="modal">
            <div class="modal__card">
                <div class="modal__header">
                    <h3 class="modal__title">Producto añadido correctamente al carrito</h3>
                    <button type="button" class="modal__btn modal__btn--close" id="close"><i class="fa-solid fa-x"></i></button>
                </div>
                <div class="modal__body">
                    <div class="modal__products">
                        <h4 class="modal__title modal__title--normal">Agregaste:</h4>
                        <div class="product__list">
                            ${this.test}
                        </div>
                    </div>
                    <div class="modal__receipt">
                        <div class="receipt__header">
                            <h4 class="modal__title">Resumen de tu carrito</h4>
                        </div>
                        <div class="receipt__body">
                            <div class="receipt__column">
                                <p class="receipt__item">Subtotal:</p>
                                <p class="receipt__item">Transporte:</p>
                                <p class="receipt__item">IVA:</p>
                                <p class="receipt__item">Total:</p>
                                <p class="receipt__item">Incluido IVA:</p>
                            </div>
                            <div class="receipt__column">
                                <p class="receipt__item">$${this.total}</p>
                                <p class="receipt__item">Sin costo</p>
                                <p class="receipt__item">Incluido</p>
                                <p class="receipt__item">$${this.total}</p>
                                <p class="receipt__item">$0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal__footer">
                    <button class="modal__btn modal__btn--bordered">Ver más productos</button>
                    <button class="modal__btn modal__btn--borderless" id="${this.id}">Pagar</button>
                </div>
            </div>
        </div>
        `;
		// console.log(this.elements);
	}
}

customElements.define('shopping-cart', shoppingCart);

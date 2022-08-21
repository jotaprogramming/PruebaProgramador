import './style.css';

/* The class is a custom element that creates a modal window with a list of products and a receipt. */
class shoppingCart extends HTMLElement {
	constructor() {
		super();
		this.elements = '';
		this.total = 0;
		this.test;
		this.products = [];
	}
	/**
     * It takes the HTML template and adds it to the shadow DOM.
     */
    connectedCallback() {
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
	}
}

customElements.define('shopping-cart', shoppingCart);

import './style.css';
import './components/navbar/navbarComponent.js';
import './components/cardProduct/cardProductComponent.js';
import './components/shoppingCart/shoppingCartComponent.js';
import { GetProducts, GetShoppingCart } from './src/service/apiService.js';

const app = document.getElementById('app');
let totalNeto = 0;
let subTotal = 0;

function GetElements({
	price,
	iva,
	product_id,
	image_path,
	summary,
	quantity,
}) {
	if (iva) {
		totalNeto += price + price * iva;
	} else {
		subTotal += price;
	}
	return `<div class="product__item" id="${product_id}">
		<figure class="product__figure">
			<img src="${image_path}" alt="" class="product__image">
		</figure>
		<div class="product__body">
			<h4 class="product__summary">${summary}</h4>
			<div class="product__info">
				<p class="product__quantity"><strong>Cantidad: </strong>${quantity}</p>
				<p class="procuct__price"><strong>Valor unidad: </strong>$${price}</p>
				<p class="procuct__total"><strong>Valor total: </strong>$${price * quantity}</p>
				<p class="product__shipping"><strong>Envío: </strong>$0</p>
			</div>
		</div>
	</div>`;
}
async function GetCartProducts(indexProducts) {
	const products = await GetShoppingCart();
	const elements = (products || []).map(GetElements).join('\n');
	const shoppingCart = `
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
							${elements}
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
								<p class="receipt__item">$${subTotal}</p>
								<p class="receipt__item">Sin costo</p>
								<p class="receipt__item">Incluido</p>
								<p class="receipt__item">$${totalNeto}</p>
								<p class="receipt__item">$0</p>
							</div>
						</div>
					</div>
				</div>
				<div class="modal__footer">
					<button class="modal__btn modal__btn--bordered">Ver más productos</button>
					<button class="modal__btn modal__btn--borderless" id="">Pagar</button>
				</div>
			</div>
		</div>`;
	render(indexProducts, shoppingCart);
}

function modalActive(element) {
	const modal = document.getElementById('modal');
	const container = document.getElementsByClassName('index-container')[0];
	element.addEventListener('click', () => {
		modal.classList.contains('modal__active')
			? (modal.classList.remove('modal__active'),
			  container.classList.remove('index-container__inactive'))
			: (modal.classList.add('modal__active'),
			  container.classList.add('index-container__inactive'));
	});
}

function cartListener() {
	const cart = document.getElementById('cart');
	const close = document.getElementById('close');
	modalActive(cart);
	modalActive(close);
}

function quantityListener() {
	const decrease = document.querySelectorAll('#decrease');
	const increase = document.querySelectorAll('#increase');
	const quantityAll = document.querySelectorAll('#quantity');
	decrease.forEach((element, index) => {
		element.addEventListener('click', () => {
			let quantity = quantityAll[index];
			let min_value = quantityAll[index].getAttribute('min');
			if (parseInt(quantity.innerHTML) > parseInt(min_value)) {
				quantity.innerHTML--;
			}
		});
	});
	increase.forEach((element, index) => {
		element.addEventListener('click', () => {
			let quantity = quantityAll[index];
			let max_value = quantityAll[index].getAttribute('max');
			if (parseInt(quantity.innerHTML) < parseInt(max_value)) {
				quantity.innerHTML++;
			}
		});
	});
}

const GetIndexProducts = async () => {
	const products = await GetProducts();
	let elements = '';
	products.forEach((product) => {
		elements += `<cart-product id="${product.id}" summary="${product.summary}" path="${product.image_path}" price="${product.price}" stock="${product.stock}"></cart-product>`;
	});
	// render(elements);
	GetCartProducts(elements);
};

function render(index_products, shopping_cart) {
	app.innerHTML = `${shopping_cart}
	<nav-bar></nav-bar>
    <main class="index-container">
        <div class="index-container__slider"></div>
        <section class="index-container__products" id="products">
            ${index_products}
        </section>
    </main>
    `;
	quantityListener();
	cartListener();
}

GetIndexProducts();

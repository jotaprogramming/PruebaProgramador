import './style.css';
import './src/components/navbar/navbarComponent.js';
import './src/components/cardProduct/cardProductComponent.js';
import './src/components/shoppingCart/shoppingCartComponent.js';
import './src/components/slider/sliderComponent.js';
import {
	GetProducts,
	GetShoppingCart,
	AddToCart,
	SetOrder,
} from './src/service/apiService.js';

const app = document.getElementById('app');

let totalNeto = 0;
let subTotal = 0;

/**
 * It returns a string that contains the HTML code of the product that is going to be displayed in the
 * shopping cart
 * @returns A string with the HTML code of the product.
 */
function GetElements({
	price,
	iva,
	id_product,
	image_path,
	summary,
	quantity,
}) {
	/* Calculating the total value of the products in the shopping cart. */
	if (iva) {
		totalNeto += (price + price * iva) * quantity;
		subtotal += price * quantity;
	} else {
		subTotal += price * quantity;
		totalNeto = subTotal;
	}
	return `<div class="product__item" id="${id_product}">
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

/**
 * It takes the products from the shopping cart and renders them in a modal
 * @param indexProducts - The index of the product that was added to the cart.
 */
async function GetCartProducts(indexProducts) {
	const products = await GetShoppingCart();

	let msgTitle = products.length ? 'Carrito de compras' : 'Sin productos';
	let msgSubtitle = products.length ? 'Agregaste:' : '';
	let elements = (products || []).map(GetElements).join('\n');

	const shoppingCart = `
	<div class="modal" id="modal">
		<div class="modal__card">
			<div class="modal__header">
				<h3 class="modal__title">${msgTitle}</h3>
				<button type="button" class="btn modal__btn modal__btn--close" id="close"><i class="fa-solid fa-x"></i></button>
			</div>
			<div class="modal__body">
				<div class="modal__products">
					<h4 class="modal__title modal__title--normal">${msgSubtitle}</h4>
					<div class="product__list">
						${elements}
					</div>
				</div>
				<button class="btn receipt__btn" id="angle">
					<div class="receipt__up-down up-down-active">
						<p class="receipt__item"><strong>Total:</strong> $${totalNeto}</p>
						<i class="fas fa-angle-up"></i>
					</div>
				</button>
				<div class="modal__receipt receipt__down" id="receipt">
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
			${
				msgSubtitle !== ''
					? `<div class="modal__footer" id="${products[0].id_order}">
							<button class="btn modal__btn modal__btn--bordered" id="see_more">Ver más productos</button>
							<button class="btn modal__btn modal__btn--borderless" id="pay" order="${products[0].id_order}">Pagar</button>
						</div>`
					: ''
			}
		</div>
	</div>`;
	Render(indexProducts, shoppingCart);
}


/**
 * It adds an event listener to the element passed in, and when the element is clicked, it toggles the
 * modal's active class and the container's inactive class
 * @param element - The element that will be clicked to activate the modal.
 */
function modalActive(element) {
	if (element) {
		const modal = document.getElementById('modal');
		const container =
			document.getElementsByClassName('index-container')[0];
		element.addEventListener('click', () => {
			modal.classList.contains('modal__active')
				? (modal.classList.remove('modal__active'),
				  container.classList.remove('index-container__inactive'))
				: (modal.classList.add('modal__active'),
				  container.classList.add('index-container__inactive'));
		});
	}
}

/**
 * If the receipt has the class of 'receipt__up', remove it. If it doesn't, add it
 */
function receiptActive() {
	const receipt = document.getElementById('receipt');
	if (receipt.classList.contains('receipt__up')) {
		receipt.classList.remove('receipt__up');
	} else {
		receipt.classList.add('receipt__up');
	}
}

/**
 * The function adds an event listener to the angle button. When the button is clicked, the
 * receiptActive function is called and the angle button is rotated
 */
function AngleListener() {
	const angle = document.getElementById('angle');
	angle.addEventListener('click', () => {
		receiptActive();
		if (angle.classList.contains('receipt__btn--rotate')) {
			angle.classList.remove('receipt__btn--rotate');
		} else {
			angle.classList.add('receipt__btn--rotate');
		}
	});
}

/**
 * It takes the cart, close, and see_more elements and passes them to the modalActive function
 */
function CartListener() {
	const cart = document.getElementById('cart');
	const close = document.getElementById('close');
	const see_more = document.getElementById('see_more');
	modalActive(cart);
	modalActive(close);
	modalActive(see_more);
}

/**
 * It takes the body of the form and the id of the product and sends it to the server to be stored in
 * the database
 * @param body - The body of the request.
 * @param id - The id of the product you want to update.
 * @returns A function that takes two parameters, body and id.
 */
const OrderStore = async (body, id) => {
	try {
		const result = await SetOrder(body, id);
		if (result.msg == 'updated') {
			GetIndexProducts();
			return true;
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * It gets the element with the id 'pay', and if it exists, it adds an event listener to it, which,
 * when clicked, gets the id of the order, creates a body with the status of the order, and then calls
 * the OrderStore function, passing the body and the id of the order as parameters
 */
function Pay() {
	const pay = document.getElementById('pay');
	if (pay) {
		pay.addEventListener('click', () => {
			const id = pay.getAttribute('order');
			const body = { status: 0 };
			const store = OrderStore(JSON.stringify(body), id);
			if (store) {
				alert('Orden guardada satisfactoriamente');
			}
		});
	}
}

/**
 * It adds an event listener to each decrease and increase button, and when the button is clicked, it
 * either increases or decreases the quantity of the item
 */
function QuantityListener() {
	const decrease = document.querySelectorAll('#decrease');
	const increase = document.querySelectorAll('#increase');
	const quantityAll = document.querySelectorAll('#quantity');
	decrease.forEach((element, index) => {
		element.addEventListener('click', () => {
			let quantity = quantityAll[index];
			let min_value = quantityAll[index].getAttribute('min');
			console.log(min_value);
			if (parseInt(quantity.innerHTML) > parseInt(min_value)) {
				quantity.innerHTML--;
			}
		});
	});
	increase.forEach((element, index) => {
		element.addEventListener('click', () => {
			console.log(element, index);
			let quantity = quantityAll[index];
			let max_value = quantityAll[index].getAttribute('max');
			console.log(max_value);
			if (parseInt(quantity.innerHTML) < parseInt(max_value)) {
				quantity.innerHTML++;
			}
		});
	});
}

/**
 * It adds an event listener to each button with the class cart__addtocart, and when the button is
 * clicked, it gets the quantity of the product and the id of the product, and then it sends a request
 * to the server to store the product in the cart
 */
function AddToCartListener() {
	const addtocartAll = document.querySelectorAll('.cart__addtocart');
	const quantityAll = document.querySelectorAll('#quantity');
	addtocartAll.forEach((element, index) => {
		element.addEventListener('click', () => {
			const quantity = quantityAll[index];
			if (quantity.innerHTML != 0) {
				const id_product = element.getAttribute('id');
				const body = {
					id_product: id_product,
					quantity: quantity.innerHTML,
				};
				const store = StoreCart(JSON.stringify(body));
				if (store) {
					alert('Producto añadido satisfactoriamente');
				}
			} else {
				alert('Sin stock disponible');
			}
		});
	});
}

/**
 * It takes a body object, sends it to the AddToCart function, and if the result is saved, it calls the
 * GetIndexProducts function
 * @param body - {
 * @returns A function that takes in a body and returns a boolean.
 */
const StoreCart = async (body) => {
	try {
		const result = await AddToCart(body);
		if (result.msg == 'saved') {
			GetIndexProducts();
			return true;
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * It gets all the products from the database, then it loops through them and creates a string of HTML
 * elements that will be rendered to the page
 */
const GetIndexProducts = async () => {
	const products = await GetProducts();
	let elements = '';
	products.forEach((product) => {
		elements += `<cart-product id="${product.id}" summary="${product.summary}" path="${product.image_path}" price="${product.price}" stock="${product.stock}"></cart-product>`;
	});
	GetCartProducts(elements);
};

/**
 * It renders the HTML code for the index page
 * @param index_products - the products that are displayed on the index page
 * @param shopping_cart - the shopping cart component
 */
function Render(index_products, shopping_cart) {
	app.innerHTML = `${shopping_cart}
	<nav-bar></nav-bar>
    <main class="index-container">
        <div class="index-container__slider">
			<slider-element></slider-element>
		</div>
        <section class="index-container__products" id="products">
            ${index_products}
        </section>
    </main>
    `;
	QuantityListener();
	AddToCartListener();
	CartListener();
	Pay();
	AngleListener();
}

GetIndexProducts();
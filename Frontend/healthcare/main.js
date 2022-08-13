import './style.css';
import './components/navbar/navbarComponent.js';
import './components/cardProduct/cardProductComponent.js';
import { GetProducts } from './src/service/apiService.js';

const app = document.getElementById('app');

const GetPromise = async () => {
	const products = await GetProducts();
	let elements = '';
	products.forEach((product) => {
		elements += `<cart-product id="${product.id}" summary="${product.summary}" path="${product.image_path}" price="${product.price}"></cart-product>`;
	});
	render(elements);
};

function render(elements) {
	app.innerHTML = `<nav-bar></nav-bar>
    <main class="index-container">
        <div class="index-container__slider"></div>
        <section class="index-container__products" id="products">
            ${elements}
        </section>
    </main>
    `;
}

GetPromise();

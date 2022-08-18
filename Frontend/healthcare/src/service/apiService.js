const url = 'http://localhost:3000/api/v1';
const optionsGetProduct = {
	method: 'GET',
};

export async function GetProducts() {
	return fetch(`${url}/product/`, optionsGetProduct).then(function (
		response
	) {
		return response.json();
	});
}

const optionsGetShoppingCart = {
	method: 'POST',
};

export async function GetShoppingCart() {
	return fetch(`${url}/cart/1`, optionsGetShoppingCart).then(function (
		response
	) {
		return response.json();
	});
}

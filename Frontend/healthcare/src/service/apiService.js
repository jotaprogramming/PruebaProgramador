const url = 'http://localhost:3000/api/v1';

export async function GetProducts() {
	const options = {
		method: 'GET',
	};
	return fetch(`${url}/product/`, options)
		.then(function (response) {
			return response.json();
		})
		.catch((err) => console.error(err));
}

export async function GetShoppingCart() {
	const options = {
		method: 'POST',
	};
	return fetch(`${url}/cart/show/1`, options)
		.then(function (response) {
			return response.json();
		})
		.catch((err) => console.error(err));
}

export async function AddToCart(body) {
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: body,
	};
	return fetch(`${url}/cart/add`, options)
		.then(function (response) {
			return response.json();
		})
		.catch((err) => console.error(err));
}

export async function SetOrder(body, id) {
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: body,
	};

	return fetch(`${url}/order/update/${id}`, options)
		.then(function (response) {
			return response.json();
		})
		.catch((err) => console.error(err));
}

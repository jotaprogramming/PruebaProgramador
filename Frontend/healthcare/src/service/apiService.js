const url = 'http://localhost:3000/api/v1';


/**
 * It's a function that returns a promise that resolves to a JSON object.
 * @returns A promise.
 */
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

/**
 * It's a function that returns a promise that resolves to a JSON object.
 * @returns {
 *     "id": 1,
 *     "user_id": 1,
 *     "created_at": "2020-01-29T18:00:00.000Z",
 *     "updated_at": "2020-01-29T18:00:00.000Z",
 *     "cart_items": [
 *         {
 *             "id
 */
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

/**
 * It takes a JSON object as a parameter, and sends it to the server.
 * @param body - {
 * @returns The response from the server.
 */
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

/**
 * It takes a body and an id, and then it makes a POST request to the server with the body and id.
 * @param body - {
 * @param id - the id of the order
 * @returns The response from the server.
 */
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

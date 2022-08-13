const url = 'http://localhost:3000/';
const options = {
	method: 'GET',
	mode: 'cors', 
	cache: 'default',
};

export async function GetProducts() {
	return fetch(url, options).then(function (response) {
		return response.json();
	});
}

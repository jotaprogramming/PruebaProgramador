// Import modules
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.json({
		msg: 'healthcare API',
		version: 'v1',
		routes: {
			product: '/api/v1/product',
			iva: '/api/v1/iva',
			supplied: '/api/v1/supplied',
			order: '/api/v1/order',
			cart: '/api/v1/cart',
		},
	});
});

module.exports = router;

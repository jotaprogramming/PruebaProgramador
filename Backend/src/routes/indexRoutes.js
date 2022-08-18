// Import modules
const { Router } = require('express');
const router = Router();

// Import controllers
// const controller = require('../controllers/cartController.js');

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
// router.get('/add', controller.create);
// router.post('/add', controller.store);
// router.get('/update/:id', controller.edit);
// router.post('/update/:id', controller.update);
// router.get('/delete/:id', controller.destroy);

module.exports = router;

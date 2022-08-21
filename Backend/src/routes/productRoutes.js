// Import modules
const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();

// Import controllers
const controller = require('../controllers/productController.js');

router.get('/', controller.index);
router.post(
	'/add',
	body('summary').isLength({ min: 2 }),
	body('price').isInt({ min: 50 }),
	body('stock').isInt({ min: 0 }),
	controller.store
);
router.post('/update/:id', controller.update);
router.get('/delete/:id', controller.destroy);

module.exports = router;

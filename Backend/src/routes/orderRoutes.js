// Import modules
const {Router} = require('express');
const router = Router();

// Import controllers
const controller = require('../controllers/orderController.js');

router.get('/', controller.index);
router.post('/add', controller.store);
router.post('/update/:id', controller.update);

module.exports = router;

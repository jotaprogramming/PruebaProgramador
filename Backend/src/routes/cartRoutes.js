// Import modules
const {Router} = require('express');
const router = Router();

// Import controllers
const controller = require('../controllers/cartController.js');

router.get('/', controller.index);
router.post('/show/:status', controller.show);
router.post('/add', controller.status);
router.post('/update/:id', controller.update);
router.get('/delete/:id', controller.destroy);

module.exports = router;

// Import modules
const {Router} = require('express');
const router = Router();

// Import controllers
const controller = require('../controllers/cartController.js');

router.get('/', controller.index);
router.post('/:status', controller.show);
// router.get('/add', controller.create);
router.post('/add', controller.store);
// router.get('/update/:id', controller.edit);
router.post('/update/:id', controller.update);
router.get('/delete/:id', controller.destroy);

module.exports = router;

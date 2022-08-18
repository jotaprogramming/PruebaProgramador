// Import modules
const {Router} = require('express');
const router = Router();

// Import controllers
const controller = require('../controllers/ivaController.js');

router.get('/', controller.index);
// router.get('/add', controller.create);
// router.post('/add', controller.store);
// router.get('/update/:id', controller.edit);
router.post('/update/:id', controller.update);
// router.get('/delete/:id', controller.destroy);

module.exports = router;

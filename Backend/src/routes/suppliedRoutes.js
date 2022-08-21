// Import modules
const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();

// Import controllers
const controller = require('../controllers/suppliedController.js');

router.get('/', controller.index);
router.post('/add', body('description').isLength({ min: 3 }), controller.store);
router.post('/update/:id', body('description').isLength({ min: 3 }), controller.update);
router.get('/delete/:id', controller.destroy);

module.exports = router;

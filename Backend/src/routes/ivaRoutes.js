// Import modules
const {Router} = require('express');
const router = Router();

// Import controllers
const controller = require('../controllers/ivaController.js');

router.get('/', controller.index);
router.post('/update/:id', controller.update);

module.exports = router;

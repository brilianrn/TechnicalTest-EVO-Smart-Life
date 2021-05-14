const express = require('express');
const ItemController = require('../controllers/itemController');
const { authentication } = require('../middlewares/auth');
const router = express.Router();

router.get('/', ItemController.showItems);
router.get('/:id', ItemController.showItem);

router.use(authentication);
router.post('/', ItemController.addItem);
router.put('/:id', ItemController.editItem);
router.delete('/:id', ItemController.deleteItem);

module.exports = router;
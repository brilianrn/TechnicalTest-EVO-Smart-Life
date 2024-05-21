const express = require('express');
const CartController = require('../controllers/cartController');
const router = express.Router();
const { authentication, authorization } = require('../middlewares/auth');

router.use(authentication);

router.post('/', CartController.addCart);

router.get('/', authorization, CartController.showCarts);
router.get('/:id', authorization, CartController.showCart);
router.put('/:id', authorization, CartController.editCart);
router.delete('/:id', authorization, CartController.deleteCart);

module.exports = router;
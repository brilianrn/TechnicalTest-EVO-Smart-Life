const express = require('express');
const userRouter = require('./userRouter');
const itemRouter = require('./itemRouter');
const cartRouter = require('./cartRouter');
const router = express.Router();

router.use('/user', userRouter);
router.use('/item', itemRouter);
router.use('/cart', cartRouter);

module.exports = router;
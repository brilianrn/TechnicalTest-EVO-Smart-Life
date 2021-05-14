const express = require('express');
const userRouter = require('./userRouter');
const itemRouter = require('./itemRouter');
const router = express.Router();

router.use('/user', userRouter);
router.use('/item', itemRouter);

module.exports = router;
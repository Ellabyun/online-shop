const express = require('express');

const adminController = require('../controllers/admin.controller');

const router = express.Router();


router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

// router.get('/products/create')

module.exports = router;
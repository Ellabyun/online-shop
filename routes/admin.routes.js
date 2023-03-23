const express = require('express');

const adminController = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middleswares/image-upload');

const router = express.Router();


router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);
// router.get('/products/create')

module.exports = router;
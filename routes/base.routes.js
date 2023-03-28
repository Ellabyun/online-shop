const express = require('express');

const router = express.Router();

router.get('/', function(req, res){
    if(res.locals.isAdmin){
        return res.redirect('/admin/products');
    }
    res.redirect('/products');
})

router.get('/401', function(req, res){
    res.render('shared/401')
})

router.get('/403', function(req, res){
    res.render('shared/403')
})
router.get('/403', function(req, res){
    res.render('shared/403')
})
module.exports = router;
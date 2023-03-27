const Product = require('../models/product.model');
const { get } = require('../routes/auth.routes');

function getCart(req, res){
    res.render('customer/cart/cart');
}
async function addCartItem(req, res, next){
    let product;
    try{
        product = await Product.findById(req.body.productId);
    }catch(error){
        next(error);
        return;
    }
    const cart = res.locals.cart;
 
    cart.addItem(product);
    req.session.cart = cart;
    //201 리소스 추가 성공
    res.status(201).json({
        message: 'Cart updated!',
        newTotalItems: cart.totalQuantity,
    });
}

function updateCartItem(req, res){
    const cart = res.locals.cart;
    const updatedItemData = cart.updateItem(req.body.productId, req.body.quantity);
    req.session.cart = cart;
    res.json({
        message: 'Item updated!',
        updatedCartData:{
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice
        }
    })
}

module.exports={
    getCart: getCart,
    addCartItem: addCartItem,
    updateCartItem: updateCartItem
}
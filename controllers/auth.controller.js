function getSignup(req, res){
    res.render('customer/auth/signup');
} 

function signp(req, res){
    
}
function getLogin(req, res){
    res.render('login');
} 

module.exports = {
 getSignup: getSignup,
 getLogin: getLogin
}
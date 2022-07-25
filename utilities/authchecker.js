function checkAuth(req,res,next) {
    console.log(req.session.loggedin)
    if(req.session.loggedin == true)
        next();
    else 
        res.redirect('/login');
}
function checkAuthwithMessage(req,res,next) {
    console.log(req.session.loggedin)
    if(req.session.loggedin == true)
        next();
    else 
        res.send(403);
}
function checkAuthwithMessage_(req,res,next) {
    console.log(req.session.loggedin)
    if(req.session.loggedin == true)
        next();
    else 
        res.send([{username : false}]);
}
module.exports = {checkAuth,checkAuthwithMessage,checkAuthwithMessage_}
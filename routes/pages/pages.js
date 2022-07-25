const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/pages/:route',(req,res)=>{
    console.log()
    if(req.params.route == "signup")
        res.sendFile(dirname+'/public/register.html');
    else if(req.params.route == "seeanswer")
        res.sendFile(dirname + '/public/answer.html');
    else if(req.params.route == "fileupload")
        res.sendFile(dirname + '/FileUpload.html');
    else if(req.params.route == "verify")
        res.sendFile(dirname + '/public/verification.html');
    else if(req.params.route == "login")
        res.sendFile(path.join(dirname + '/public/login.html'));
    else if(req.params.route =='logout'){
        req.session.destroy();
        res.redirect('/');
    }
    else 
        res.sendFile(dirname+'/public/404.html')
});
module.exports = router;
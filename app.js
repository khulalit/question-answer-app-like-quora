const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');
const fileUpload = require('express-fileupload');
const transporter = require('./utilities/nodemailer')
const pages = require('./routes/pages/pages')
const auth = require('./routes/apis/auth')
const postquestion = require('./routes/apis/question')
const getroutes = require('./routes/apis/getroutes')
const uploadroute = require('./routes/apis/uploadroute')
const connection = require('./database/dbconfig')
const updateAns = require('./routes/apis/updateAns')
const deleteroute = require('./routes/apis/delete')
const {checkAuth, checkAuthwithMessage, checkAuthwithMessage_} = require('./utilities/authchecker')
// setting up global dirname so that it cant always point to root
global.dirname = __dirname;
// compaare

// app instance
const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public/static')));
app.use(express.static(path.join(__dirname, '/uploads/images')));
app.use(fileUpload())
app.use(auth)
app.use(pages)
app.use(postquestion)
app.use(uploadroute)
app.use(deleteroute)
app.use(getroutes)
app.use(updateAns)


function validatepass(req,res,next) {
    let password = req.body.password;
    const passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    // console.log(password)
    if(!passregex.test(password))
        return res.send("password must be of length 8 and must have atleast upercase letter and one special char")
    next()
}
function uniqueemail(req,res,next) {
    console.log("unique  email")
    console.log(req.body)
    connection.query("select username from accounts where email = ?",[req.body.email],(err,result,fields)=>{
        if(err)
            console.log(err);
        if(result.length === 0){
            console.log("Going to next")
            next();
        }
        else 
            res.send({status : false , message : "Email has aleady taken"});
    });
}
app.post('/register',validatepass,(req,res)=>{
    // console.log("hit here")
    const password = req.body.password
    const code = req.body.code
    const email = req.session.email
    const name = req.body.username
    console.log(req.body)
    console.log(email)
    if(req.session.vericode == code)
    bcrypt.hash(password, 10, function(err, hash) {
        // Store hash in your password DB.
        connection.query("insert into accounts(username,email,password,cover) values( ? , ? , ?, ?);",[name,email,hash,"no"],function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error){
                console.log(error);
                // res.sendStatus(500);
            }
            // If the account exists
            else {
                // req.session.destroy()
                console.log(results.insertId)
                req.session.userid = results.insertId
                res.redirect('/pages/fileupload')
            }
        });
    });
    else res.send("Your email verification is falid ")
});
app.post('/verifyemail',uniqueemail,(req,res)=>{
    console.log("verifying email")
    const random = Math.floor(1000 + Math.random() * 9000);
    transporter.sendMail({
        from: '"Admin do-not reply" <lalitkhudhania2@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Welcome!',
        template: 'email', // the name of the template file i.e email.handlebars
        context:{
            name: "QNA", // replace {{name}} with Adebola
            company: 'Qna' // replace {{company}} with My Company
        },
        text : "Your verification code is : "+random
    },(err,respn)=>{
        if(err)
            res.send("Your email is not valid or something went wrong.")
        console.log("email verified")
        req.session.vericode = random
        req.session.email = req.body.email
        res.send({status : true, message : "Your verification code has been sent to your email id please proceed "})
    })
    
});
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/public/index.html'));
    
});

app.post('/api/answer/:qid',checkAuthwithMessage,(req,res)=>{
    const userid = req.session.userid;
    const qid = req.params.qid;
    connection.query("insert into ans(content,qid,uid) values(?,?,?);",[req.body.answer,qid,userid],function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error){
            console.log(err);
            res.sendStatus(500);
        };
        // If the account exists
        res.redirect('/');
    });
});

app.get('*',(req,res)=>{
    res.sendFile(__dirname+'/public/404.html')
})
app.listen(3000,()=>{
    console.log("listenisng");
});
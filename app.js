const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'qna'
});
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public/static')));


// function to check auth
function checkAuth(req,res,next) {
    if(req.session.loggedin == true)
        next();
    else 
        res.redirect('/login');
}
function checkAuthwithMessage(req,res,next) {
    if(req.session.loggedin == true)
        next();
    else 
        res.send(403);
}
//
function queryget() {
    connection.query(select )
}

// http://localhost:3000/
app.get('/login', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/public/login.html'));
});
// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
                request.session.userid = results[0].id
                
				// Redirect to home page
				response.redirect('/');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/question',checkAuthwithMessage,(req,res)=>{
    const userid = req.session.userid;

    connection.query("insert into ques(content,created_by) values( ? , ?);",[req.body.question,userid],function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error){
            console.log(err);
            res.sendStatus(500);
        };
        // If the account exists
        res.redirect('/');
    });
});
app.post('/register',(req,res)=>{
    connection.query("select username,email from accounts where username = ? or email = ?",[req.body.username,req.body.email],(err,result,fields)=>{
        if(err)
            throw error;
        if(result.length === 0)
        connection.query("insert into ques(content,created_by) values( ? , ?);",[req.body.username,userid],function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error){
                console.log(err);
                res.sendStatus(500);
            };
            // If the account exists
            res.redirect('/');
        });
        else 
            res.send("username of email already taken");
    });
});
app.get('/home',checkAuth,(req,res)=>{
    res.send("This is home");
});
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/public/index.html'));
    
});
app.get('/api/questions',(req,res)=>{
    connection.query("select content , username, ques.id from ques, accounts where ques.created_by = accounts.id;",(err,result,fields)=>{
        if(err)
            res.send(500);
        if(result.length>0){
            res.send(result)
        }
        else
            res.send("Nothing here help post quesiton ")
    });
});
app.get('/api/answer/:id',(req,res)=>{
    connection.query("select content from ans where qid = ?;",[req.params.id],(err,result,fields)=>{
        if(err)
            res.send(500);
        if(result.length>0){
            console.log(result);
            res.send(result)
        }
        else
            res.send("Nothing here help post quesiton ")
    });
});
app.get('/api/qa',checkAuthwithMessage,(req,res)=>{
    connection.query('select ques.content as "ques", ans.content as "ans" from ques right join ans on ques.id = ans.qid where ans.uid = ?',[req.session.userid],(err,result,fields)=>{
        if(err){
            res.send(500);
            // console.log(err)
        }
        if(result.length>0){
            res.send(result);
        }
        else
            res.send("nothing")
    });

});
app.get('/api/q',checkAuthwithMessage,(req,res)=>{
    if(typeof req.session.userid != 'undefined' )
    connection.query('select ques.content as "question" from ques where ques.created_by = ?',[req.session.userid],(err,result,fields)=>{
        if(err){
            console.log(err)
            return res.send(500);
            // console.log(err)
        }
        if(result){
            res.send(result);
        }
        else
            res.send("nothing")
    });
    else
        res.send({message : "login"});
    // res.send("uid");
});
//
app.get('/userinfo',checkAuth,(req,res)=>{
        connection.query('select id, username, email from accounts where id = ?',[req.session.userid],(err,result,fields)=>{
            if(err)
                return res.send(500)
            if(result.length > 0)
                return res.send(result);
            else
                return res.send("nothing");
        })
});
//
app.get('/profile',checkAuthwithMessage,(req,res)=>{
    res.sendFile(path.join(__dirname + '/public/profile.html'));
});
app.get('/:route',(req,res)=>{
    if(req.params.route == "register")
        res.sendFile(path.join(__dirname + '/public/register.html'));
    else if(req.params.route == "seeanswer")
        res.sendFile(path.join(__dirname + '/public/answer.html'));
    else if(req.params.route =='logout'){
        req.session.destroy();
        res.redirect('/login');
    }
    else
        res.send("404 No whare to go")
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


app.listen(3000,()=>{
    console.log("listenisng");
});
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../../database/dbconfig')
// compare bcrypt method
async function compareBcryptPassword(password, hash) {
    const match = await bcrypt.compare(password, hash);
    return match;
}

router.post('/auth', function(request, response) {
	let email = request.body.email;
	let password = request.body.password;
    console.log(email)
	if (email && password) {
		
		connection.query('SELECT id,username,password FROM accounts WHERE email = ? ', [email], async function(error, results, fields) {
            console.log(results[0].password)
			if (error) res.sendStatus(500);
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
                console.log(results)
                const match = await compareBcryptPassword(password,results[0].password)
                if(match) {
                    request.session.loggedin = true;
                    request.session.userid = results[0].id;
                    request.session.username = results[0].username;
                    response.redirect('/');

                }
                else{
                    response.send("Wrong password");
                }
			} else {
				response.send('Incorrect Username');
			}			
		});
	} else {
		response.send('Cannot Send Black Post request');
	}
});

module.exports = router;
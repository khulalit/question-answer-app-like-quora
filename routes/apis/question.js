const express = require('express');
const router = express.Router()
const connection = require('../../database/dbconfig')
const {checkAuth, checkAuthwithMessage, checkAuthwithMessage_} = require('../../utilities/authchecker')

router.post('/question',checkAuthwithMessage,(req,res)=>{
    const userid = req.session.userid;

    connection.query("insert into ques(content,created_by) values( ? , ?);",[req.body.question,userid],function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error){
            console.log(error);
            res.sendStatus(500);
        }
        // If the account exists
        else res.redirect('/');
    });
});
module.exports = router
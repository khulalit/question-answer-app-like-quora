const express = require('express')
const router = express.Router();
const connection = require('../../database/dbconfig')
const path = require('path')
const {checkAuth, checkAuthwithMessage, checkAuthwithMessage_} = require('../../utilities/authchecker')

router.post('/api/update/ans',checkAuth,(req,res)=>{
    const userid = req.session.userid;
    const content = req.body.answer;
    const ansid = req.body.ansid
    console.log(req.body)
    connection.query('update ans set content = ? where id = ?',[content,ansid],(err,results,fields)=>{
        if(err)
            res.send(500)
        else {
            res.send("ok")
        }
    });
})

module.exports = router;
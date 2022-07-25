const express = require('express');
const router = express.Router();
const connection = require('../../database/dbconfig')
const path = require('path')
const {checkAuth, checkAuthwithMessage, checkAuthwithMessage_} = require('../../utilities/authchecker')

router.get('/delete/question/:id',checkAuth,(req,res)=>{
    let qid = req.params.id
    console.log(qid)
    connection.query('delete from ques where id = ?',[qid],(err,results,fields)=>{
        if(err)
            res.sendStatus(500)
        else 
            res.send({message : "ok"})
    });
});
router.get('/delete/ans/:id',checkAuth,(req,res)=>{
    let aid = req.params.id
    console.log(aid)
    connection.query('delete from ans where id = ?',[aid],(err,results,fields)=>{
        if(err)
            res.sendStatus(500)
        else 
            res.send({message : "ok"})
    });
});

module.exports = router;
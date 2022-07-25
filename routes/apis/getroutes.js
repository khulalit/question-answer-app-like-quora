const express = require('express');
const router = express.Router();
const connection = require('../../database/dbconfig')
const path = require('path')
const {checkAuth, checkAuthwithMessage, checkAuthwithMessage_} = require('../../utilities/authchecker')

router.get('/api/questions',(req,res)=>{
    connection.query("select content ,cover, username, ques.id, accounts.id as 'uid' from ques, accounts where ques.created_by = accounts.id",(err,result,fields)=>{
        if(err)
            res.send(500);
        if(result.length>0){
            res.send(result)
        }
        else
            res.send("Nothing here help post quesiton ")
    });
});
router.get('/api/answer/:id',(req,res)=>{
    connection.query("select username,content,ans.id as 'id' from accounts , ans where qid = ? and accounts.id = ans.uid limit 20;",[req.params.id],(err,result,fields)=>{
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
router.get('/api/qa',checkAuthwithMessage,(req,res)=>{
    connection.query('select ans.id as "id" ,ques.content as "ques", ans.content as "ans" from ques right join ans on ques.id = ans.qid where ans.uid = ?',[req.session.userid],(err,result,fields)=>{
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
router.get('/api/q',checkAuthwithMessage,(req,res)=>{
    if(typeof req.session.userid != 'undefined' )
    connection.query('select id , ques.content as "question" from ques where ques.created_by = ?',[req.session.userid],(err,result,fields)=>{
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
router.get('/userinfo',checkAuthwithMessage_,(req,res)=>{
    console.log(req.session.userid)
    connection.query('select id, username, email,cover from accounts where id = ?',[req.session.userid],(err,result,fields)=>{
        if(err)
            res.send(500)
        if(result.length > 0){
            console.log(result)
            res.send(result);
        }
        else{
            res.send({
                username : "no user"
            })
        }
    })
});
//
router.get('/p/profile',checkAuthwithMessage,(req,res)=>{
    res.sendFile(path.join(dirname + '/public/profile.html'));
});


module.exports = router;
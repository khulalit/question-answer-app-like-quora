const express = require('express');
const router = express.Router();
const connection = require('../../database/dbconfig')

router.post('/upload',(req,res)=>{
    console.log(req.session.userid)
    const file = req.files.image
    const userid = req.session.userid
    file.mv(dirname+'/uploads/images/'+userid+'.jpeg',err=>{
        if(err)
            res.send(500)
        else{
            connection.query("update accounts set cover = 'yes' where id = ?",[userid],(err,results,fields)=>{
                if(err)
                    res.send(500)
                else{
                    
                    res.redirect("/pages/login")
                }
            })
        }
    })
})
module.exports = router; 
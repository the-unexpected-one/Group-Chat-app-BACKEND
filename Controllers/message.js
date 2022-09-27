
const User= require('../models/chatUsers');

const Message=require('../models/messages')
const jwt=require('jsonwebtoken')


const bcrypt=require('bcrypt');

exports.postMessages=(req,res,next)=>{
    const message1=req.body.message;
    console.log(req.user.name);
    const name1=req.user.name;
    const token=req.header('Authorization');
        console.log(token);
    const user=jwt.verify(token, '987654321ghijklmn')
    const userId=user.userId;
    console.log(userId)
    Message.create({
name:name1,
message:message1,
chatuserId:userId

    }).then(result=>{
        // res.json(name)
        console.log('Message Sent');
        // res.redirect('/expenses')
       
    }).catch(err=>{
        console.log(err)
    })
}


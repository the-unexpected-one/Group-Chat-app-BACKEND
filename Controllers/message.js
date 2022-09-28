
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
        res.json(result)
        // res.redirect('/expenses')
       
    }).catch(err=>{
        console.log(err)
    })
}

exports.getMessages=(req,res,next)=>{
console.log(req)
    console.log('1')
    Message.findAll()
    .then(messages=>{
        
        console.log(req.params.query)
       if(req.params.query=='abc'){
        
        res.json({messages:messages})
       }
       else{
        const arr=[]
        for(let i=0;i<messages.length;i++){
            if(messages[i].id>req.params.query){
                console.log('1234')
                arr.push(messages[i])
            }
        }
        // }console.log(messages)
        console.log(arr)
        res.json({messages:arr})
       }
    }).catch(err=>{
        console.log(err)
    })
}


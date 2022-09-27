const jwt=require('jsonwebtoken');
const User=require('../models/chatUsers');

exports.authenticate=async (req,res,next)=>{

    try{
        const token=req.header('Authorization');
        console.log(token);
    const user=jwt.verify(token, '987654321ghijklmn')
    console.log(user.userId);
    User.findByPk(user.userId).then(user=>{
        req.user=user;
        console.log(user)
        next();
    }).catch(err=>{throw new Error(err)})
     
    } catch(err){
        console.log(err);
  console.log('hello')

        return res.status(401).json({success:false})
    }
}
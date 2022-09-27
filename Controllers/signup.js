
const User= require('../models/chatUsers');
const jwt=require('jsonwebtoken')


const bcrypt=require('bcrypt');
exports.postSignUp=async (req,res,next)=>{
    
    const username = req.body.name;
    const email = req.body.emailid;
    const phonenumber=req.body.phonenumber;
    const password = req.body.password;
    try {
    
   let user = await User.findAll({where:{emailid:email}})
   
      if (user.length > 0){ 
        console.log("User exists")
        return res.status(404).json({success:false, message:'User exists'})

      }
      
      //console.log(user[0].email)
      
      
    }
  
    
      catch(err){
        console.log(err)
        return res.status(406).json({success:false, message:'User logged in'})

        
      }
      
   
    const saltround = 8
    bcrypt.hash(password,saltround,(err,hash) => {
      
      console.log("first runned")
      User
      .create({
          name: username,
          emailid: email,
          phonenumber:phonenumber,
          password: hash,
          
        })
        .then(result => {
          res.status(200).json({message :"User Created"})
      
          console.log('Created ChatUser');
      })
        .catch(err => {
          console.log(err);
          console.log('hello')
        });
        

    })
   
  };


  

exports.login=(req,res,next)=>{
  const email=req.body.emailid;
  const password=req.body.password;
  User.findAll({where:{emailid:email}}).then((user)=>{
      bcrypt.compare(password,user[0].password,(err,result)=>{
          
          if(result==true){
          
              res.status(200).json({success:true, message:'User Login Succesfull',token: generateAccessToken(user[0].id,user[0].name)}) 
          }
          else{
              res.status(401).json({success:false, message:'User not authorised'})
          }
      })
      // if(user[0].password==pass){
      //     res.status(200).json({success:true, message:'User Login Succesfull'}) 
      // }
      // else{
      //     res.status(401).json({success:false, message:'User not authorised'})
      // }
      // console.log('1')
  }).catch(err=>{
      res.status(404).json({success:false, message:'User not found'})
  })
      res.status(200)
  }
  
  function generateAccessToken(id,name){
    return jwt.sign({userId:id,name:name},'987654321ghijklmn')
  }
 
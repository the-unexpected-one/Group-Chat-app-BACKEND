const User= require('../models/chatUsers');

const Message=require('../models/messages');

const Group=require('../models/group');
const groupUsers=require('../models/groupUser');
const { response } = require('express');


exports.creategroup=(req,res,next)=>{
    const groupname=req.body.groupname;
    Group.create({
        groupname:groupname,
    }).then(result=>{
        console.log(result,'3434')
        const groupid=result.id

        console.log('Group Created');
        const userId=req.user.id
        console.log(userId)
groupUsers.create({
    groupuserId:userId,
    groupId:groupid,
    admin:true

}).then(response=>{
    console.log(response,'7878788')
}).catch(err=>{console.log(err)})
        
        res.json(result)
    }).catch(err=>{
        console.log(err)
    })
}

// exports.getgroupname=(req,res,next)=>{
//     Group.findAll()
//     .then(groups=>{
//         console.log(groups.group.id,'23233');
//         res.json(groups);
//     }).catch(err=>{
//         console.log(err)
//     })

// }
exports.addmember=(req,res,next)=>{
   User.findAll()
   .then(users=>{
    res.json(users)
   }).catch(err=>{
    console.log(err)
   })
}

exports.addmembertogroup=(req,res,next)=>{
    const userId=req.body.userid;
    const groupid=req.body.groupid
    groupUsers.create({
        groupuserId:userId,
        groupId:groupid
    }).then(response=>{
        // console.log(response)
        res.json(response)
    }).catch(err=>{
        console.log(err)
    })

}

exports.displaygroupnames=async(req,res,next)=>{
    console.log('Hello world')
    let arr = []

    console.log(req)
    const a = req.user
    console.log(a.id)
    let result = await groupUsers.findAll({where:{groupuserId:a.id}})
   
    for(let i=0;i<result.length;i++){

            let values = await Group.findByPk(result[i].groupId)
            arr.push(values)
                

            

        }
        res.json({groupname:arr})
        console.log(arr)
   
}

exports.getgroupchats=async(req,res,next)=>{
    try{
        console.log(req,'999999')
        const groupid=req.params.groupid;
        console.log(groupid)
        const messages=await Message.findByPk(groupid)
        res.json(messages)
    
    }catch(err){
console.log(err)
    }

 
}

exports.makeadmin=async(req,res,next)=>{
    let arr=[]
    console.log(req.params.groupid,'44444444')
    const user=req.user.id;

    console.log(user,'ghghghg')
    let confirm=0;
    

    const response=await groupUsers.findAll({where:{groupId:req.params.groupid}})
    for(let j=0;j<response.length;j++){
        if(response[j].groupuserId==req.user.id&&response[j].admin==true){
            confirm=confirm+1
        }
    }
 if(confirm==1){
    for(let i=0;i<response.length;i++){
            
        const variable=  await User.findByPk(response[i].groupuserId);
        arr.push(variable)

  }
  res.json({members:arr})
 }
 else{
    res.json('YOU ARE NOT AN ADMIN')
 }
 
        
    // catch(err=>{
    //     console.log(err)
    // })

}

exports.postmakeadmin=async(req,res,next)=>{
   try{
    const userid=req.body.userid;
    const groupid=req.body.groupid;
    const response=await groupUsers.findAll({where:{groupuserId:userid,groupId:groupid}})
    response[0].update({admin:true})
}
    catch(err){
console.log(err)
    }
}

exports.removeuser=async(req,res,next)=>{   
const userid=req.header('userid');
const groupid=req.header('groupid')
   const user=  await groupUsers.findAll({where:{groupuserId:userid,groupId:groupid}})
   user[0].destroy();
   console.log('DELETED')
}
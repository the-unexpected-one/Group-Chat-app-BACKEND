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
    groupId:groupid

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
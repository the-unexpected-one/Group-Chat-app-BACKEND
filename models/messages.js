const Sequelize=require('sequelize');
// console.log('hello')

const sequelize=require('../util/database.js')

const messages=sequelize.define('message',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    
    message:Sequelize.STRING,

})
module.exports=messages;
const Sequelize=require('sequelize');
// console.log('hello')

const sequelize=require('../util/database.js')

const group=sequelize.define('group',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    groupname:{
type:Sequelize.STRING,
unique:true
    } 

    
});

module.exports=group;
const Sequelize=require('sequelize');

const sequelize=require('../util/database.js')

const chatUser=sequelize.define('chatuser',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name: Sequelize.STRING,
    emailid:{
        type:Sequelize.STRING,
        unique:true,
        // primaryKey:true
    },
    phonenumber:{
        type:Sequelize.INTEGER,
        unique:true
    },
    password:Sequelize.STRING,
    
});

module.exports=chatUser;
const Sequelize=require('sequelize');
// console.log('hello')

const sequelize=require('../util/database.js')
const groupuser=sequelize.define('groupuser',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    

    
});

module.exports=groupuser;
const path = require('path');
const sequelize=require('./util/database')
const express = require('express');

const app = express();
const cors=require('cors')
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
const chatUsers=require('./models/chatUsers')
const messages=require('./models/messages')
app.use(cors())

const signup=require('./routes/signup')
const message=require('./routes/message')
// console.log('hello')
chatUsers.hasMany(messages)
messages.belongsTo(chatUsers)
app.use(signup)

app.use(message)

sequelize
.sync()
.then(()=>{
    app.listen(8000)
}).catch(err=>{
    console.log(err)
})

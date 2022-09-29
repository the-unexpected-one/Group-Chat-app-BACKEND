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
const groups=require('./models/group')
const groupUser=require('./models/groupUser')
app.use(cors())

const signup=require('./routes/signup')
const message=require('./routes/message')
const group=require('./routes/group')
// console.log('hello')
chatUsers.hasMany(messages)
messages.belongsTo(chatUsers)

groupUser.belongsToMany(groups,{through:groupUser});
groups.belongsToMany(groupUser,{through:groupUser});

groups.hasMany(messages)
messages.belongsTo(groups)




app.use(signup)

app.use(message)

app.use(group)

sequelize
.sync()
.then(()=>{
    app.listen(8000)
}).catch(err=>{
    console.log(err)
})

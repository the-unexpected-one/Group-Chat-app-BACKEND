const path = require('path');
const sequelize=require('./util/database')
const express = require('express');

const app = express();
const cors=require('cors')
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
const chatUsers=require('./models/chatUsers')
app.use(cors())

const signup=require('./routes/signup')

app.use(signup)

sequelize
.sync()
.then(()=>{
    app.listen(8000)
}).catch(err=>{
    console.log(err)
})

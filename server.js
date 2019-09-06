    
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
  } 
const express= require('express');
const app=express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");

const indexRouter=require('./routes/index');
const dataRouter = require('./routes/data-element');


app.use(bodyParser.json({  extended: true }));
app.set('view engine', 'ejs');
app.set('views',__dirname +'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error',()=>{
    console.log('connection error123')
  } );
  db.once('open',  ()=> {
    console.log('succes connected Mongoose');
  });

app.use('/', indexRouter)
app.use('/data',dataRouter)
app.use(bodyParser.json()); //application/json

app.listen(process.env.PORT||3000)
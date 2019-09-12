    
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
  } 
const express= require('express');
const app=express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");

const indexRouter=require('./routes/index');
const dataRouter = require('./routes/data-element');
const viewRouter=require('./routes/view');
const commentRouter=require('./routes/comment');
const evolutionRouter=require('./routes/evolution');
const versionRouter=require('./routes/version');

app.use(bodyParser.json({  extended: true }));
app.set('view engine', 'ejs');
app.set('views',__dirname +'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT,PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next();
})

const mongoose=require('mongoose');
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error',()=>{
    console.log('connection error');
  } );
  db.once('open',  ()=> {
    console.log('succes connected Mongoose');
  });

app.use('/', indexRouter);
app.use('/data',dataRouter);
app.use('/view',viewRouter);
app.use('/comment',commentRouter);
app.use('/evolution',evolutionRouter);
app.use('/version',versionRouter);

app.use(bodyParser.json()); //application/json

app.listen(process.env.PORT||3000)
    
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
  } 
const express= require('express');
const app=express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");

const indexRouter=require('./routes/index');
 
const viewRouter=require('./routes/view');
const historyRouter=require('./routes/history'); 
const versionRouter=require('./routes/version');
const comparisonRouter=require('./routes/comparison');
const authRouter=require('./routes/auth');
const projectRouter=require('./routes/project');
//app.use(bodyParser.json({  extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
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
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error',()=>{
    console.log('connection error');
  } );
  db.once('open',  ()=> {
    console.log('succes connected Mongoose');
  });

app.use('/', indexRouter);
 
app.use('/view',viewRouter);
app.use('/history',historyRouter); 
app.use('/project/version',versionRouter);
app.use('/comparison',comparisonRouter);
app.use(authRouter);
app.use('/project',projectRouter);
app.use(bodyParser.json()); //application/json

app.listen(process.env.PORT||3000)
    
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
  } 
const express= require('express');
const app=express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");
const mongoose=require('mongoose');
const session=require('express-session');
const indexRouter=require('./routes/index');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf= require('csurf')

const viewRouter=require('./routes/view');
const historyRouter=require('./routes/history'); 
const versionRouter=require('./routes/version');

const authRouter=require('./routes/auth');
const projectRouter=require('./routes/project');

//API
const authAPIRouter=require('./api/routes/auth');
const projectAPIRouter=require('./api/routes/project');
const comparisonAPIRouter=require('./api/routes/comparison');
const userAPIRouter=require('./api/routes/user');
const commentAPIRouter=require('./api/routes/comment')
const historyAPIRouter=require('./api/routes/history'); 

const store = new MongoDBStore({
  uri:process.env.DATABASE_URL,
  collection:'sessions'
} );
const csrfProtection=csrf({})


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
app.use(
  session({
    secret:'my secret',
    resave:false,
    saveUninitialized:false,
    store:store 
    }));
 //app.use(csrfProtection);

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

app.use(bodyParser.json()); //application/json
app.use('/', indexRouter);
 
app.use('/view',viewRouter);
app.use('/history',historyRouter); 
app.use('/project/version',versionRouter);

app.use(authRouter);
app.use('/project',projectRouter);

//API
app.use('/api/comparison',comparisonAPIRouter);
app.use('/api',authAPIRouter);
app.use('/api/project',projectAPIRouter);
app.use('/api/history',historyAPIRouter); 
app.use('/api/user',userAPIRouter);
app.use('/api/comment',commentAPIRouter);

app.listen(process.env.PORT||3000)
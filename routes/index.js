const express = require('express');
const router = express.Router();
const isAuth= require('../middleware/is-auth')

router.get('/',isAuth,(req,res)=>{
    
    res.render('index')
})

module.exports= router;
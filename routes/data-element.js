const express = require('express');
const router = express.Router();

const itemsModel = require('../models/data');

router.get('/',(req,res)=>{
    res.render('index')
})

module.exports= router;
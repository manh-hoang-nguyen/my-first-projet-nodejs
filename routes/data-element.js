const express = require('express');
const router = express.Router();
const data=require('../models/data')

const itemsModel = require('../models/data');

router.get('/',(req,res)=>{
   data.find({}).then((items)=>{
    console.log(items);
    res.render('datas/data',{
        items
    })
   }) 
})

module.exports= router;
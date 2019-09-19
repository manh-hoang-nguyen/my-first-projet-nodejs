const mongoose = require('mongoose');
 
const evolutionSchema=new mongoose.Schema( {
    guid:{
        type:String,
        required:true,
        ref:'Data'
    },
    comments:[{
        v:{type:int,  required:true},
        auteur:{ type:String,  required:true },
        content:{  type:String, required:true },
        datetime: Date}]
},
{timestamps:true} );

module.exports=mongoose.model('Evolution',evolutionSchema)
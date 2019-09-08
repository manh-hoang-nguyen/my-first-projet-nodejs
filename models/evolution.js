const mongoose = require('mongoose');
 
const evolutionSchema=new mongoose.Schema( {
    dataId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Data'
    },
    comments:[{
        auteur:{ type:String,  required:true },
        content:{  type:String, required:true },
        datetime: Date}]
},
{timestamps:true} );

module.exports=mongoose.model('Evolution',evolutionSchema)
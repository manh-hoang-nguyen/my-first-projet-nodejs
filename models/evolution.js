const mongoose = require('mongoose');
 
const evolutionSchema=new mongoose.Schema( {
    dataId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Data'
    },
    comment:[{
        auteur:{ type:String,  required:true },
        content:{  type:String, required:true },
        datetime:new Date()}]
} );

module.exports=mongoose.model('Comment',evolutionSchema)
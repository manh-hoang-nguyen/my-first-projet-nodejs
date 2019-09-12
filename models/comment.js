const mongoose = require('mongoose');
 
const commentSchema=new mongoose.Schema( {
    guid:{
        type:String,
        required:true,
        ref:'Data'
    },
    comments:[{
        auteur:{ type:String,  required:true },
        content:{  type:String, required:true },
        datetime: Date}]
},
{timestamps:true} );

module.exports=mongoose.model('Comment',commentSchema)
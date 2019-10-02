var mongoose = require('mongoose');
  
var schema =  mongoose.Schema( {
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'project'
    },
    guid:{
        type:String,
        required:true,
        ref:'Data'
    },
    status: {    type: String  },
    modifications:[{
            v:{type:Number},
            auteur:{ type:String,  required:true },
            comment:{  type:String, required:true },
            datetime: {type:Date, default:Date.now}}],
       
    comments:[{
            auteur:{ type:String,  required:true },
            comment:{  type:String, required:true },
            datetime: {type:Date, default:Date.now}}]
  
},
{timestamps:true});

module.exports = mongoose.model('history',schema)
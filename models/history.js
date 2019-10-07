var mongoose = require('mongoose');
  
var schema =  mongoose.Schema( {
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Project'
    },
    guid:{
        type:String,
        required:true,
        ref:'Data'
    },
    
    modifications:[{
            v:{type:Number},
            author:{ type:String,  required:true },
            comment:{  type:String, required:true },
            datetime: {type:Date, default:Date.now}}],
       
    comments:[{
            authorId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
            authorName:{ type:String,  required:true },
            comment:{  type:String, required:true },
            datetime: {type:Date, default:Date.now}}]
  
},
{timestamps:true});
schema.index({projectId:1}); //define index
module.exports = mongoose.model('history',schema)
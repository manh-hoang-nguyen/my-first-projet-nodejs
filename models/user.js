var mongoose = require('mongoose');
  

var schema =  mongoose.Schema({
  
    mail:{type:String, require:true},
    password:{type:String,require:true},
    name:{
        firstName:{type:String,require:true},
        lastName:{type:String,require:true}
    },
    status:{type:String},
    projects:[{projectId:{type: mongoose.Schema.Types.ObjectId, ref:'project'}}]
   
   
},{timestamps:true} )

module.exports = mongoose.model('user',schema);
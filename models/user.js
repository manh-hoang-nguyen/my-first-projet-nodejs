var mongoose = require('mongoose');
  

var schema =  mongoose.Schema({
  
    email:{type:String, require:true},
    password:{type:String,require:true},
    name:{
        firstName:{type:String,require:true},
        lastName:{type:String,require:true}
    },
    status:{type:String},
    projects:[{
        projectId:{type: mongoose.Schema.Types.ObjectId, ref:'Project'},
        projectName:{type:String,require:true}        
            }]
   
   
},{timestamps:true} )

module.exports = mongoose.model('user',schema);
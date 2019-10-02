var mongoose = require('mongoose');
  

var schema =  mongoose.Schema({
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'project'
    },
    version:[
       { v:{type:Number,require:true},
        auteur:{ type: String,  require:true  },
        comment:{  type:String, require:true }
        }
    ]
   
   
},{timestamps:true} )

module.exports = mongoose.model('version',schema);
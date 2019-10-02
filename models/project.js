var mongoose = require('mongoose');
  
var schema =  mongoose.Schema( {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name:{
        type:String,
        required:true 
    },
    version:[
       { v:{type:Number,require:true},
        createdBy:{ type: String,  require:true  },
        comment:{  type:String, require:true }
        }
    ],
    owner: {
                    type:mongoose.Schema.Types.ObjectId,
                    require:true,
                    ref:'user'
            },
    guest:[{user:{type:mongoose.Schema.Types.ObjectId}}] 
},
{timestamps:true});

module.exports = mongoose.model('project',schema)
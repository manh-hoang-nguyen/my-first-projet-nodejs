var mongoose = require('mongoose');
  
var schema =  mongoose.Schema( {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name:{
        type:String,
        required:true 
    },
    owner: {
                    type:mongoose.Schema.Types.ObjectId,
                    require:true,
                    ref:'User'
            },
    guest:[{user:{type:mongoose.Schema.Types.ObjectId}}] ,
    version:[
       { v:{type:Number,require:true},
        createdBy:{ type: String,  require:true  },
        comment:{  type:String, require:true }
        }
    ]
},
{timestamps:true});

schema.index({owner:1,name:1}); //define index

module.exports = mongoose.model('project',schema)
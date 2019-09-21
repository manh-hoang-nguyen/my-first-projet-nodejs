var mongoose = require('mongoose');
  

var schema =  mongoose.Schema( 
     
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    guid:{ type: String,require:true},
    elementId: {  type: String },
    identifiant:{type:String},
    level: {   type: String }, 
    category: {  type: String  },
    name: {  type: String },
    metadata:[{ 
                v:{type:Number},   
                volume: {  type: String },
                surface: {  type: String }              
    }] 
   
  },
  {timestamps:true});
  module.exports = mongoose.model('property',schema)

 
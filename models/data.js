var mongoose = require('mongoose');
  

var schema =  mongoose.Schema( 
     
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    guid:{ type: String,require:true},
    elementId: {  type: String },
    level: {   type: String },
    status: {    type: String  },
    category: {  type: String  },
    name: {  type: String },
    volume: {  type: String },
    surface: {  type: String },
   
    typeId: { type: String },
    solidVolume: Number,
    location: { LocationType: { type: String },
                Location_point01: { X: Number, Y: Number, Z: Number },
                Location_point02: { X:Number, Y: Number,  Z: Number} },
    boundingBox: {  status: { type: String },
                    BoundingBox_point01: { X: Number,  Y:Number, Z:Number },
                    BoundingBox_point02: { X: Number,  Y: Number, Z: Number  } },
    centroidElement: {  status: { type: String  }, 
                        centroid: {  X: Number,  Y:Number,  Z: Number  } } ,
    
    urlImage:{  type: mongoose.Schema.Types.ObjectId } ,
    bb_sectionBox_min: { X: Number, Y: Number, Z: Number },

    bb_sectionBox_max: { X: Number, Y: Number, Z: Number  },

    eyePosition: { X: Number, Y: Number, Z: Number },

    forwardDirection: { X: Number, Y: Number,Z: Number },

    upDirection: { X: Number, Y: Number,  Z: Number    }
     
    
  },
  {timestamps:true});
  module.exports = mongoose.model('Test',schema)

 
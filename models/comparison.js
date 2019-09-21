var mongoose = require('mongoose');
  
var schema =  mongoose.Schema( {
    guid:{
        type:String,
        required:true
        
    },
    data:[{
            v:{type:Number,  required:true},
            typeId: { type: String },
            solidVolume: Number,
            location:         { LocationType: { type: String },
                            Location_point01: { X: Number, Y: Number, Z: Number },
                            Location_point02: { X:Number, Y: Number,  Z: Number} },
            boundingBox: {  status: { type: String },
                            BoundingBox_point01: { X: Number,  Y:Number, Z:Number },
                            BoundingBox_point02: { X: Number,  Y: Number, Z: Number  } },
            centroidElement: {  status: { type: String  }, 
                                centroid: {  X: Number,  Y:Number,  Z: Number  } } 

        }]
},
{timestamps:true});

module.exports = mongoose.model('comparison',schema)
const mongoose = require('mongoose');
 
const viewSchema=new mongoose.Schema( {
    dataId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Data'
    },
    urlImage:{  type: mongoose.Schema.Types.ObjectId } ,
    bb_sectionBox_min: { X: Number, Y: Number, Z: Number },

    bb_sectionBox_max: { X: Number, Y: Number, Z: Number  },

    eyePosition: { X: Number, Y: Number, Z: Number },

    forwardDirection: { X: Number, Y: Number,Z: Number },

    upDirection: { X: Number, Y: Number,  Z: Number    }
},{timestamps:true} );

module.exports=mongoose.model('View',viewSchema)
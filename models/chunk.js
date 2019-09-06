var mongoose = require('mongoose');

var chunkSchema =  mongoose.Schema( {
    _id: {
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    file_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    n:{
        type:Number
    },
    binary:{
        data: Buffer 
    }
})
// chunkSchema.virtual('corverImagePath').get(function(){
//     if(this.binary !=null && this.coverImageType!= null){
//         return `data:charset=utf-8;base64,${this.binary.toString('base64')}`  
//     }})
module.exports = mongoose.model('fs.chunks',chunkSchema)
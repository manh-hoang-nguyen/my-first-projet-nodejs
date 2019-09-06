var mongoose = require('mongoose');
const Data=require('../models/data');
// const Evolution = require('../models/evolution')
exports.getData=(req,res,next)=>{
    Data.find({}).then((items)=>{
        console.log(items);
        res.render('datas/data',{
            items
        }) }) 

}

exports.getDataById= async(req,res,next)=>{
    const data = await  Data.findById(req.params.id); 
    res.json(data)
}

exports.deleteData = (req,res,next)=>{
    data.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.')).then(res.send('Delete succces'))
    .catch(err => res.status(400).json('Error: ' + err));
 
}

exports.postData=async(req,res,next)=>{
    const _id= mongoose.Types.ObjectId();
    const guid = req.body.guid;
    
    const elementId = req.body.elementId;
    const level= req.body.level;
    const status=req.body.status;
    const category=req.body.category; 
    const name=req.body.name;
    const volume=req.body.volume;
    const surface=req.body.surface;
    const typeId=req.body.typeId;
    const solidVolume=req.body.solidVolume;

     const location=req.body.location;
     
    const boundingBox=req.body.boundingBox;
    const centroidElement=req.body.centroidElement;

    const urlImage = mongoose.Types.ObjectId(req.body.urlImage);
     
    const bb_sectionBox_min=req.body.bb_sectionBox_min;
    const bb_sectionBox_max=req.body.bb_sectionBox_max;
    const eyePosition=req.body.eyePosition;
    const forwardDirection=req.body.forwardDirection;
    const upDirection=req.body.upDirection;

    const newData = await new Data({
      
     _id, guid,elementId,level,status,category,name,volume,surface ,typeId,
     solidVolume, location,boundingBox,centroidElement,urlImage,
     bb_sectionBox_min,bb_sectionBox_max,eyePosition,forwardDirection,upDirection
   });
   newData.save()
         .then(() => res.json(newData))
         .catch(err => res.status(400).json('Error: ' + err));
   
  
}

// function updateData(req,res,next){
   
//     const level= req.body.level; 
//     const category=req.body.category; 
//     const name=req.body.name;
//     const volume=req.body.volume;
//     const surface=req.body.surface;
//     const typeId=req.body.typeId;
//     const solidVolume=req.body.solidVolume;

//      const location=req.body.location;
     
//     const boundingBox=req.body.boundingBox;
//     const centroidElement=req.body.centroidElement;

//     const guid = req.body.guid;
//     if(Data.find({guid:guid}).countDocuments()===1){
//         Data.find({guid:guid}).then((data)=>{
//             data.level=level;
//             data.category=category;
//             data.name=name;
//             data.volume=volume;
//             data.surface=surface;
//             if(data.typeId!==typeId){data.typeId=typeId;i++ }
//             if(data.solidVolume!==solidVolume){data.solidVolume=solidVolume;i++ }
//             if(data.location!==location){data.location=location;i++ }
//             if(data.boundingBox!==boundingBox){data.boundingBox=boundingBox;i++ }
//             if(data.centroidElement!==centroidElement){data.centroidElement=centroidElement;i++ }
//         })
//     }
//     else{
         
//     }
// }
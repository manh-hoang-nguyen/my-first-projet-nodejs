var mongoose = require('mongoose');
const Data=require('../models/data');
// const Evolution = require('../models/evolution')
exports.getData=(req,res,next)=>{
    Data.find({}).then((items)=>{
        console.log(items);
        res.json(items) }) 

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

   
     
  
    const newData = await new Data({
      
     _id, guid,elementId,level,status,category,name,volume,surface ,typeId,
     solidVolume, location,boundingBox,centroidElement
     
   });
   newData.save()
         .then(() => res.json(newData))
         .catch(err => res.status(400).json('Error: ' + err));
   
  
}

function updateData(req,res,next){
   
    const level= req.body.level; 
    const category=req.body.category; 
    const name=req.body.name;
    const volume=req.body.volume;
    const surface=req.body.surface;
    const typeId=req.body.typeId;
    const solidVolume=req.body.solidVolume; 
    const location=req.body.location; 
    const boundingBox=req.body.boundingBox;
    const centroidElement=req.body.centroidElement; 
    const guid = req.body.guid;
    var i='';
    if(Data.find({guid:guid}).countDocuments()===1){
        Data.find({guid:guid}).then((data)=>{
            data.level=level;
            data.category=category;
            data.name=name;
            data.volume=volume;
            data.surface=surface;
            if(data.typeId!==typeId){data.typeId=typeId;i+='typeId' }
            if(data.solidVolume!==solidVolume){data.solidVolume=solidVolume;i+='solidVolume' }
            if(locationCompare===false){data.location=location;i+='location' }
            if(bBoxComparer===false){data.boundingBox=boundingBox;i++ }
            if(centroidCompare===false){data.centroidElement=centroidElement;i++ }
        })
    }
    else{
         
    }
}

function locationCompare(location1,location2){
    if(location2.LocationType==='Point'){
       
    }
    switch(location2.LocationType) {
        case 'Point':
            if( location2.Location_point01.X===location1.Location_point01.X
                &location2.Location_point01.Y===location1.Location_point01.Y
                &location2.Location_point01.Z===location1.Location_point01.Z
                ) return true;
                else return false;
        case 'Curve':
            if( location2.Location_point01.X===location1.Location_point01.X
                &location2.Location_point01.Y===location1.Location_point01.Y
                &location2.Location_point01.Z===location1.Location_point01.Z
                &location2.Location_point02.X===location1.Location_point02.X
                &location2.Location_point02.Y===location1.Location_point02.Y
                &location2.Location_point02.Z===location1.Location_point02.Z
                ) return true;
                else return false;
        default:
          return true;
      }
}
function bBoxComparer(bB1,bB2){
    if(bB.status==='1'){
        if( bB.BoundingBox_point01.X===bB2.BoundingBox_point01.X
            &bB1.BoundingBox_point01.Y===bB2.BoundingBox_point01.Y
            &bB1.BoundingBox_point01.Z===bB2.BoundingBox_point01.Z
            &bB1.BoundingBox_point02.X===bB2.BoundingBox_point02.X
            &bB1.BoundingBox_point02.Y===bB2.BoundingBox_point02.Y
            &bB1.BoundingBox_point02.Z===bB2.BoundingBox_point02.Z
            ) return true;
            else return false;
    }
    else return true;
}
function centroidCompare(cen1,cen2){
    if( cen1.centroid.X===cen2.centroid.X
        &cen1.centroid.Y===cen2.centroid.Y
        &cen1.centroid.Z===cen2.centroid.Z
        ) return true;
        else return false;
}
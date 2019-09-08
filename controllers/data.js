var mongoose = require('mongoose');
const Data=require('../models/data');
const Compare=require('./utils/compare')
const Comment=require('../models/comment');
const Evolution = require('../models/evolution');
const View =require('../models/view');

exports.getData=(req,res,next)=>{
    console.log("xxx")
    Data.find({}).then((items)=>{
        
        res.json(items) }) 

}

exports.getDataById= async(req,res,next)=>{
    const data = await  Data.findById(req.params.id); 
    res.json(data)
}

exports.statusChange = async (req,res,next)=>{
    const guid = req.body.guid;
    
    const data =await Data.findOne({guid:guid});
    data.status='deleted';
    data.save()
    .then((data) => res.json(data)) 
    .catch(err => res.status(400).json('Error: ' + err));
 
}

exports.postData=(req,res,next)=>{
    const _id= mongoose.Types.ObjectId();
    const status="new";

    const guid = req.body.guid;
    const elementId = req.body.elementId;
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
     
    const auteur= req.body.auteur;
    const comment=req.body.comment;

     Data.find({guid:guid}).countDocuments().then((total)=>
    { 
        if(total!==0) {  updateData(req,res,next); }
        if(total===0) {
            const newData =  new Data({ 
                _id, guid,elementId,level,status,category,name,volume,surface,typeId,
                solidVolume, location,boundingBox,centroidElement  
              });
               
            newData.save()
            .then(() => res.json(newData))
            .catch(err => res.status(400).json('Error: ' + err));

            const newComment = new Comment({
                dataId:_id,
                comments:[]
            });
            newComment.save();

            const newEvolution = new Evolution({
                dataId:_id,
                comments:[{
                    auteur:auteur,
                    content:comment,
                    datetime: new Date()
                }] })
            newEvolution.save();

            const newView = new View({ dataId:_id})
            newView.save();
                 
        }
    });
 
  
}

async function  updateData (req,res,next){
   
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
    const data =await Data.findOne({guid:guid});
   
      
    
            const typeCompare =(data.typeId===typeId)? true:false;
            const volumeCompare=(data.solidVolume===solidVolume)? true:false;
            const locationCompare=Compare.locationCompare(data.location,location);
            const bBoxComparer=Compare.bBoxComparer(data.boundingBox,boundingBox);
            const centroidCompare=Compare.centroidCompare(data.centroidElement,centroidElement);
            data.level=level;
            data.category=category;
            data.name=name;
            data.volume=volume;
            data.surface=surface;
            if(typeCompare===false){data.typeId=typeId }
            if(volumeCompare===false){data.solidVolume=solidVolume }
            if(locationCompare===false){data.location=location }
            if(bBoxComparer===false){data.boundingBox=boundingBox }
            if(centroidCompare===false){data.centroidElement=centroidElement }
            if(typeCompare&volumeCompare&locationCompare&bBoxComparer&centroidCompare){
                data.status='same';
            }
            else data.status='modified';

            data.save()
                .then(() => res.json(data))
                .catch(err => res.status(400).json('Error: ' + err));
 
}

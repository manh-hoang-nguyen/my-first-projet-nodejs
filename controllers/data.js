var mongoose = require('mongoose');
const Data=require('../models/data');
const Version = require('../models/version');
const Compare=require('./utils/compare')
const Comment=require('../models/comment');
const Evolution = require('../models/evolution');
const View =require('../models/view');
 
var async   = require("async");

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

exports.postMultipleData =async (req,res,next)=>{ 
    var v;
    const versionChange= req.body.versionChange;
    const auteur= req.body.auteur;
    const content=req.body.comment;
    await Version.find().countDocuments().then(async (c)=>{
        if(c==0){
            
            const version=await new Version({version:[1],auteur:[auteur],comment:[content]})
            version.save().then((vs)=>{
                console.log('First version created')
            }); //OK
            v=1;
            async.mapSeries(req.body.dataBody, function iterator(item, cb){   
                createOrUpdatedata(item,versionChange,v,cb,auteur,content);
                  
                }, function done(error, datas){
                    res.json(error ? { message: "could not create transfer because " + error } : datas);
            });
        } 
        else{
            if(versionChange==1){
                 
                Version.findOne().then((version)=>{
               
                    v=version.version.length+1;
                    console.log(v);
                    Version.findOneAndUpdate({},{$push: {version: v,auteur:auteur,comment:content}},{new:true})
                            .then((version)=>{ console.log('add new version: '+version.version.length)}); 
                     //https://stackoverflow.com/questions/34791471/cant-send-multiple-objects-in-array-via-rest-client-insomnia
                    async.mapSeries(req.body.dataBody, function iterator(item, cb){   
                            createOrUpdatedata( item,versionChange,v,cb,auteur,content);
                              
                            }, function done(error, datas){
                                res.json(error ? { message: "could not create transfer because " + error } : datas);
                        });
                 }); 
             }
             else { //version changed =0
                 Version.findOne().then((version)=>{
                    
                       v=version.version.length;
                       console.log('version no changed '+v)
                       async.mapSeries(req.body.dataBody, function iterator(item, cb){
                                
                                 
                        createOrUpdatedata( item,versionChange,v,cb,auteur,content);
                        

                        }, function done(error, datas){
                            res.json(error ? { message: "could not create transfer because " + error } : datas);
                    });
                 
              
                  }); 
             }
        }
    }) 
   
 
}

function createOrUpdatedata( item,versionChange,v,cb,auteur,comment){
    const _id= mongoose.Types.ObjectId();
     
        
        const status="new";
        
        const guid = item.guid;
        const elementId = item.elementId;
        const identifiant=item.version.identifiant;
        const level= item.version.level;
        
        const category=item.version.category; 
        const name=item.version.name;
        const volume=item.version.volume;
        const surface=item.version.surface;
        const typeId=item.version.typeId;
        const solidVolume=item.version.solidVolume; 
        const location=item.version.location; 
        const boundingBox=item.version.boundingBox;
        const centroidElement=item.version.centroidElement;
         
       
         
 Data.find({guid:guid}).countDocuments().then((total)=>
{ 
    if(total!==0) {  updateData(item,versionChange,v,cb,auteur,comment ); }
    if(total===0) {
        
        const version=[{v,identifiant,level,category,name,volume,surface,typeId,
                        solidVolume,location,boundingBox,centroidElement}];
       
        const newData =  new Data({ 
            _id, guid,elementId,status,version
          });
           
        newData.save(function(error){
            cb(error, newData);
        });

        const newComment = new Comment({
            guid:guid,
            comments:[]
        });
        newComment.save();
         
            const newEvolution = new Evolution({
                guid:guid,
                comments:[{
                    v:v,
                    auteur:auteur,
                    content:comment,
                    datetime: new Date()
                }] })
            newEvolution.save();

        const newView = new View({ guid:guid})
        newView.save();
         
    }
});
} 

exports.postData=(req,res,next)=>{
    const _id= mongoose.Types.ObjectId();
    const status="new";
    const v=req.body.v;
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
           
            const version={v,level,category,name,volume,surface,typeId,
                            solidVolume,location,boundingBox,centroidElement};
            const newData =  new Data({ 
                _id, guid,elementId,status,version
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

 

async function  updateData (item,versionChange,v,cb,auteur,content  ){
  
        const identifiant=item.version.identifiant;
        const level= item.version.level;
        
        const category=item.version.category; 
        const name=item.version.name;
        const volume=item.version.volume;
        const surface=item.version.surface;
        const typeId=item.version.typeId;
        const solidVolume=item.version.solidVolume; 
        const location=item.version.location; 
        const boundingBox=item.version.boundingBox;
        const centroidElement=item.version.centroidElement;
     
        const guid = item.guid;
        
        const data =await Data.findOne({guid:guid});
        
        const j= data.version.length;
         
         if(versionChange==0){
           
             if(j>1){
                 
                const typeCompare =(data.version[j-1].typeId===typeId)? true:false;
                const volumeCompare=(data.version[j-1].solidVolume===solidVolume)? true:false;
                const locationCompare=Compare.locationCompare(data.version[j-1].location,location);
                const bBoxComparer=Compare.bBoxComparer(data.version[j-1].boundingBox,boundingBox);
                const centroidCompare=Compare.centroidCompare(data.version[j-1].centroidElement,centroidElement);
                  
            if(typeCompare===false){data.version.typeId=typeId }
            if(volumeCompare===false){data.version.solidVolume=solidVolume }
            if(locationCompare===false){data.version.location=location }
            if(bBoxComparer===false){data.version.boundingBox=boundingBox }
            if(centroidCompare===false){data.version.centroidElement=centroidElement }
            console.log('xx');
            if(typeCompare&volumeCompare&locationCompare&bBoxComparer&centroidCompare){
                data.status='same';

                }
            else{ 
                data.status='modified';
                
                 
                pushEvolution(guid,v,auteur,content);
               
               
                data.version[j-1].typeId=typeId;
                data.version[j-1].solidVolume=solidVolume;
                data.version[j-1].location=location;
                data.version[j-1].boundingBox=boundingBox
                data.version[j-1].centroidElement=centroidElement;
               
                                 
                }
                data.version[j-1].identifiant=identifiant;
                data.version[j-1].level=level;
                data.version[j-1].category=category;
                data.version[j-1].name=name;
                data.version[j-1].volume=volume;
                data.version[j-1].surface=surface;
                data.save(function(error){
                    cb(error, data);
                }); 
                 
             }
            else{
                data.version[0].identifiant=identifiant;
                data.version[0].level=level;
                
                data.version[0].category=category;
                data.version[0].name=name;
                data.version[0].volume=volume;
                data.version[0].surface=surface;
                data.version[0].typeId=typeId;
                data.version[0].solidVolume=solidVolume;
                data.version[0].location=location;
                data.version[0].boundingBox=boundingBox
                data.version[0].centroidElement=centroidElement;
                data.save(function(error){
                    cb(error, data);
                });
                 
            }
           
          
           

            
         }
         
         if(versionChange==1){
            const typeCompare =(data.version[j-1].typeId===typeId)? true:false;
            const volumeCompare=(data.version[j-1].solidVolume===solidVolume)? true:false;
            const locationCompare=Compare.locationCompare(data.version[j-1].location,location);
            const bBoxComparer=Compare.bBoxComparer(data.version[j-1].boundingBox,boundingBox);
            const centroidCompare=Compare.centroidCompare(data.version[j-1].centroidElement,centroidElement);
            var status;
            if(typeCompare&volumeCompare&locationCompare&bBoxComparer&centroidCompare){
                status='same';
            }
            else {
                status='modified';
                console.log('v');
                pushEvolution(guid,v,auteur,content);
                }
             
                 

            let objectToPush = {v:v,level:level,category:category,name:name,surface:surface,
                typeId:typeId,solidVolume:solidVolume,location:location,
                boundingBox:boundingBox,centroidElement:centroidElement
                };

            update = {
                $set: {status:status},
                $push: {version: objectToPush}
            };
             
          
            
             Data.findOneAndUpdate({guid:guid},update,{new:true,upsert:true},function(error){
                cb(error, data); 
                 });  
                            
                      
             
             
         }
      
    
}
 function pushEvolution(guid,v,auteur,content){
    console.log('rdd');
    console.log(guid);
    const comment ={
    "v":v,
    "auteur":auteur,
    "content":content,
    "datetime":new Date()
    };



//https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
Evolution.findOneAndUpdate({guid:guid},{$push: {comments: comment}},{new:true,upsert:true})
.then((evolution) =>console.log(evolution));
}
function updateEvolution(guid,v,auteur,content){

}
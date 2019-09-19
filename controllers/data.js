var mongoose = require('mongoose');
const Data=require('../models/data');
const Version = require('../models/version');
const Compare=require('./utils/compare')
const Comment=require('../models/comment');
const Evolution = require('../models/evolution');
const View =require('../models/view');
 
var async   = require("async");

exports.getData=(req,res,next)=>{
    
    Data.find({}).then((items)=>{
        
        res.json(items) }) 

}

exports.getDataById= async(req,res,next)=>{
    const data = await  Data.findById(req.params.id); 
    res.json(data)
}

exports.statusChange = async (req,res,next)=>{ 
  console.log(req.length);
  //note: don't add "async" before "function iterator", if not error occurred "cb is not a function"
    async.mapSeries(req.body, function iterator(item, cb) { 
        const guid =item.guid; 
         Data.findOneAndUpdate({guid:guid},{$set:{status:'deleted'}},
                                {new:true,upsert:true},
                                function(error,data){
                                         cb(error, data); 
            
                                });   
    }, 
    function done(error, data){
        res.json(error ? { message: "could not create transfer because " + error } : data);
  });
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
        const identifiant=item.version[0].identifiant;
        const level= item.version[0].level;
        
        const category=item.version[0].category; 
        const name=item.version[0].name;
        const volume=item.version[0].volume;
        const surface=item.version[0].surface;
        const typeId=item.version[0].typeId;
        const solidVolume=item.version[0].solidVolume; 
        const location=item.version[0].location; 
        const boundingBox=item.version[0].boundingBox;
        const centroidElement=item.version[0].centroidElement;
         
       
         
 Data.find({guid:guid}).countDocuments()
                        .then((total)=>
                { 
                    if(total!==0) {  updateData(item,versionChange,v,cb,auteur,comment ); }
                    if(total===0) {
                        
                        const version=[{v,identifiant,level,category,name,volume,surface,typeId,
                                        solidVolume,location,boundingBox,centroidElement}];
                        const history=[{v,auteur,comment,datetime:Date.now}]
                        const newData =  new Data({ 
                            _id, guid,elementId,status,version,history
                        });
                        
                        newData.save(function(error){
                            cb(error, newData);
                        });
                
                    }
                });
} 

 

async function  updateData (item,versionChange,v,cb,auteur,content  ){
  
        const identifiant=item.version[0].identifiant;
        const level= item.version[0].level;
        
        const category=item.version[0].category; 
        const name=item.version[0].name;
        const volume=item.version[0].volume;
        const surface=item.version[0].surface;
        const typeId=item.version[0].typeId;
        const solidVolume=item.version[0].solidVolume; 
        const location=item.version[0].location; 
        const boundingBox=item.version[0].boundingBox;
        const centroidElement=item.version[0].centroidElement;
     
        const guid = item.guid;
        
        const data =await Data.findOne({guid:guid});
        
        const j= data.version.length;
         
         if(versionChange==0){
           
         
                 
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
                
                if(typeCompare&volumeCompare&locationCompare&bBoxComparer&centroidCompare){
                data.status='same';
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
                data.status='modified'; 
                 //a modify
                let historyToPush = {v:v,auteur:auteur,comment:content}
                //update = { $push: {history: historyToPush}};
                update={$set:{"data.version[j-1].$.typeId":typeId,
                 "data.version[j-1].$.typeId":typeId,
                 "data.version[j-1].$.solidVolume":solidVolume,
                 "data.version[j-1].$.location":location,
                 "data.version[j-1].$.boundingBox":boundingBox,
                 "data.version[j-1].$.centroidElement":centroidElement,
                 "data.version[j-1].$.identifiant":identifiant,
                 "data.version[j-1].$.level":level,
                 "data.version[j-1].$.category":category,
                 "data.version[j-1].$.name":name,
                 "data.version[j-1].$.volume":volume,
                 "data.version[j-1].$.surface":surface },
                 $push: {history: historyToPush}
                            }
               
                // data.version[j-1].typeId=typeId;
                // data.version[j-1].solidVolume=solidVolume;
                // data.version[j-1].location=location;
                // data.version[j-1].boundingBox=boundingBox
                // data.version[j-1].centroidElement=centroidElement;

                // data.version[j-1].identifiant=identifiant;
                // data.version[j-1].level=level;
                // data.version[j-1].category=category;
                // data.version[j-1].name=name;
                // data.version[j-1].volume=volume;
                // data.version[j-1].surface=surface;
               
                // data.save(function(error){
                //     cb(error, data);
                // }); 
                data.update(update,(error)=>{
                    cb(error, data);
                })
                                 
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
               
                update = {
                    $set: {status:status},
                    $push: {version: objectToPush} };
            }
            else {
                status='modified';
                let historyToPush = {v:v,auteur:auteur,comment:content};
                console.log('v');
                update = {
                    $set: {status:status},
                    $push: {version: objectToPush, history:historyToPush}
                };
                }
             
                 

            let objectToPush = {v:v,level:level,category:category,name:name,surface:surface,
                typeId:typeId,solidVolume:solidVolume,location:location,
                boundingBox:boundingBox,centroidElement:centroidElement
                }; 
            
             Data.findOneAndUpdate({guid:guid},update,{new:true,upsert:true},function(error){
                cb(error, data); 
                 });    
             
         }
      
    
}
 function pushEvolution(guid,v,auteur,content){
     
     
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
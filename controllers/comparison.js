const Comparison=require('../models/comparison');
const async   = require("async");
const Version = require('../models/version');
const History=require('../models/history');

exports.get=(req,res,next)=>{ 
    Comparison.find({})
            .then((items)=>{ res.json(items); })
            .catch(err => res.status(400).json('Error: ' + err));
}
exports.delete=(req,res,next)=>{
    Comparison.deleteMany({}).then(res.json("Comparisons deleted"));
}
exports.post=async(req,res,next)=>{
    
    const v= req.body.version;
    const auteur= req.body.auteur;
    const content=req.body.comment;
    const version= await Version.findOne();
    const l =version.version.length;
    if(v>l )
    {
        Version.findOneAndUpdate({},{$push: {version:{ v,auteur:auteur,comment:content}}},{new:true})
        .then((version)=>{ console.log('add new version: '+version.version.length)}); 
    }
    async.mapSeries(req.body.data, function iterator(item, cb) {  

        const guid =item.guid; 
        const status=item.status;
        
        const typeId=item.typeId;
        const solidVolume=item.solidVolume; 
        const location=item.location; 
        const boundingBox=item.boundingBox;
        const centroidElement=item.centroidElement;
        let object ={ 
                'data.$.v':v,
                'data.$.typeId':typeId ,
                'data.$.solidVolume':solidVolume ,
                'data.$.location':location ,
                'data.$.boundingBox':boundingBox ,
                'data.$.centroidElement':centroidElement 
          }
          
        switch(status){
            case 'same':
                    console.log('same');
                   let update1={  $set:{status:status} };
                    History.findOneAndUpdate({guid:guid},update1,
                        function(data,error){console.log('modifications history updated')  } );
                
                if(v>l )
                { console.log('sameV>L');
                    Comparison.findOneAndUpdate({guid:guid},{$push:object},{new:true},function(data,error){
                        cb(data,error); 
                         });
                    
                }
                break;
            case 'modified':
                console.log('modified');
                    if(v==l )
                    {
                        console.log({modifications: {v:v,auteur:auteur,comment:content}});
                        console.log({status:status});
                       let update={
                            $push: {modifications: {v:v,auteur:auteur,comment:content}},
                            $set:{status:status}
                        };
                       
                        History.findOneAndUpdate({guid:guid},update,
                           function(error){console.log('modifications history updated')} );

                        Comparison.findOneAndUpdate({guid:guid,'data.v':v}, {$set:object}, {new:true,upsert:true},
                        (data,error)=>{
                            cb(data,error); });


                        
                    }
                    else{
                        if(v>l )
                        {    
                            let objectToPush ={ 
                              data: { v:v,
                                typeId:typeId ,
                                solidVolume:solidVolume ,
                                location:location ,
                                boundingBox:boundingBox ,
                                centroidElement:centroidElement }
                            }
                            let update={
                                $push: {modifications: {v:v,auteur:auteur,comment:content}},
                                $set:{status:status}
                            };
                           
                            History.findOneAndUpdate({guid:guid},update,
                               function(error){console.log('modifications history updated')} );
                               console.log({guid:guid});
                            Comparison.findOneAndUpdate({guid:guid},{$push:objectToPush}, {new:true,upsert:true},
                                         (data,error)=>{
                                             cb(data,error); });
                                             
                        }
                    }
                   
                
                    break;
            case 'new':
                
                    new Comparison({guid:guid,data:[{v:v,typeId:typeId,
                                                    solidVolume:solidVolume,
                                                    location:location,
                                                    boundingBox:boundingBox,
                                                    centroidElement:centroidElement
                                                    }]})
                                        .save(function(data,error){ 
                                            console.log(data);
                                            cb(data,error); }) ;
                    new History({guid:guid,status:status,modifications:[{v:v,auteur:auteur,comment:content}]}).save().then(console.log("new history created"));
                    break;
            case 'deleted':
                Comparison.findOneAndRemove({guid:guid}).then(console.log('comparison deleted'));
                let update3={
                    $set: {status:status},
                    $push:{
                        modifications:{ v:v,auteur:auteur,comment:content}
                    }
                }
                History.findOneAndUpdate({guid:guid},update3,
                    function(data,error){ cb(data,error);  });                                    
                    break;
        }
       

    }, 
    function done(datas,error){
        console.log(datas);
        res.json(error ? { message: + error } : 'succes');
  });
}


 
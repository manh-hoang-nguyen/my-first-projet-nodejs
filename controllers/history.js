const History = require('../models/history');
const async   = require("async");


exports.deleteHistory=(req,res,next)=>{
        History.deleteMany({}).then(()=>{res.json("history deleted")});
      }


exports.postComment=(req,res,next)=>{
        const guid = req.body.guid;
        const auteur=req.body.auteur;
        const comment=req.body.comment;
        const datetime=Date.now();
        let obj={auteur,comment,datetime};
         
        History.findOneAndUpdate({guid:guid},
                                {$push:{comments:{auteur,comment,datetime}}},
                                 {new:true}).then((item)=>{ res.json(obj)});
                                
}

exports.get=(req,res,next)=>{
     
    
//         History.find( {})
//             .then((items)=>{ res.json(items); })
//             .catch(err => res.status(400).json('Error: ' + err));
// }

// exports.postComment=(req,res,next)=>{
//     const guid=req.body.guid;
//     const comment ={"auteur":req.body.auteur,
//                     "content":req.body.content,
//                     "datetime":new Date()
//                     };
    
//         //https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
//         History.findOneAndUpdate({guid:guid},{$push: {comments: comment}},{new:true,upsert:true})
//                 .then(() => res.json(comment));        
 
// }
//  exports.postModification=(req,res,next)=>{

//     async.mapSeries(req.body, function iterator(item, cb) { 
//         const guid =item.guid; 
//         const status=item.status;
      
//         switch(status){
//             case 'same':

//                     return;
//             case 'modified':

//                     return;
//             case 'new':

//                     return;
//             case 'deleted':

//                 return;
//         }

//     }, 
//     function done(error, data){
//         res.json(error ? { message: "could not create transfer because " + error } : data);
//   });
        
//   const modification ={   v:v, "auteur":req.body.auteur,
//   "content":req.body.content,
//   "datetime":new Date()  };
       
//          History.findOneAndUpdate({guid:guid},{$push: {modifications: modification}},{new:true,upsert:true})
//         .then(() => res.json("history updated"));    
 }
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
        
        History.findOneAndUpdate({guid:guid}, {$push:{comments:{auteur,comment,datetime}}}, {new:true})
                .then((item)=>{ 
                                let i=item.comments.length;
                                
                                res.json(item.comments[i-1])});
                                
}

exports.getHistory=(req,res,next)=>{
   
   History.find().then((item)=>{
        res.json(item) 
      }); 
   
 }
const History = require('../../models/history');
 


exports.deleteHistory=(req,res,next)=>{
        History.deleteMany({}).then(()=>{res.json("history deleted")});
      }


exports.postComment=(req,res,next)=>{
        const guid = req.body.guid;
        const author=req.body.author;
        const comment=req.body.comment;
        const datetime=Date.now();
        let obj={author,comment,datetime};
        
        History.findOneAndUpdate({guid:guid}, {$push:{comments:{author,comment,datetime}}}, {new:true})
                .then((item)=>{ 
                                let i=item.comments.length;
                                
                                res.json(item.comments[i-1])});
                                
}

exports.getHistory=(req,res,next)=>{
   const projectId=req.body.projectId;
   History.find({projectId:projectId}).then((item)=>{
        res.json(item) 
      }); 
   
 }
const Comment = require('../models/comment');

exports.getComments=(req,res,next)=>{
    const dataId=req.body.dataId;
    console.log(dataId)
    Comment.findOne({dataId:dataId})
            .then((comment)=>{ res.json(comment); })
            .catch(err => res.status(400).json('Error: ' + err));
}

exports.postComment=(req,res,next)=>{
    const dataId=req.body.dataId;
    const comment ={"auteur":req.body.auteur,
                    "content":req.body.content,
                    "datetime":new Date()
                    };
   


//https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
Comment.findOneAndUpdate({dataId:dataId},{$push: {comments: comment}},{new:true,upsert:true})
        .then((comment) => res.json(comment));        
 
}
 
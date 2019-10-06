const History = require('../../models/history');

exports.postComment=(req,res,next)=>{
    const projectId = req.body.projectId;
    const guid = req.body.guid;
    const authorId = req.body.authorId; 
    const authorName=req.body.authorName;
    const comment=req.body.comment;
    const datetime=Date.now();
   
    
    History.findOneAndUpdate({projectId:projectId,guid:guid}, {$push:{comments:{authorId,authorName,comment,datetime}}}, {new:true})
            .then((item)=>{ 
                            let i=item.comments.length;
                            
                            res.json(item.comments[i-1])});
                            
}

exports.getComments=(req,res,next)=>{
    const projectId = req.body.projectId;
    const guid = req.body.guid;
    
   
    
    History.findOne({projectId:projectId,guid:guid}) 
            .then((item)=>{   
                res.json(item.comments)});
                            
}

exports.getAllComments=async(req,res)=>{
    const projectId=req.body.projectId;
    let allCommentObj=[];
   await History.find({projectId:projectId})
            .then((items)=>{ 
                allCommentObj= items.map((item)=>{
                    let commentObj={
                        guid:item.guid,
                        comment:item.comments
                    }
                    return commentObj;
                }) 
            });
    res.json(allCommentObj);
}


exports.delete=(req,res)=>{
    const projectId= req.body.projectId;
    const guid = req.body.guid;
    const commentId = req.body.commentId;
    const _id=req.body._id;
    let pullObj = {
        $pull:{
            comments:{_id:commentId}
        }
    }
    History.findOneAndUpdate({projectId:projectId, guid:guid},pullObj,(data,error)=>{
        if(error) res.json("Could not delete comment because: "+error)
        else res.json(data);
    })
}
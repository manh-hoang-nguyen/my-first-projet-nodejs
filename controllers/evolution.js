const Evolution=require('../models/evolution');

exports.getEvolution=(req,res,next)=>{
    const guid=req.body.guid;
     
    Evolution.findOne({guid:guid})
            .then((evolution)=>{ res.json(evolution); })
            .catch(err => res.status(400).json('Error: ' + err));
}

exports.addEvolution=(req,res,next)=>{
    const guid=req.body.guid;
    const comment =
    {
        "v":req.body.v,
        "auteur":req.body.auteur,
        "content":req.body.content,
        "datetime":new Date()
         };
   


//https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
Evolution.findOneAndUpdate({guid:guid},{$push: {comments: comment}},{new:true,upsert:true})
        .then((evolution) => res.json(evolution));
}
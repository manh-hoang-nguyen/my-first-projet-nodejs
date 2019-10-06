const mongoose = require('mongoose');
const Project = require('../../models/project');
const User=require('../../models/user');
const Comparison=require('../../models/comparison');
const History=require('../../models/history');
//CREATE
exports.create=async(req,res,next)=>{
const projectName = req.body.projectName;
const comment=req.body.comment;
const userMail=req.body.userMail;
const projectId=mongoose.Types.ObjectId();
let userId;
let projectPush={
    $push:{projects:{projectId:projectId,projectName:projectName}}
}
await User.findOneAndUpdate({email:userMail},projectPush, {new:true})
.then((user)=>{
    console.log(userMail)
    userId=user._id;
    console.log('New project added to user: ' + user.email);
});
      

const project= new Project({
                        _id:projectId,
                        name:projectName,
                        owner:userId,
                        guest:[],
                        version:[{v:1,createdBy:userMail,comment:comment}]
                        });

project.save()
        .then((project)=>{ res.json(project) })
        .catch(err => res.status(400).json('Error: ' + err));
 
}

//GET
exports.getById=(req,res,next)=>{
    const projectId= req.body.projectId;
     
    Project.findById(projectId)
            .then((project)=>res.json(project));
 
}

//DELETE
exports.deleteById=(req,res,next)=>{
    const projectId= req.body.projectId;
    const userId= req.body.userId;
    User.findOneAndUpdate({_id:userId},{$pull:{projects:{projectId:projectId}}}, {new:true})
        .then((user)=>{
            console.log('project '+projectId+' is deleted from user '+userId)});

    Project.findById(projectId)
            .then((project)=>{
                if(project.owner==userId){
                    project.delete().then(res.json('project '+projectId+ ' is deleted'));
                    Comparison.deleteMany({projectId:projectId}).then(console.log('Comparison data of project '+ projectId+' is deleted'));
                    History.deleteMany({projectId:projectId}).then(console.log('History of project '+ projectId+' is deleted'));
                }
                else{
                    res.json('Can not delete project because you are not owner of project');
                }
            })
     

   
}

//API version changes
exports.changeVersion=(req,res)=>{
    const projectId=req.body.projectId;
    const v= req.body.version;
    const auteur= req.body.auteur;
    const comment=req.body.comment;
    let update={
        $push:{
            version:{
                v:v,
                createdBy:auteur,
                comment:comment
            }
        }
    }
     
    Project.findOneAndUpdate({_id:projectId},update,{new:true},(err,project)=>{ 
      if(!err) {
        res.json(project);
        Comparison.find({projectId:projectId})
        .then((items)=>{
            items.forEach((item)=>{
                    
            let i= item.data.length-1;
                    
            let pushObj={
            "v":v,
            "location":item.data[i].location,
            "boundingBox":item.data[i].boundingBox,
            "centroidElement":item.data[i].centroidElement,
            "typeId":item.data[i].typeId,
            "solidVolume":item.data[i].solidVolume
            }
           
            item.data.push(pushObj);
            
            item.save();
            }) })
             
        .catch(err => res.status(400).json('Error: ' + err));

        History.find({projectId:projectId})
                .then((items)=>{
                    items.forEach((item)=>{
                        let pushHistoObj={
                            v:v,
                            auteur:auteur,
                            comment:'Version changed'
                        }
                        item.modifications.push(pushHistoObj);

                        item.save();
                    
                    })
                })

      } 
      else res.status(400).json('Error: ' + err)
     
    })
     
   
 }

 //GET VERSION
 exports.getVersion=(req,res)=>{
     const projectId=req.body.projectId;
     
     Project.findById(projectId)
            .then((project)=>{
                res.json(project.version);
            })
 }
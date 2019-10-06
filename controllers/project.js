const mongoose = require('mongoose');
const Project = require('../models/project');
const User=require('../models/user');

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
exports.get=(req,res,next)=>{
    const projectId= req.body.projectId;

    Project.findById(projectId)
            .then((project)=>res.json(project));
 
}

//DELETE
exports.delete=(req,res,next)=>{
    const projectId= req.body.projectId;
    const userMail= req.body.userMail;
    User.findOneAndUpdate({email:userMail},{$pull:{projects:{projectId:projectId}}}, {new:true})
        .then((user)=>{
            console.log('project '+projectId+' is deleted from user '+user.name.firstName+' '+user.name.lastName)});
    Project.findByIdAndDelete(projectId)
            .then((project)=>{res.json('project'+project.name+' is deleted.')});
}

//ADD GUEST
exports.addGuest=(req,res,next)=>{

}
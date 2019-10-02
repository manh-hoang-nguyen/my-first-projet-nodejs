const Version = require('../models/version');
const Project=require('../models/project');

exports.createVersion=   (req,res)=>{
  const projectId= req.body.projectId;
  const userMail = req.body.userMail;
  const comment=req.body.comment;
  
  Project.findById(projectId)
          .then((project)=>{
            let newVersion={
              v:project.version.length+1,
              createdBy:userMail,
              comment:comment
            }

  Project.findOneAndUpdate({_id:projectId},{$push: {version: newVersion}},{new:true,upsert:true})
            .then((project)=>res.json(project));
    });
 
}
 
exports.get= (req,res,next)=>{

const projectId = req.body.projectId;

Project.findById(projectId)
        .then((project)=>{
          res.json(project.version) 
        })
 }
 
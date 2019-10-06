const User = require('../../models/user');
const Project =require('../../models/project');
exports.getProjects=(req,res,next)=>{
    const id= req.body.id;
    User.findById(id)
    .then((user)=>{
        res.json(user.projects);
    })
}

exports.getById=(req,res,next)=>{
    const id= req.body.id;
    User.findById(id)
        .then((user)=>{
            res.json(user);
        })
}

 
exports.delete=(req,res,next)=>{
    const id= req.body.id;
    User.findByIdAndRemove(id)
        .then((user)=>{
            res.json(user);
            Project.deleteMany({owner:id})
            .then(console.log('All projects of user '+user.email +' are deleted.'));
        })
  
}
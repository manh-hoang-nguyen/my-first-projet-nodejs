const Version = require('../models/version');

exports.createVersion=   (req,res,next)=>{
  const auteur = req.body.auteur;
  const comment=req.body.comment;
      Version.find().countDocuments().then(async(count)=> {
        if(count===0){   
                    const version = new Version({version:[{v:1,auteur:auteur,comment:comment}]})
                    version.save() 
                    .then((version) => res.json(version))
                    .catch(err => res.status(400).json('Error: ' + err));
                    } 
          else{ 
            const item = await Version.findOne();   
            var newVersion={v:item.version.length+1,auteur:auteur,comment:comment}; 
           
            Version.findOneAndUpdate({},{$push: {version: newVersion}},{new:true,upsert:true})
            .then((version) => res.json(version));  
                }
         
    
    });

   
  
}
exports.deleteVersion=(req,res,next)=>{
  Version.findOneAndDelete({}).then(()=>{res.json("version deleted")});
}
exports.getAllVersion= (req,res,next)=>{
    Version.findOne().then((version)=>{
      res.json( version.version) 
    }); 
}
 
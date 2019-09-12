const Version = require('../models/version');

exports.createVersion=   (req,res,next)=>{
  
      Version.find().countDocuments().then(async(count)=> {
        if(count===0){   
                    const version = new Version({version:[1]})
                    version.save() 
                    .then((version) => res.json(version))
                    .catch(err => res.status(400).json('Error: ' + err));
                    } 
          else{ 
            const item = await Version.findOne();   
            var newVersion=item.version.length+1; 
            Version.findOneAndUpdate({},{$push: {version: newVersion}},{new:true,upsert:true})
            .then((version) => res.json(version));  
                }
         
    
    });

   
  
}

exports.getAllVersion= (req,res,next)=>{
    Version.findOne().then((version)=>{
      res.json( version.version) 
    }); 
}
exports.getNewestVersion= (req,res,next)=>{
    Version.findOne().then((item)=>{
      
        res.json(item.version.length);

    }); 
    
}
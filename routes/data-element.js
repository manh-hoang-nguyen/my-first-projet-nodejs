const express = require('express');
const router = express.Router();
const Data=require('../models/data')
const chunk=require('../models/chunk')

const dataController = require('../controllers/data')

router.get('/', dataController.getData)

router.get('/chunk',  (req,res)=>{
    chunk.find({}).then((chunks)=>{
     console.log(chunks);
       var thumb =  chunks.toString('base64');
     res.render('datas/chunk',{
        chunks,
        img:thumb
     })
    }) 
    
 })

 //get by id
router.get('/:id', async(req,res)=>{
   const data = await  Data.findById(req.params.id);
    
   // res.send(JSON.stringify(xxx));
    res.json(data)
})

router.put('/:id/edit',(req,res)=>{

   res.send('Edit Succes' + req.params.id)

})
//update
router.put('/:id',(req,res)=> {
   res.send('Update succces' +req.params.id)

})

//change status element deleted
router.post('/statusChange',dataController.statusChange);

//DELETE BY ID
router.delete('/:id',(req,res)=> {
   Data.findByIdAndDelete(req.params.id)
   .then(() => res.json('Exercise deleted.')).then(res.send('Delete succces'))
   .catch(err => res.status(400).json('Error: ' + err));

})


//post data
 router.post('/add',dataController.postData)
module.exports= router;
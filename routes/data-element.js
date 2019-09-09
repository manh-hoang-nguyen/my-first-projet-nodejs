const express = require('express');
const router = express.Router();
const Data=require('../models/data')


const dataController = require('../controllers/data')

router.get('/', dataController.getData)

 

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

 //post multiple data
 router.post('/addMultiple',dataController.postMultipleData)
module.exports= router;
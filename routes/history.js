const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history');

//POST comment
router.post('/comment',historyController.postComment);
// //POST modification
// router.post('/modification',historyController.postComment);

//GET 
router.get('/',historyController.get);
//DELETE
router.delete('/',historyController.deleteHistory);
 
module.exports= router;
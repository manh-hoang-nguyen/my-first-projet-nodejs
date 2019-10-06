const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history');
const isAuthApi= require('../middleware/is-authAPI');
//POST comment
router.post('/comment',isAuthApi,historyController.postComment);
// //POST modification
// router.post('/modification',historyController.postComment);

//GET 
router.post('/',isAuthApi,historyController.getHistory);
//DELETE
router.delete('/',isAuthApi,historyController.deleteHistory);
 
module.exports= router;
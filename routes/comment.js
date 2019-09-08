const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

//POST comment
router.post('/add',commentController.postComment);
//GET 
router.get('/',commentController.getComments);

 
module.exports= router;
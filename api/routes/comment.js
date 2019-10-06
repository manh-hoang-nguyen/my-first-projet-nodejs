const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.js');
const isAuthApi= require('../middleware/is-authAPI');
// /api/comment =>POST
router.post('/',isAuthApi,commentController.postComment);
//GET 
router.get('/',isAuthApi,commentController.getComments);

// api/comment =>DELETE
router.delete('/',commentController.delete);
module.exports= router;
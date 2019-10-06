const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');
const isAuthApi= require('../middleware/is-authAPI');
// /project =>POST 
router.post('/',isAuthApi,projectController.create)
//GET  
router.get('/',isAuthApi,projectController.get)
 
//DELETE  
router.delete('/',projectController.delete)
 
module.exports= router;
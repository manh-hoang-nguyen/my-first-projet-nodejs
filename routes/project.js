const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');

// /project =>POST 
router.post('/',projectController.create)
//GET  
router.get('/',projectController.get)
 
//DELETE  
router.delete('/',projectController.delete)
 
module.exports= router;
const express = require('express');
const router = express.Router();
const versionController = require('../controllers/version');
//POST  
router.post('/',versionController.createVersion)
//GET  
router.get('/',versionController.getAllVersion)
 
//DELETE  
router.delete('/',versionController.deleteVersion)
 
module.exports= router;
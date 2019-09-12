const express = require('express');
const router = express.Router();
const versionController = require('../controllers/version');
//POST  
router.post('/add',versionController.createVersion)
//GET  
router.get('/',versionController.getAllVersion)
router.get('/newest',versionController.getNewestVersion)

 
module.exports= router;
const express = require('express');
const router = express.Router();
const versionController = require('../controllers/version');
// /project/version =>POST  
router.post('/',versionController.createVersion)
// /project/version =>GET  
router.get('/',versionController.get)
 
// /project/version =>DELETE  
//router.delete('/',versionController.deleteVersion)
 
module.exports= router;
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');
const isAuthApi= require('../middleware/is-authAPI');

//PROJECT
// /project =>POST 
router.post('/',isAuthApi,projectController.create) 
// /project =>GET  
router.post('/',isAuthApi,projectController.getById) 
// /project =>DELETE  
router.delete('/',isAuthApi,projectController.deleteById)
 

//VERSION
// /project/addVersion =>POST
router.post('/version/create',isAuthApi,projectController.changeVersion);
// /project/version =>GET
router.post('/version/get', isAuthApi,projectController.getVersion);


module.exports= router;
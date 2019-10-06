const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isAuthApi= require('../middleware/is-authAPI');
 
//GET  /user
router.get('/',isAuthApi,userController.getById)

// /api/user/project
router.get('/project',isAuthApi,userController.getProjects)
 
//DELETE  
router.delete('/',isAuthApi,userController.delete)
 
module.exports= router;
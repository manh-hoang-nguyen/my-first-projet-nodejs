const express = require('express');
const router = express.Router();
const comparisonController=require('../controllers/comparison');
const isAuthApi= require('../middleware/is-authAPI');

router.post('/',comparisonController.get);
//router.post('/',isAuthApi,comparisonController.post);
 
router.post('/modified-element',isAuthApi,comparisonController.modifiedElement);
router.post('/new-element',isAuthApi,comparisonController.newElement);
router.post('/deleted-element',isAuthApi,comparisonController.deletedElement);
module.exports= router;
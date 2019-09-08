const express = require('express');
const router = express.Router();
const viewController = require('../controllers/view');
//POST view, NO USE!
router.post('/add',viewController.postView)
//GET view
router.get('/',viewController.getView)

//update
//router.put('/update/:dataId',viewController.updateView);
router.post('/update',viewController.updateView);
module.exports= router;
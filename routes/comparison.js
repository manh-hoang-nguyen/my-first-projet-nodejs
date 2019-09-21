const express = require('express');
const router = express.Router();
const comparisonController=require('../controllers/comparison');


router.post('/',comparisonController.post);
router.delete('/',comparisonController.delete);

module.exports= router;
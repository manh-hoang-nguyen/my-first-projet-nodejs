const express = require('express');
const router = express.Router();
const comparisonController=require('../controllers/comparison');

router.get('/',comparisonController.get);
router.post('/',comparisonController.post);
router.delete('/',comparisonController.delete);

module.exports= router;
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const measureCtrl = require('../controllers/measure');

router.post('/card/:cardId', auth, measureCtrl.createMeasure);

module.exports = router;
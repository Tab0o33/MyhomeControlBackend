const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const cardCtrl = require('../controllers/card');

router.post('/', auth, cardCtrl.createCard);
router.get('/all', auth, cardCtrl.readAllCards);
router.get('/:id', auth, cardCtrl.readOneCard);
router.put('/:id', auth, cardCtrl.updateCard);
router.delete('/:id', auth, cardCtrl.deleteCard);

module.exports = router;
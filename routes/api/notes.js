// routes/api/notes.js
const express = require('express');
const router = express.Router();
const noteCtrl = require('../../controllers/api/notes');

router.get('/', noteCtrl.index);

router.get('/:id', noteCtrl.show);

router.post('/', noteCtrl.create);

router.delete('/:id', noteCtrl.delete);

module.exports = router;
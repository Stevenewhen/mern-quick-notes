// routes/api/notes.js
const express = require('express');
const router = express.Router();
const noteController = require('../../controllers/api/notes');

router.get('/', noteController.index);

router.get('/:id', noteController.show);

router.post('/', noteController.create);

module.exports = router;

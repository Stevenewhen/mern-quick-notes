const express = require('express');
const router = express.Router();
const noteCtrl = require('../../controllers/api/notes');

// Retrieve all notes
router.get('/', noteCtrl.index);

// Retrieve a specific note by ID
router.get('/:id', noteCtrl.show);

// Create a new note
router.post('/', noteCtrl.create);

// Update a specific note by ID
router.put('/:id', noteCtrl.edit);

// Delete a specific note by ID
router.delete('/:id', noteCtrl.delete);

module.exports = router;

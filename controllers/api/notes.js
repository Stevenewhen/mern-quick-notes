const Note = require('../../models/note');

module.exports = {
  index,
  show,
  create,
  update: updateNote,
  delete: remove,
};

async function updateNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    if (req.body.text) note.text = req.body.text;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ error: 'Error updating note', details: err.message });
  }
}

async function remove(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting the note' });
  }
}

async function index(req, res) {
  try {
    const notes = await Note.find().populate('user');
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ error: 'Error fetching notes', details: err.message });
  }
}

async function show(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    console.error('Error showing note:', err);
    res.status(500).json({ error: 'Error showing note', details: err.message });
  }
}

async function create(req, res) {
  const note = new Note({
    text: req.body.text,
    user: req.user._id,
  });
  try {
    await note.save();
    const showNote = await Note.findById(note._id).populate('user');
    res.json(showNote);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ error: 'Error creating note', details: err.message });
  }
}

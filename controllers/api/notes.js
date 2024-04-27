
const Note = require('../../models/note');

module.exports = {
  index,
  show,
  create,
};

async function index(req, res) {
    const notes = await Note.find().populate('user')
    res.json(notes);
}

async function show(req, res) {
    const note = await Note.findById(req.params.id);
    res.json(note);
}

async function create(req, res) {
  try {
    const { text } = req.body;
    const { user } = req;
    const newNote = new Note({ text, user, createdAt: new Date() });
    await newNote.save();
    
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


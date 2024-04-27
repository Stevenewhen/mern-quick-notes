const Note = require('../../models/note');

module.exports = {
  index,
  show,
  create,
  delete: remove,
};

async function remove(req, res) {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      res.send('Cannot delete the note.');
      return;
    }
    await Note.findByIdAndDelete(id);
    res.send('Deleted, You Win!');
  } catch (err) {
    res.send('Error deleting the note.');
  }
}

async function index(req, res) {
  const notes = await Note.find().populate('user');
  res.json(notes);
}

async function show(req, res) {
  const note = await Note.findById(req.params.id);
  res.json(note);
}

async function create(req, res) {
  const note = new Note({
    text: req.body.text,
    user: req.user._id,
  });
  try {
    await note.save();
    const showUser = await Note.findById(note._id).populate('user');
    res.json(showUser);
  } catch (err) {
    console.error(err);
    res.json({ error: 'Why!!!' });
  }
}

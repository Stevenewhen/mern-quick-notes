import React, { useState } from 'react';
import * as notesAPI from '../../utilities/notes-api';

export default function AddNoteForm({ addNote, user }) {
  const [formData, setFormData] = useState({
    text: ""
  });

  const [error, setError] = useState('');

  function handleChange(evt) {
    setFormData({
      ...formData,
      text: evt.target.value,
    });
    if (error) setError('');
  }

  async function handleAddNote(evt) {
    evt.preventDefault();
    if (!formData.text.trim()) {
      setError('Note cannot be empty');
      return;
    }
    try {
      const completeFormData = { text: formData.text.trim(), user: user._id };
      const addedNote = await notesAPI.createNote(completeFormData);
      addNote(addedNote);
      setFormData({ text: '' }); 
    } catch (error) {
      console.error("Error adding note:", error.message);
      setError('Failed to add note');
    }
  }

  return (
    <form onSubmit={handleAddNote}>
      <input
        type="text"
        name="text"
        value={formData.text}
        onChange={handleChange}
        placeholder="Enter note text"
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

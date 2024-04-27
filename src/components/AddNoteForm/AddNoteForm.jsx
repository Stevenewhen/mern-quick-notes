import React, { useState } from 'react';

export default function AddNoteForm({ onAddNote }) {
  const [text, setText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the onAddNote function passed from the parent component with the note text
      await onAddNote(text);
      // Clear the text input after adding the note
      setText('');
    } catch (error) {
      console.error('Error adding note:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Enter note text"
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

import React from 'react';
import './NoteListItem.css';

export default function NoteListItem({ note, handleDelete, setEditing }) {
  return (
    <div className="note-list-item">
      <p>{note.text}</p>
      <div className="note-footer">
        <p>Created by: {note.user ? note.user.name : 'Unknown'}</p>
        <p>Created at: {new Date(note.createdAt).toLocaleString()}</p>
      </div>
      <button onClick={() => handleDelete(note)}>X</button>
      <button onClick={() => setEditing(note._id)}>Edit</button>
    </div>
  );
}

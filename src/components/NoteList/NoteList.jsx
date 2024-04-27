// NoteList.js
import React from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';

export default function NoteList({ notes, deleteNote }) {
  return (
    <div className="note-list">
      {notes.map((note, idx) => (
        <NoteListItem note={note} key={note._id} handleDelete={() => deleteNote(note)} />
      ))}
    </div>
  );
}
import React, { useState, useEffect } from "react";
import * as notesAPI from '../../utilities/notes-api';
import './NotesPage.css';
import NoteList from '../../components/NoteList/NoteList';
import AddNoteForm from '../../components/AddNoteForm/AddNoteForm';
import EditNoteForm from "../../components/EditNoteForm/EditNoteForm";
import './NotesPage.css';

export default function NotesPage({ user }) {
  const [notes, setNotes] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Function to add a note
  const addNote = (newNote) => {
    setNotes([...notes, newNote]);

  };

// GETTING ALL NOTES FROM DB, FROM UTILITIES/API
useEffect(() => {
  async function getNotes() {
    try {
      const fetchedNotes = await notesAPI.getAll();
      setNotes(fetchedNotes);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  }
  getNotes();
}, []);

// TOGGLE ORDER 
  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };

  //  SORTING THE ORDER FROM ASC TO DESC
  useEffect(() => {
    const sortedNotes = [...notes].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return isAscending ? dateA - dateB : dateB - dateA;
    });
    setNotes(sortedNotes);
  }, [isAscending]);

// DELETE
async function handleDelete(noteToDelete) {
  const originalNotes = [...notes];
  setNotes(notes.filter(note => note._id !== noteToDelete._id));
  try {
    await notesAPI.deleteNote(noteToDelete._id);
  } catch (err) {
    console.error(err);
    setNotes(originalNotes);
    alert('Failed to delete the note');
  }
}

 // Editing and Saving Changes
 async function handleSaveChanges(noteId, formData) {
  const originalNotes = [...notes];
  try {
    const id = typeof noteId === 'object' ? noteId._id.toString() : noteId;
    const updatedNote = await notesAPI.editNote(id, formData);
    const updatedNotes = notes.map(note => (note._id === noteId ? updatedNote : note));
    setNotes(updatedNotes);
    setEditingNoteId(null);
    const fetchedNotes = await notesAPI.getAll();
    setNotes(fetchedNotes);
  } catch (err) {
    console.error("Error updating note:", err);
    setNotes(originalNotes);
  }
}

return (
  <div className="notes-container">
    <div className="note-form">
      <AddNoteForm addNote={addNote} user={user} />
    </div>
    <div className="note-list">
      <button onClick={toggleOrder}>Toggle Order</button>
      <NoteList
        key={notes.length}
        notes={notes}
        deleteNote={handleDelete}
        setEditingNoteId={setEditingNoteId}
      />
    </div>
    {editingNoteId && (
      <EditNoteForm
        note={notes.find(note => note._id === editingNoteId)}
        onSave={handleSaveChanges}
        onCancel={() => setEditingNoteId(null)}
      />
    )}
  </div>
);
}

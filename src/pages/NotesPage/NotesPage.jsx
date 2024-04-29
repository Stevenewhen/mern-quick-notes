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

// GETTING ALL NOTES FROM DB
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

// DELETE
async function handleDelete(noteToDelete) {
  const originalNotes = [...notes]; // Copy current notes
  setNotes(notes.filter(note => note._id !== noteToDelete._id)); // Optimistically remove the note

  try {
    await notesAPI.deleteNote(noteToDelete._id);
  } catch (err) {
    console.error(err);
    setNotes(originalNotes); // Revert on error
    alert('Failed to delete the note'); // Inform user
  }
}


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

  // Editing and Saving Changes
  const handleEdit = (noteId) => {
    setEditingNoteId(noteId);  // Set current editing note ID
  };


  const handleSaveChanges = (noteId, formData) => {
    notesAPI.updateNote(noteId, formData)
      .then(updatedNote => {
        setNotes(notes.map(note => note._id === noteId ? {...note, ...updatedNote} : note));
        setEditingNoteId(null);
      })
      .catch(err => {
        console.error('Error updating the note:', err);
        alert('Failed to update the note: ' + err.message);
      });
};


  return (
    <div className="notes-container">
        <div className="note-form">
            <AddNoteForm addNote={addNote} user={user} />
        </div>
        <div className="note-list">
            <button onClick={toggleOrder}>Toggle Order</button>
            <NoteList
            notes={notes}
            deleteNote={handleDelete}
            setEditingNoteId={handleEdit}
            editingNoteId={editingNoteId}
        />
        </div>
        {editingNoteId && (
        <EditNoteForm
            note={notes.find(note => note._id === editingNoteId)}
            onSave={(formData) => handleSaveChanges(editingNoteId, formData)}
            onCancel={() => setEditingNoteId(null)}
        />
    )}
    </div>
);
}
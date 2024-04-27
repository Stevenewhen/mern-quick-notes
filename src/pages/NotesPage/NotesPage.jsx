import React, { useState, useEffect } from "react";
import { getAll, deleteNote } from '../../utilities/notes-api';
import NoteList from '../../components/NoteList/NoteList';
import AddNoteForm from '../../components/AddNoteForm/AddNoteForm';
import './NotesPage.css';

export default function NotesPage({ user }) {
  const [notes, setNotes] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    async function getNotes() {
      try {
        const fetchedNotes = await getAll();
        setNotes(fetchedNotes);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    }
  
    getNotes();
  }, []);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const handleDelete = async (noteToDelete) => {
    try {
      await deleteNote(noteToDelete._id);
      setNotes(notes.filter(note => note._id !== noteToDelete._id));
    } catch (err) {
      console.error(err);
    }
  };
  

  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };


  useEffect(() => {
    const sortedNotes = [...notes].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return isAscending ? dateA - dateB : dateB - dateA;
    });
    setNotes(sortedNotes);
  }, [isAscending]);

  return (
    <div className="notes-container">
      <div className="note-form">
        <AddNoteForm addNote={addNote} user={user} />
      </div>
        <div className="note-list">
          <button onClick={toggleOrder}>Toggle Order</button>
          <NoteList notes={notes} deleteNote={handleDelete} />
        </div>
    </div>
  );
}

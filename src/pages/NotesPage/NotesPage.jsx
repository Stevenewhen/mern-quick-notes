import React, { useState, useEffect } from "react";
import * as notesAPI from '../../utilities/notes-api';
import './NotesPage.css';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedNotes = await notesAPI.getAll();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
  
    fetchData();
  }, []);
  

  const handleAddNote = async () => {
    try {
      const addedNote = await notesAPI.createNote({ text: newNoteText });
      setNotes([...notes, addedNote]);
      setNewNoteText("");
    } catch (error) {
      console.error("Error adding note:", error.message);
    }
  };
  

  return (
    <div className="notes-container">
      <div className="note-form">
        <textarea
          value={newNoteText}
          onChange={(evt) => setNewNoteText(evt.target.value)}
          placeholder="Enter your note"
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note-item">
            <p>{note.text}</p>
            <p>{note.name}</p>
            <p>{new Date(note.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

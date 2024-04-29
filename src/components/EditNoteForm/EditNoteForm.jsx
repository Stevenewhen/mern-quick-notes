import React, { useState } from 'react';
import * as notesAPI from '../../utilities/notes-api';

export default function EditNoteForm({ note, onSave, onCancel }) {
    const [formData, setFormData] = useState({ text: note.text });

    const handleChange = (evt) => {
        setFormData({ ...formData, text: evt.target.value });
    };
    

    const handleEditNote = async (evt) => {
        evt.preventDefault();
    
        try {
            const updatedNote = await notesAPI.editNote(note._id, formData);
            onSave(updatedNote);
        } catch (err) {
            console.error("Error updating note:", err);
            alert("Failed to update the note: " + err.message);
        }
    };
    

    return (
        <form onSubmit={handleEditNote}>
            <input
                type="text"
                value={formData.text}
                onChange={handleChange}
                placeholder="Edit your note"
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}

import React, { useState } from 'react';

export default function EditNoteForm({ note, onSave, onCancel }) {
    const [formData, setFormData] = useState({ text: note.text });

    const handleChange = (evt) => {
        setFormData({ ...formData, text: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSave(note._id, formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={formData.text}
                onChange={handleChange}
            />
            <button type="submit">Save Changes</button>  // Use type="submit" here
            <button type="button" onClick={onCancel}>Cancel</button> // Proper use of onClick for cancel
        </form>
    );
}

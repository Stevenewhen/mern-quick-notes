import NoteListItem from '../NoteListItem/NoteListItem';

export default function NoteList({ notes, deleteNote, setEditingNoteId }) {
  return (
      <div className="note-list">
          {notes.map(note => (
              <NoteListItem
                  key={note._id}
                  note={note}
                  handleDelete={deleteNote}
                  setEditing={setEditingNoteId}
              />
          ))}
      </div>
  );
}

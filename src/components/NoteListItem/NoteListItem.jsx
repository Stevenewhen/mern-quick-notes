export default function NoteListItem({ noteItem }) {
    return (
      <div>
        <p>{noteItem.text}</p>
        <p>Created by: {noteItem.user ? noteItem.user.name : 'Unknown'}</p>
        <p>Created at: {new Date(noteItem.createdAt).toLocaleString()}</p>
      </div>
    );
  }
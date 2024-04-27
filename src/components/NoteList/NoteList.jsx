import NoteListItem from '../NoteListItem/NoteListItem';

export default function NoteList({ notes }) {
    if (notes.length === 0) {
        return <p>No Notes Yet!</p>;
    }

    return (
        <ul>
            {notes.map(note => (
                <NoteListItem key={note._id} noteItem={note} />
            ))}
        </ul>
    );
}

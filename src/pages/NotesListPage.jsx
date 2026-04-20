import { Link, useNavigate } from "react-router-dom";
import { useNotesStore } from "../hooks/useNotesStore";
import { encryptData } from "../utils/crypto";


export default function NotesListPage() {
    const { notes, sorted, deleteNote, toggleComplete } = useNotesStore();
    const navigate = useNavigate();

    function handleNoteClick(note){
        const encrypted = encryptData(note);
        const encoded = encodeURIComponent(encrypted);

        navigate (`/detail?data=${encoded}`);
    }
    function handleDelete(e, noteId){
        e.stopPropagation();
        deleteNote(noteId)
    }
    function handleToggleComplete(e, noteId){
        e.stopPropagation();
        toggleComplete(noteId)
    }
    return (
        <div className="container">
            <h1 className="title">All Notes</h1>
            <Link to = "/new" className="create-btn">Create New Note</Link>
            {notes.length === 0 ? (
                <p>No notes yet.</p>
            ):(
                <div className="notes-grid">
                    {sorted.sort((a, b) => Number(a.completed) - Number(b.completed)).map((note)=> (
                        <div className={`note-card ${note.completed ? "completed-card": ""}`}
                            key = {note.id} 
                            onClick={()=> handleNoteClick(note)}>
                            <div>
                            <div className="note-title">{note.title}</div>
                            <div className="note-category" >{note.category}</div>
                            </div>
                            <div className="note-actions">
                                <button 
                                className="small-btn done-btn"
                                onClick={(e)=> handleToggleComplete(e,note.id)}
                                >
                                    {note.completed ? "Undo" : "Done"}
                                </button>
                                <button
                                className="small-btn delete-btn"
                                onClick={(e)=> handleDelete(e, note.id)}>Delete</button>
                            </div>   
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


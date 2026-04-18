import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "@tanstack/react-store";
import { notesStore, updateNote } from "../store/notesStore";

export default function EditNotePage(){
    const { id } = useParams();
    const notes = useStore(notesStore, (state)=> state.notes);
    const navigate = useNavigate();

    const existingNote = notes.find((note)=>note.id === id);
    const [title, setTitle] = useState(existingNote?.title || "");
    const [content, setContent] = useState(existingNote?.content || "");
    const [category, setCategory] = useState(existingNote?.category || "");
    const [deadline, setDeadLine] = useState(existingNote?.deadline || "");


    if (!existingNote){
        return (
            <div className="container">Note not found</div>
        );
    }

    function handleSubmit(e){
        e.preventDefault();
        const updatedNote = {
            ...existingNote,
            title,
            content,
            category,
            deadline
        };

        updateNote(updatedNote);
        navigate("/");
    }
    return(
        <div className="container">
            <div className="form-card">
                <h1 className="title">Edit Note</h1>
                <form onSubmit= {handleSubmit} className="note-form">
                    <div className="form-group">
                    <label>Title</label>
                    <input
                        type = "text"
                        value = {title}
                        onChange={(e)=> setTitle(e.target.value)}
                        placeholder="Write your title"
                    />
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            value = {content}
                            onChange={(e)=> setContent(e.target.value)}
                            placeholder="Update your note..."
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type = "text"
                            value = {category}
                            onChange={(e)=> setCategory(e.target.value)}
                            placeholder="e.g. Study, Shopping, Health"
                        />
                    </div>
                    <div className="form-group">
                        <label>Deadline</label>
                        <input
                            type = "date"
                            value = {deadline}
                            onChange={(e)=> setDeadLine(e.target.value)}
                        />
                    </div>
                    <button type = "submit" className="save-btn">Save Changes</button>
                </form>
            </div>
        </div>
    )

}
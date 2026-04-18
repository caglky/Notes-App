import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addNote } from "../store/notesStore";

export default function NewNotePage(){
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [customCategory, setCustomCategory] = useState("")
    const [deadline, setDeadline] = useState("");


    function handleSubmit(e){
        e.preventDefault();
        const now = new Date().toISOString();
        
        const finalCategory = category == "other" ? customCategory.trim() : category;
        const newNote = {
            id: crypto.randomUUID,
            title,
            content,
            category : finalCategory, 
            deadline,
            createdAt: now,
            completed: false,
        };
        addNote(newNote);
        navigate("/");
    };

    return (
        <div className="container">
            <div className="form-card">
                <h1 className="title">New Note</h1>
                    <form onSubmit={handleSubmit} className="note-form">
                        <div className="form-group">
                            <label>Title</label>
                            <input  
                            type="text"
                            value = {title}
                            onChange = {(e)=> setTitle(e.target.value)} 
                            placeholder="Enter title..."
                            />
                        </div>
                        <div className="form-group">
                            <label>Content</label>
                            <textarea
                                type="text"
                                value={content}
                                onChange={(e)=> setContent(e.target.value)}
                                placeholder="Add content..." 
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select 
                            value = {category} 
                            onChange = {(e)=> setCategory(e.target.value)} 
                            className="category-select"
                            >
                                <option value="">Select a category</option>
                                <option value="shopping">Shopping</option>
                                <option value="study">Study</option>
                                <option value="health">Health</option>
                                <option value="work">Work</option>
                                <option value="personel">Personal</option>
                                <option value="other">Other</option>
                            </select>
                            {category === "other" && (
                                <div className="form-group">
                                    <label>Custom Category</label>
                                    <input 
                                    type="text" 
                                    value={customCategory}
                                    onChange = {(e)=> setCustomCategory(e.target.value)}
                                    placeholder="Write your category"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Deadline</label>
                            <input 
                            type = "date"
                            value = {deadline} 
                            onChange = {(e)=> setDeadline(e.target.value)} />
                        </div>
                        <button type = "submit" className="save-btn">Save Note</button>
                    </form>
            </div>
        </div>
        );
}  
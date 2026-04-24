import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "@tanstack/react-store";
import { notesStore, updateNote } from "../store/notesStore";
import { encryptData } from "../utils/crypto";

export default function EditNotePage(){
    const { id } = useParams();
    const notes = useStore(notesStore, (state)=> state.notes);
    const navigate = useNavigate();

    const existingNote = notes.find((note)=>note.id === id);
    const [title, setTitle] = useState(existingNote?.title || "");
    const [content, setContent] = useState(existingNote?.content || "");
    const [category, setCategory] = useState("")
    const [customCategory, setCustomCategory] = useState("")
    const [categoryOptions, setCategoryOptions] = useState(()=>{
        const savedCategories = localStorage.getItem("category-options");
        if (savedCategories){
            return JSON.parse(savedCategories);
        }
        return ["Shopping", "Study", "Health", "Work", "Personal"]
    })
    const [deadline, setDeadLine] = useState(existingNote?.deadline || "")
    const today = new Date().toISOString().split("T")[0];

    if (!existingNote){
        return (
            <div className="container">Note not found</div>
        );
    }

    function capitalize(text){
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    function handleSubmit(e){
        e.preventDefault();
        if (!title.trim() || !content.trim() || !category || !deadline){
            return alert("Please fill in all required fields")
        }
        if (category === "other" && !customCategory.trim()){
            return alert("Please fill in all required fields")
        }
        
        let finalCategory = category;
        if (category === "other"){
            finalCategory= capitalize(customCategory.trim());
        if (!finalCategory){
            alert("Please write a custom category.")
            return
        }
        const exists = categoryOptions.some(
            (category) => category.toLowerCase()===finalCategory.toLowerCase()
        );
        if (!exists){
            const updatedCategories = [...categoryOptions, finalCategory];
            setCategoryOptions(updatedCategories);
            localStorage.setItem("category-options", JSON.stringify(updatedCategories))
        }

        }

        const updatedNote = {
            ...existingNote,
            title,
            content,
            category,
            deadline
        };
        console.log(existingNote)
        const encrypted = encryptData(existingNote);
        const encoded = encodeURIComponent(encrypted);
        updateNote(updatedNote);
        navigate(`/detail?data=${encoded}`);
    }

    return(
        <div className="container">
            <div className="form-card">
                <h1 className="title">Edit Note</h1>
                <form onSubmit= {handleSubmit} className="note-form" noValidate>
                    <div className="form-group">
                    <label>Title</label>
                    <input
                        type = "text"
                        value = {title}
                        onChange={(e)=> setTitle(e.target.value)}
                        placeholder="Write your title"
                        required
                    />
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            value = {content}
                            onChange={(e)=> setContent(e.target.value)}
                            placeholder="Update your note..."
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                            <select 
                            value = {category} 
                            onChange = {(e)=> setCategory(e.target.value)} 
                            className="category-select"
                            required
                            >
                                <option value="">Select a category</option>
                                {categoryOptions.map((category)=> (
                                    <option key = {category} value={category}>{category}</option>
                                ))}
                                <option value={"other"}>Other</option>
                            </select>
                            {category === "other" && (
                                <div className="form-group">
                                    <label>Custom Category</label>
                                    <input 
                                    type="text" 
                                    value={customCategory}
                                    onChange = {(e)=> setCustomCategory(e.target.value)}
                                    placeholder="Write your category"
                                    required
                                    />
                                </div>
                            )}
                    </div>
                    <div className="form-group">
                        <label>Deadline</label>
                        <input
                            type = "date"
                            value = {deadline}
                            min={today}
                            onChange={(e)=> setDeadLine(e.target.value)}
                            required
                        />
                    </div>
                    <button type = "submit" className="save-btn">Save Changes</button>
                </form>
            </div>
        </div>
    )

}
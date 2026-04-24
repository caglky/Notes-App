import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../store/notesStore";
import { v4 as randomUUID} from "uuid"

export default function NewNotePage(){
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("")
    const [customCategory, setCustomCategory] = useState("")
    const [categoryOptions, setCategoryOptions] = useState(()=>{
        const savedCategories = localStorage.getItem("category-options");
        if (savedCategories){
            return JSON.parse(savedCategories);
        }
        return ["Shopping", "Study", "Health", "Work", "Personal"]
    })
    const [deadline, setDeadline] = useState("");
    const today = new Date().toISOString().split("T")[0]

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
        const now = new Date().toISOString();
        
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
        const newNote = {
            id: randomUUID(),
            title,
            content,
            category : finalCategory, 
            deadline,
            createdAt: now,
            isCompleted: false,
        };

        addNote(newNote);
        navigate("/");
    };

    return (
        <div className="container">
            <div className="form-card">
                <h1 className="title">New Note</h1>
                    <form onSubmit={handleSubmit} className="note-form" noValidate>
                        <div className="form-group">
                            <label>Title</label>
                            <input  
                            type="text"
                            value = {title}
                            onChange = {(e)=> setTitle(e.target.value)} 
                            placeholder="Enter title..."
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label>Content</label>
                            <textarea
                                type="text"
                                value={content}
                                onChange={(e)=> setContent(e.target.value)}
                                placeholder="Add content..." 
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
                            onChange = {(e)=> setDeadline(e.target.value)}
                            required />
                        </div>
                        <button type = "submit" className="save-btn">Save Note</button>
                    </form>
            </div>
        </div>
        );
}  
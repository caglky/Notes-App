import { Link, useLocation, useNavigate } from "react-router-dom";
import { decryptData } from "../utils/crypto";
import { deleteNote, toggleComplete } from "../store/notesStore";

export default function NoteDetailPage(){
    const location = useLocation(); //bulundığun sayfanın URL bilgisini verir
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search); 
    //location.URL = URL'in soru işaretinden sornaki kısmını verir
    //URLSearchParams = location.URL sonrası metni okunabilir hale getiri
    const data = params.get("data"); //okunabilir halden sadece data değerini alır
    // data değişkeni içinde şifreli veri var 
    if (!data) {
        return (
        <div className="container">
            <div className="detail-box">
                <p>No data found</p>
                <Link to = "/" className="back-btn">Go Back</Link>
            </div>
        </div>
    );
    } //data yoksa diye kontrol 

    const decoded = decodeURIComponent(data); 
    const note = decryptData(decoded);

    if(!note){
        return (
        <div className="container">
            <div className="detail-box">
                <p>Invalid Data</p>
                <Link to = "/" className="back-btn">Go Back</Link>
            </div>
        </div>
    );
    }

    const formattedDate = new Date(note.createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const formattedDeadline = note.deadline ? new Date(note.deadline).toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    }) : "No deadline";

    function handleDelete(){
        deleteNote(note.id);
        navigate("/");
    }

    function handleToggleComplete(){
        toggleComplete(note.id);
        navigate("/");
    }

    return(
        <div className="container">
            <div className="detail-box">
                <div className="detail-header">
                    <h1 className="detail-title">{note.title}</h1>
                    <span className="detail-category">{note.category}</span>
                </div>
                <div className="detail-meta">
                    <div className="meta-item">
                        <span className="meta-label">Created At: </span>
                        <span className="meta-value">{formattedDate}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Deadline: </span>
                        <span className="meta-value">{formattedDeadline}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Status: </span>
                        <span className= {`status-badge ${note.isCompleted ? "completed" : "pending"}`}>
                            {note.isCompleted ? "Completed": "Pending"}
                        </span>
                    </div>
                </div>
                <div className="detail-content-box">
                    <h3>Content</h3>
                    <p>{note.content}</p>
                </div>

                <div className="detail-actions">
                    <Link to={`/edit/${note.id}`} className="action-btn edit-btn" >Edit</Link>
                </div>
                <button className="action-btn done-btn" onClick={handleToggleComplete}>
                    {note.isCompleted? "Mark as Pending" : "Mark as Completed"}
                </button>
                <button className="action-btn delete-btn" onClick={handleDelete}>Delete</button>
                <Link to = "/" className="action-btn back-btn">Back to Notes</Link>
             </div>   
        </div>
    );
}
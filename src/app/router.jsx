import { createBrowserRouter } from "react-router-dom";
import NotesListPage from "../pages/NotesListPage";
import NewNotePage from "../pages/NewNotePage";
import NoteDetailPage from "../pages/NoteDetailPage";
import EditNotePage from "../pages/EditNotePages";

export const router = createBrowserRouter([
    {
        path : "/",
        element : <NotesListPage />
    },
    {
        path : "/new",
        element : <NewNotePage />
    },
    {
        path: "/detail",
        element : <NoteDetailPage />
    },
    {
        path : "/edit/:id",
        element : <EditNotePage />
    }
]);
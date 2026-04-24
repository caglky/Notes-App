import { createStore } from "@tanstack/react-store";

export const notesStore = createStore({
    notes: [],
});

export function setNotes(notes){
    notesStore.setState(()=> ({
        notes,
    }));
}

export function addNote(note){
    notesStore.setState((state) => ({
        ...state,
        notes: [...state.notes, note],
    }));
}

export function deleteNote(noteId){
    notesStore.setState((state)=> ({
        ...state,
        notes: state.notes.filter((note)=>note.id !== noteId),
    }));
}

export function updateNote(updateNote){
    notesStore.setState((state)=> ({
        ...state, 
        notes: state.notes.map((note)=> note.id === updateNote.id ? updateNote : note),
    }));
}

export function toggleComplete(noteId){
    notesStore.setState((state) => ({
        ...state,
        notes: state.notes.map ((note) => note.id === noteId ? {
            ...note,
            isCompleted: !note.isCompleted,
        }: note),
    }));
}

//functionlar 
import { createStore } from "@tanstack/react-store";

const notesStore = createStore({
    notes: [],
});

function setNotes(notes){
    notesStore.setState(()=> ({
        notes,
    }));
}

function addNote(note){
    notesStore.setState((state) => ({
        ...state,
        notes: [...state.notes, note],
    }));
}

function deleteNote(noteId){
    notesStore.setState((state)=> ({
        ...state,
        notes: state.notes.filter((note)=>note.id !== noteId),
    }));
}

function updateNote(updateNote){
    notesStore.setState((state)=> ({
        ...state, 
        notes: state.notes.map((note)=> note.id === updateNote.id ? updateNote : note),
    }));
}

function toggleComplete(noteId){
    notesStore.setState((state) => ({
        ...state,
        notes: state.notes.map ((note) => note.id === noteId ? {
            ...note,
            completed: !note.completed,
        }: note),
    }));
}

export const notesStoreApi = {
    notesStore,
    setNotes,
    addNote,
    deleteNote,
    updateNote,
    toggleComplete,
};

import { useStore } from "@tanstack/react-store";
import { notesStoreApi } from "../store/notesStore";

export function useNotesStore() {
    const notes = useStore(notesStoreApi.notesStore, (state) => state.notes);

    const sorted = notes.sort((a, b) => Number(a.completed) - Number(b.completed));

    return {
        notes,
        sorted,
        setNotes: notesStoreApi.setNotes,
        addNote: notesStoreApi.addNote,
        deleteNote: notesStoreApi.deleteNote,
        updateNote: notesStoreApi.updateNote,
        toggleComplete: notesStoreApi.toggleComplete,
    };
}

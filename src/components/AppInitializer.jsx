import { useEffect, useState } from "react";
import { useNotesStore } from "../hooks/useNotesStore";
import { useNotesStorage } from "../hooks/useNotesStorage";

export default function AppInitializer(){
    const { notes, setNotes } = useNotesStore();
    const [isLoaded, setIsLoaded] = useState(false);
    const { loadNotesFromLocalStorage, saveNotesToLocalStorage } = useNotesStorage();

    useEffect(()=> {
        const storedNotes = loadNotesFromLocalStorage();
        setNotes(storedNotes);
        setIsLoaded(true);
    }, [loadNotesFromLocalStorage, setNotes]);

    useEffect(()=> {
        if(!isLoaded) return;
        saveNotesToLocalStorage(notes)
    }, [notes, isLoaded]);
    return null;
}


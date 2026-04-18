import { useEffect, useState } from "react";
import { useStore } from "@tanstack/react-store";
import {notesStore, setNotes} from "../store/notesStore";
import { loadNotesFromLocalStorage, saveNotesToLocalStorage } from "../utils/storage";

export default function AppInitializer(){
    const notes  = useStore(notesStore, (state)=> state.notes);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=> {
        const storedNotes = loadNotesFromLocalStorage();
        setNotes(storedNotes);
        setIsLoaded(true);
    }, []);

    useEffect(()=> {
        if(!isLoaded) return;
        saveNotesToLocalStorage(notes)
    }, [notes, isLoaded]);
    return null;
}


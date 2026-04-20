import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCrypto } from "./useCrypto";

const STORAGE_KEY = "notes-app-data";

export function useNotesStorage() {
    const { encryptData, decryptData } = useCrypto("cagla");

    const saveNotesToLocalStorage = useCallback(
        (notes) => {
            try {
                // const encryptedNotes = encryptData(notes);
                const encryptedNotes = notes.map((data)=>{ return encryptData(data)});
                console.log("Encrypted notes:", encryptedNotes);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(encryptedNotes));
            } catch (error) {
                console.error("Save to localStorage error:", error);
            }
        },
        [encryptData]
    );

    const loadNotesFromLocalStorage = useCallback(() => {
        try {
            const encryptedNotes = localStorage.getItem(STORAGE_KEY);

            if (!encryptedNotes) {
                return [];
            }

            const decryptedNotes = JSON.parse(encryptedNotes).map((data) => {return decryptData(data)});
            console.log("Decryption: ", decryptedNotes);

            if (!decryptedNotes) {
                return [];
            }

            if (!Array.isArray(decryptedNotes)) {
                return decryptedNotes;
            }

            return decryptedNotes;

            // return decryptedNotes.map((note) => ({
            //     ...note,
            //     id: note?.id ?? uuidv4(),
            // }));
        } catch (error) {
            console.error("Load from localStorage error:", error);
            return [];
        }
    }, [decryptData]);

    return { saveNotesToLocalStorage, loadNotesFromLocalStorage };
}

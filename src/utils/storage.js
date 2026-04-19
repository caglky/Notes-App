import { encryptData, decryptData } from "./crypto";

const STORAGE_KEY = "notes-app-data";

export function saveNotesToLocalStorage(notes){ 
    try {
        const encrytedNotes = encryptData(notes); 
        localStorage.setItem(STORAGE_KEY, encrytedNotes); 
        } catch (error){
            console.error( "Save to localStorage error: ", error)
        }
    }

export function loadNotesFromLocalStorage (){
    try{
        const encrytedNotes = localStorage.getItem(STORAGE_KEY); 
        if (!encrytedNotes) {
            return [];
        }
        const decryptedNotes = decryptData(encrytedNotes); 
        if (!decryptedNotes){
            return [];
        }
        return decryptedNotes;
    } catch (error){
        console.error("Load from localstorag error: ", error);
        return [];
    }
}

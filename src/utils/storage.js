import { encryptData, decryptData } from "./crypto";

const STORAGE_KEY = "notes-app-data";

export function saveNotesToLocalStorage(notes){ 
    try {
        const encrytedNotes = encryptData(notes); //not dizisi alır, şifreler
        localStorage.setItem(STORAGE_KEY, encrytedNotes); //localstorage'a kaydeder
        } catch (error){
            console.error( "Save to localStorage error: ", error)
        }
    }

export function loadNotesFromLocalStorage (){
    try{
        const encrytedNotes = localStorage.getItem(STORAGE_KEY); //localstorage'dan şifreyi alır
        if (!encrytedNotes) {
            return [];
        }
        const decryptedNotes = decryptData(encrytedNotes); //şifreyi çözer
        if (!decryptedNotes){
            return [];
        }
        return decryptedNotes;
    } catch (error){
        console.error("Load from localstorag error: ", error);
        return [];
    }
}
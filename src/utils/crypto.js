import CryptoJS from "crypto-js";

const secret_key = "secret";  

export function encryptData (data){ 
    const jsonString = JSON.stringify(data); 
    const encryted = CryptoJS.AES.encrypt(jsonString, secret_key).toString(); 
    return encryted;
}

export function decryptData (encryptData){
    try{
        const decryted = CryptoJS.AES.decrypt(encryptData, secret_key); 
        const decryptedString = decryted.toString(CryptoJS.enc.Utf8); 
        if (!decryptedString){
            return null; //veri bozuksa null döner 
        }
        return JSON.parse(decryptedString);
    } catch (error){
        console.log("Decryption error: ", error);
        return null;
    }
}

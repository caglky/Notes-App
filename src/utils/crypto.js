import CryptoJS from "crypto-js";

const secret_key = "secret";  //şifreleme ve çözme için kullanılan anahtar 

export function encryptData (data){ 
    const jsonString = JSON.stringify(data); //gelen objeyi string'e çevirir
    const encryted = CryptoJS.AES.encrypt(jsonString, secret_key).toString(); //AES ile şifreler, string olarak döndürür
    return encryted;
}

export function decryptData (encryptData){
    try{
        const decryted = CryptoJS.AES.decrypt(encryptData, secret_key); //şifreli veri çözülüyor
        const decryptedString = decryted.toString(CryptoJS.enc.Utf8); //tekrar string alınıyor 
        if (!decryptedString){
            return null; //veri bozuksa null döner 
        }
        return JSON.parse(decryptedString);
    } catch (error){
        console.log("Decryption error: ", error);
        return null;
    }
}
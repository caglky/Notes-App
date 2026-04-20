import { useCallback } from "react";
import CryptoJS from "crypto-js";

const SECRET_KEY = "secret";

export function useCrypto({key}) {
    const encryptData = useCallback((data) => {
        const jsonString = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(jsonString, key ?? SECRET_KEY).toString();
        return encrypted;
    }, []);

    const decryptData = useCallback((encryptedData) => {
        try {
            const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
            const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);

            if (!decryptedString) {
                return null;
            }

            return JSON.parse(decryptedString);
        } catch (error) {
            console.log("Decryption error:", error);
            return null;
        }
    }, []);

    return { encryptData, decryptData };
}

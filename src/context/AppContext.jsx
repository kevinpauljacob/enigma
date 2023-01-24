import { createContext, useState } from "react";
import CryptoJS from "crypto-js";

import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore"; 
import { db } from '../../firebase-config'

export const AppContext = createContext();

export const AppProvider = ( {children} ) => {
    const [encryptSection, setEncryptSection] = useState(true);
    const [copySection, setCopySection] = useState(false);
    const [decryptSection, setDecryptSection] = useState(false);
  
    const [messageRequiredError, setMessageRequiredError] = useState(false);
    const [secretRequiredError, setSecretRequiredError] = useState(false);

    const [invalidMessage, setInvalidMessage] = useState(false);
    const [invalidSecret, setInvalidSecret] = useState(false);
  
    const [encryptMsgIn, setEncryptMsgIn] = useState("");
    const [encryptedMsgOut, setEncryptedMsgOut] = useState("");

    const [decryptMsgIn, setDecryptMsgIn] = useState("");
    const [decryptedMsgOut, setDecryptedMsgOut] = useState("");
  
    const [secretPass, setSecretPass] = useState("");

    const msgEncryptionHandler = async () => {
        // const salt = import.meta.env.VITE_ENCRYPTION_SALT;
        const data = CryptoJS.AES.encrypt(
            JSON.stringify(encryptMsgIn),
            secretPass
        ).toString();
    
        setEncryptedMsgOut(data);
        setEncryptedMsgOut(data);

        if(secretPass && encryptMsgIn && encryptedMsgOut) {
            setEncryptSection(false);
            setCopySection(true);
            setDecryptSection(false);
        } 

        setEncryptMsgIn("");
    }

    const msgDecryptionHandler = async () => {
        const link = decryptMsgIn.replaceAll("/", "");
        const docRef = doc(db, "links", link);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setInvalidMessage(false);
            // const salt = import.meta.env.VITE_ENCRYPTION_SALT;
            const bytes = CryptoJS.AES.decrypt(decryptMsgIn, secretPass);
            const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            setDecryptedMsgOut(data);
        } else {
            setInvalidMessage(true);
        }
    }

    const burnMsg = async () => {
        const link = decryptMsgIn.replaceAll("/", "");
        await deleteDoc(doc(db, "links", link));
        setDecryptedMsgOut("");
        setDecryptMsgIn("");
        setSecretPass("")
    }

    return (
        <AppContext.Provider value={{
                encryptSection,
                copySection, 
                decryptSection, 
                messageRequiredError, 
                secretRequiredError, 
                invalidMessage, 
                invalidSecret, 
                encryptMsgIn, 
                encryptedMsgOut, 
                decryptMsgIn, 
                decryptedMsgOut, 
                secretPass,
                setEncryptSection,
                setCopySection, 
                setDecryptSection, 
                setMessageRequiredError, 
                setSecretRequiredError, 
                setInvalidMessage, 
                setInvalidSecret, 
                setEncryptMsgIn, 
                setEncryptedMsgOut, 
                setDecryptMsgIn, 
                setDecryptedMsgOut, 
                setSecretPass,
                msgEncryptionHandler,
                msgDecryptionHandler,
                burnMsg,
        }}>
            {children}
        </AppContext.Provider>
    );
}


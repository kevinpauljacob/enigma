import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

import { useEffect } from 'react'
import { BsBoxArrowLeft } from 'react-icons/bs'

import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../firebase-config'

import EncryptSection from './EncryptSection'
import CopySection from './CopySection'
import DecryptSection from './DecryptSection'

const Form = () => {

    const {
        encryptSection,
        copySection, 
        decryptSection, 
        setEncryptSection,
        setCopySection, 
        setDecryptSection, 
        setInvalidMessage, 
        encryptedMsgOut,
        setDecryptMsgIn, 
        setDecryptedMsgOut, 
        setSecretPass,
        msgEncryptionHandler,
    } = useContext(AppContext);

    useEffect(() => {
        msgEncryptionHandler();
    }, []);

  return (
    <div className="w-full rounded-md">
        {encryptSection &&
            <EncryptSection />
        }
        {copySection &&
            <CopySection />
        }
        {decryptSection &&
            <DecryptSection />
        }
        <div className='text-lg flex flex-col items-start mt-10 pl-1'>   
            {!encryptSection && 
                <div 
                    onClick={() => {
                        setCopySection(false)
                        setEncryptSection(true)
                        setDecryptSection(false)
                        setDecryptMsgIn("")
                        setDecryptedMsgOut("")
                        setInvalidMessage(false)
                        setSecretPass("")
                    }}
                    className='flex items-center hover:text-[#39FF14] ease-in duration-300 cursor-pointer'
                > 
                    <span className='pr-2'>
                        <BsBoxArrowLeft size={20}/>
                    </span>
                    Generate New Secret Message
                </div> 
            }
            {!decryptSection && 
                <div 
                    onClick={ async () => {
                        setCopySection(false)
                        setEncryptSection(false)
                        setDecryptSection(true)
                        setDecryptMsgIn("")
                        setDecryptedMsgOut("")
                        setSecretPass("")
                        const link = encryptedMsgOut.replaceAll("/", "");
                        await setDoc(doc(db, "links", link), {})
                    }}
                    className='flex items-center hover:text-[#39FF14] ease-in duration-300 cursor-pointer'
                >
                    <span className='pr-2'>
                        <BsBoxArrowLeft size={20}/>
                    </span>
                    Decrypt a message?
                </div> 
            }
        </div>
    </div>
  )
}

export default Form
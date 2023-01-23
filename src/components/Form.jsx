import { useState, useEffect } from 'react'
import { AiOutlineLock } from 'react-icons/ai'
import { BsBoxArrowLeft } from 'react-icons/bs'
import { RiErrorWarningLine } from 'react-icons/ri'
import { BiShareAlt, BiCopy  } from 'react-icons/bi'
import CryptoJS from "crypto-js";

import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore"; 
import { db } from '../../firebase-config'

const Form = () => {

  const [generateLink, setGenerateLink] = useState(true);
  const [downloadLink, setDownloadLink] = useState(false);
  const [decryptLink, setDecryptLink] = useState(false);

  const [msgRequiredError, setMsgRequiredError] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);

  const [encryptMsg, setEncryptMsg] = useState("");
  const [encryptedMsg, setEncryptedMsg] = useState("");
  const [decryptMsg, setDecryptMsg] = useState("");
  const [decryptedMsg, setDecryptedMsg] = useState("");



  useEffect(() => {
    msgEncryptionHandler();
  }, []);

  const msgEncryptionHandler = async () => {
    const salt = import.meta.env.VITE_ENCRYPTION_SALT;
    const data = CryptoJS.AES.encrypt(
        JSON.stringify(encryptMsg),
        salt
      ).toString();
  
    setEncryptedMsg(data);
    setEncryptedMsg(data);
    
    // console.log(encryptMsg);
    // console.log(encryptedMsg);

    if(encryptMsg && encryptedMsg) {
        setGenerateLink(false);
        setDownloadLink(true);
        setDecryptLink(false);
    } 
    
    if(!encryptMsg) {
        setMsgRequiredError(true);
    }

    setEncryptMsg("");
  }

  const msgDecryptionHandler = async () => {
    const link = decryptMsg.replace("/", "");
    const docRef = doc(db, "links", link);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setInvalidLink(false);
        const salt = import.meta.env.VITE_ENCRYPTION_SALT;
        const bytes = CryptoJS.AES.decrypt(decryptMsg, salt);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setDecryptedMsg(data);
      } else {
        setInvalidLink(true);
      }

    // console.log(decryptMsg);
    // console.log(decryptedMsg);
  }

  const burnMsg = async () => {
    const link = decryptMsg.replace("/", "");
    await deleteDoc(doc(db, "links", link));
    setDecryptedMsg("");
    setDecryptMsg("");
  }

  return (
    <div className="w-full rounded-md">
        {generateLink &&
        <div className="flex flex-col items-end bg-[#212121] rounded-md p-3 min-[510px]:p-5">
            <textarea 
                className="scroll text-md min-[510px]:text-lg bg-[#212121] rounded-md border-2 border-[#313131] focus:border-[#616161] focus:outline-none p-3 w-full"
                type="text" 
                name="text" 
                placeholder="Type your Secret Message."
                value={encryptMsg}
                onChange={({target}) => {
                    setEncryptMsg(target.value)
                    setMsgRequiredError(false)
                }}
            />
            <div className='text-sm min-[510px]:text-md flex flex-col min-[510px]:flex-row justify-between items-center w-full mt-5'>
                <div className='flex flex-col justify-between'>
                    <div className='flex items-center'>
                        <span className='text-[#39FF14] pr-1'>
                            <AiOutlineLock size={25}/>
                        </span>
                        <span>End-to-End encrypted</span>
                    </div>
                    { msgRequiredError && 
                        <div className='flex items-center text-red-500 font-semibold mt-2'>
                            <span className='pr-1'>
                                <RiErrorWarningLine size={25}/>
                            </span>
                            Message is compulsory
                        </div>
                    }
                </div>
                <button 
                    onClick={msgEncryptionHandler}
                    className="text-sm min-[510px]:text-lg hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md p-2 mt-3 min-[510px]:mt-0"
                    type="submit"
                >
                    Generate Secret Message
                </button>
            </div>
        </div>
        }
        {downloadLink &&
            <div 
                className='bg-[#212121] rounded-md p-5'>
                <textarea 
                    readOnly
                    value={encryptedMsg}
                    className='scroll text-lg bg-[#212121] rounded-md border-2 border-[#616161] p-3 w-full mb-5 h-full'
                >
                </textarea>
                <div className='flex flex-col min-[510px]:flex-row justify-center'>
                    <button 
                        className='flex hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md p-2 min-[510px]:mr-5'
                        onClick={async () => {
                            navigator.clipboard.writeText(encryptedMsg)
                            const link = encryptedMsg.replace("/", "");
                            await setDoc(doc(db, "links", link), {})
                            window.location = 'mailto:'
                        }}
                    >
                        <span className='pr-1'>
                            <BiShareAlt size={25}/>
                        </span>
                        Share via Mail
                    </button>
                    <button 
                        className='flex hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md p-2 mt-5 min-[510px]:mt-0 min-[510px]:ml-5'
                        onClick={ async () => {
                            navigator.clipboard.writeText(encryptedMsg)
                            const link = encryptedMsg.replace("/", "");
                            await setDoc(doc(db, "links", link), {})
                        }}
                    >
                        <span className='pr-1'>
                            <BiCopy size={25}/>
                        </span>
                        Copy Message
                    </button>
                </div>
            </div>
        }
        {decryptLink &&
            <div className='flex flex-col items-center bg-[#212121] rounded-md p-5'>
                <textarea
                    value={decryptMsg} 
                    onChange={({target}) => {setDecryptMsg(target.value)}}
                    placeholder='Paste your link.'
                    className='scroll text-lg bg-[#212121] rounded-md border-2 border-[#414141] focus:border-[#616161] focus:outline-none p-3 w-full h-full'
                >
                </textarea>
                {invalidLink && 
                        <div className='flex items-center text-red-500 font-semibold mt-5'>
                        <span className='pr-1'>
                            <RiErrorWarningLine size={25}/>
                        </span>
                        Invalid Message
                    </div>
                }
                <button 
                    onClick={msgDecryptionHandler}
                    className="hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md my-5 p-2"
                    type="submit"
                >
                    Decrypt Message
                </button>
                <textarea
                    readOnly
                    value={decryptedMsg} 
                    className='scroll text-lg bg-[#212121] rounded-md border-2 border-[#414141] focus:border-[#616161] focus:outline-none p-3 w-full h-full'
                >
                </textarea>
                <button 
                    onClick={burnMsg}
                    className="hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md mt-5 p-2"
                    type="submit"
                >
                    Burn Message
                </button>
            </div>
        }
        <div className='text-lg flex flex-col items-start mt-10 pl-1'>   
            {!generateLink && 
                <div 
                    onClick={() => {
                        setDownloadLink(false)
                        setGenerateLink(true)
                        setDecryptLink(false)
                        setDecryptMsg("")
                        setDecryptedMsg("")
                    }}
                    className='flex items-center hover:text-[#39FF14] ease-in duration-300'
                >
                    <span className='pr-2'>
                        <BsBoxArrowLeft size={20}/>
                    </span>
                    Generate New Secret Message
                </div> 
            }
            {!decryptLink && 
                <div 
                    onClick={ async () => {
                        setDownloadLink(false)
                        setGenerateLink(false)
                        setDecryptLink(true)
                        setDecryptMsg("")
                        setDecryptedMsg("")
                        const link = encryptedMsg.replace("/", "");
                        await setDoc(doc(db, "links", link), {})
                    }}
                    className='flex items-center hover:text-[#39FF14] ease-in duration-300'
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
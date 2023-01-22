import { useState, useEffect } from 'react'
import { AiOutlineLock } from 'react-icons/ai'
import { BsBoxArrowLeft } from 'react-icons/bs'
import { RiErrorWarningLine } from 'react-icons/ri'
import { BiShareAlt, BiCopy  } from 'react-icons/bi'
import CryptoJS from "crypto-js";

const Form = () => {

  const [generateLink, setGenerateLink] = useState(true);
  const [downloadLink, setDownloadLink] = useState(false);
  const [decryptLink, setDecryptLink] = useState(false);
  const [error, setError] = useState(false);
  const [encryptMsg, setEncryptMsg] = useState("");
  const [encryptedMsg, setEncryptedMsg] = useState("");
  const [decryptMsg, setDecryptMsg] = useState("");
  const [decryptedMsg, setDecryptedMsg] = useState("");

  useEffect(() => {
    msgEncryptionHandler();
  }, []);

  const msgEncryptionHandler = () => {
    setError(false);

    const salt = import.meta.env.VITE_ENCRYPTION_SALT;
    const data = CryptoJS.AES.encrypt(
        JSON.stringify(encryptMsg),
        salt
      ).toString();
  
    setEncryptedMsg(data);
    setEncryptedMsg(data);
    
    // console.log(encryptMsg);
    // console.log(encryptedMsg);

    if(encryptedMsg) {
        setGenerateLink(false);
        setDownloadLink(true);
        setDecryptLink(false);
    } 
    
    if(!encryptMsg) {
        setError(true);
    }

    setEncryptMsg("");
  }

  const msgDecryptionHandler = () => {
    const salt = import.meta.env.VITE_ENCRYPTION_SALT;
    const bytes = CryptoJS.AES.decrypt(decryptMsg, salt);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setDecryptedMsg(data);

    // console.log(decryptMsg);
    // console.log(decryptedMsg);

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
                onChange={({target}) => {setEncryptMsg(target.value)}}
            />
            <div className='text-sm min-[510px]:text-md flex flex-col min-[510px]:flex-row justify-between items-center w-full mt-5'>
                <div className='flex flex-col justify-between'>
                    <div className='flex items-center'>
                        <span className='text-[#39FF14] pr-1'>
                            <AiOutlineLock size={25}/>
                        </span>
                        <span>End-to-End encrypted</span>
                    </div>
                    { error && 
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
                    className="text-sm min-[510px]:text-lg hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md p-2 mt-5 min-[510px]:mt-0"
                    type="submit"
                >
                    Generate Secret Link
                </button>
            </div>
        </div>
        }
        {downloadLink &&
            <div className='bg-[#212121] rounded-md p-5'>
                <textarea 
                    readOnly
                    value={encryptedMsg}
                    className='scroll text-lg bg-[#212121] rounded-md border-2 border-[#616161] p-3 w-full mb-5 h-full'
                >
                </textarea>
                <div className='flex flex-col min-[510px]:flex-row justify-center'>
                    <button className='flex hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md p-2 min-[510px]:mr-5'>
                        <span className='pr-1'>
                            <BiShareAlt size={25}/>
                        </span>
                        Share via Mail
                    </button>
                    <button 
                        className='flex hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md p-2 mt-5 min-[510px]:mt-0 min-[510px]:ml-5'
                        onClick={() => {navigator.clipboard.writeText(encryptedMsg)}}
                    >
                        <span className='pr-1'>
                            <BiCopy size={25}/>
                        </span>
                        Copy Link
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
            </div>
        }
        <div className='text-lg flex flex-col items-start mt-10 pl-1'>   
            {!generateLink && 
                <div 
                    onClick={() => {
                        setDownloadLink(false)
                        setGenerateLink(true)
                        setDecryptLink(false)
                        setDecryptedMsg("")
                    }}
                    className='flex items-center hover:text-[#39FF14] ease-in duration-300'
                >
                    <span className='pr-2'>
                        <BsBoxArrowLeft size={20}/>
                    </span>
                    Generate New Secret Link
                </div> 
            }
            {!decryptLink && 
                <div 
                    onClick={() => {
                        setDownloadLink(false)
                        setGenerateLink(false)
                        setDecryptLink(true)
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
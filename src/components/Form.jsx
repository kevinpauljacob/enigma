import { useState } from 'react'
import { AiOutlineLock } from 'react-icons/ai'
import { BsBoxArrowLeft } from 'react-icons/bs'
import { RiErrorWarningLine } from 'react-icons/ri'
import CryptoJS from "crypto-js";
import Link from './Link'

const Form = () => {

  const [generateLink, setGenerateLink] = useState(true);
  const [downloadLink, setDownloadLink] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [encryptedMsg, setEncryptedMsg] = useState("");
  const [secretLink, setSecretLink] = useState(true);

  const msgHandler = (e) => {
    console.log(e.target.value);
    setMsg(e.target.value);
    setError(false);
  }

  const encryptMsg = () => {
    const salt = import.meta.env.VITE_ENCRYPTION_SALT;

    const data = CryptoJS.AES.encrypt(
      JSON.stringify(msg),
      salt
    ).toString();
    setEncryptedMsg(data);
    console.log(encryptedMsg);

    const link = `${window.location}#${encryptedMsg}`;
    setSecretLink(link)
    console.log(link);
    if(msg) {
        setGenerateLink(false);
        setDownloadLink(true);
    } else {
        setError(true);
    }
    setMsg("");
  };

  return (
    <div className="w-full rounded-md">
        {generateLink &&
        <div className="flex flex-col items-end bg-[#212121] rounded-md p-5">
            <textarea 
                className="scroll text-lg bg-[#212121] rounded-md border-2 border-[#313131] focus:border-[#616161] focus:outline-none p-3 w-full"
                type="text" 
                name="text" 
                placeholder="Type your Secret Message."
                value={msg}
                onChange={msgHandler}
            />
            <div className='flex justify-between items-center w-full mt-5'>
                <p className=''>
                    <div className='flex items-center'>
                        <span className='pr-1'>
                            <AiOutlineLock size={25}/>
                        </span>
                        <span>End-to-End encrypted</span>
                    </div>
                    { error && 
                        <div className='flex items-center text-red-500 font-semibold mt-1'>
                            <span className='pr-1'>
                                <RiErrorWarningLine size={25}/>
                            </span>
                            Message is compulsory
                        </div>
                    }
                </p>
                <button 
                    onClick={encryptMsg}
                    className="hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md p-2"
                    type="submit"
                >
                    Generate Secret Link
                </button>
            </div>
        </div>
        }
        {downloadLink &&
            <div className='bg-[#212121] rounded-md p-5'>
                <p 
                    onClick={() => {
                        setDownloadLink(false)
                        setGenerateLink(true)
                    }}
                    className='flex items-center hover:text-[#39FF14] ease-in duration-300'
                >   
                    <span className='pr-2'>
                        <BsBoxArrowLeft size={20}/>
                    </span>
                    Generate New Secret Link
                </p>
                <div className='text-lg bg-[#212121] rounded-md border-2 border-[#616161] p-3 w-full my-5'>
                    {secretLink}
                </div>
                <div className='flex justify-center'>
                    <button className='hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md p-2 mr-5'>
                        Share via Mail
                    </button>
                    <button className='hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md p-2 ml-5'>
                        Copy Link
                    </button>
                </div>
            </div>
        }
    </div>
  )
}

export default Form
import { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'

import { BiShareAlt, BiCopy  } from 'react-icons/bi'

import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../firebase-config'

const CopySection = () => {

  const {
    encryptedMsgOut,
    setSecretPass
  } = useContext(AppContext);

  const [copied, setCopied] = useState(false); 

  return (
    <div className='bg-[#212121] rounded-md p-5'>
        <textarea 
            readOnly
            value={encryptedMsgOut}
            className='scroll text-lg bg-[#212121] rounded-md border-2 border-[#616161] p-3 w-full mb-5 h-full'
        >
        </textarea>
        <div className='flex flex-col min-[510px]:flex-row justify-center'>
            <button 
                className='flex hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md p-2 min-[510px]:mr-5'
                onClick={async () => {
                    navigator.clipboard.writeText(encryptedMsgOut)
                    const link = encryptedMsgOut.replaceAll("/", "");
                    await setDoc(doc(db, "links", link), {})
                    window.location = 'mailto:'
                    setSecretPass("")
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
                    navigator.clipboard.writeText(encryptedMsgOut)
                    const link = encryptedMsgOut.replaceAll("/", "");
                    await setDoc(doc(db, "links", link), {})
                    setSecretPass("")
                    setCopied(true)
                }}
            > 
                { !copied &&
                    <div className='flex items-center'>
                        <span className='pr-1'>
                            <BiCopy size={25}/>
                        </span>
                        Copy Message
                    </div>
                }

                { copied && 
                    <div className='flex items-center'>
                        <span className='pr-1'>
                            <BiCopy size={25}/>
                        </span>
                        Copied!
                    </div>
                }

            </button>
        </div>
    </div>
  )
}

export default CopySection
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

import { RiErrorWarningLine } from 'react-icons/ri'

const DecryptSection = () =>{

  const {
    decryptMsgIn,
    setDecryptMsgIn,
    secretPass,
    setSecretPass,
    invalidMessage,
    msgDecryptionHandler,
    decryptedMsgOut,
    burnMsg
  } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center bg-[#212121] rounded-md p-5'>
      <textarea
          value={decryptMsgIn} 
          onChange={({target}) => {setDecryptMsgIn(target.value)}}
          placeholder='Paste your link.'
          className='scroll text-lg bg-[#212121] rounded-md border-2 border-[#414141] focus:border-[#616161] focus:outline-none p-3 mb-5 w-full h-full'
      >
      </textarea>
      <textarea
          value={secretPass}
          onChange={({target}) => {setSecretPass(target.value)}}
          placeholder='Type your Secret Password.'
          className='scroll text-lg bg-[#212121] rounded-md border-2 border-[#414141] focus:border-[#616161] focus:outline-none p-3 w-full h-full'
      >     
      </textarea>
      {invalidMessage && 
              <div className='flex items-center text-red-500 font-semibold mt-5'>
              <span className='pr-1'>
                  <RiErrorWarningLine size={25}/>
              </span>
              Invalid Message or Message has been burnt!
          </div>
      }
      <button 
          onClick={msgDecryptionHandler}
          className="hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md my-5 p-2"
          type="submit"
      >
          Decrypt Message
      </button>
        { decryptedMsgOut &&
            <textarea
                readOnly
                value={decryptedMsgOut} 
                className='scroll text-lg bg-[#212121] rounded-md border-2 border-[#414141] focus:border-[#616161] focus:outline-none p-3 w-full h-full'
            >
            </textarea>
        }
        { decryptedMsgOut &&
            <button 
                onClick={burnMsg}
                className="hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md mt-5 p-2"
                type="submit"
            >
                Burn Message
            </button>
        }
    </div>
  )
}

export default DecryptSection
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

import { AiOutlineLock } from 'react-icons/ai'
import { RiErrorWarningLine } from 'react-icons/ri'

const EncryptSection = () => {

    const {
        encryptMsgIn,
        setEncryptMsgIn,
        secretPass,
        setSecretPass,
        setMessageRequiredError,
        setSecretRequiredError,
        msgEncryptionHandler
    } = useContext(AppContext);

    return (
        <div className="flex flex-col bg-[#212121] rounded-md p-3 min-[510px]:p-5">
            <textarea 
                className="scroll text-md min-[510px]:text-lg bg-[#212121] rounded-md border-2 border-[#313131] focus:border-[#616161] focus:outline-none p-3 mb-2 w-full"
                type="text" 
                name="text" 
                placeholder="Type your Secret Message."
                value={encryptMsgIn}
                onChange={({target}) => {
                    setEncryptMsgIn(target.value)
                    setMessageRequiredError(false)
                }}
            />
            { encryptMsgIn == "" && 
                <div className='flex items-center text-sm text-red-500 font-semibold mb-2 w-full'>
                    <span className='pr-1'>
                        <RiErrorWarningLine size={18} />
                    </span>
                    Message is compulsory
                </div>
            }
            <textarea 
                className="scroll text-md min-[510px]:text-lg bg-[#212121] rounded-md border-2 border-[#313131] focus:border-[#616161] focus:outline-none p-3 my-2 w-full"
                type="text" 
                name="text" 
                placeholder="Type your Secret Password."
                value={secretPass}
                onChange={({target}) => {
                    setSecretPass(target.value)
                    setSecretRequiredError(false)
                }}
            />
            { secretPass == "" && 
                <div className='flex items-center text-sm text-red-500 font-semibold w-full'>
                    <span className='pr-1'>
                        <RiErrorWarningLine size={18}/>
                    </span>
                    Secret Password is compulsory
                </div>
            }
            <div className='flex flex-col min-[600px]:flex-row justify-between items-center w-full mt-3'>
                <div className='flex items-center'>
                    <span className='text-[#39FF14] pr-1'>
                        <AiOutlineLock size={25}/>
                    </span>
                    <span>End-to-End encrypted</span>
                </div>
                <button 
                    onClick={msgEncryptionHandler}
                    className="text-lg hover:text-black hover:bg-[#39FF14] font-semibold border-2 border-[#39FF14] ease-in duration-500 uppercase rounded-md p-2 mt-3 min-[600px]:mt-0"
                    type="submit"
                >
                    Generate Secret Message
                </button>
            </div>
        </div>
    )
}

export default EncryptSection
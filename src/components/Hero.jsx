import { BsGithub, BsLink45Deg } from 'react-icons/bs'

const Hero = () => {
  return (
    <div className="w-full">
        <h1 className="text-5xl min-[510px]:text-7xl">
            Enigma<span className="text-[#39FF14] animate-ping">.</span>
        </h1>
        <p className="text-lg min-[510px]:text-2xl text-[#39FF14] font-semibold my-3 px-1">
            One-time Secret Messages
        </p>
        <div className='flex mb-7 px-1'>
          <a href="https://github.com/itaintkevin/enigma" className='flex items-center mr-2'>
            <BsGithub className="mr-1" size={20}/>
            Github
          </a>
          <a href="https://kevinpaul.xyz" className='flex items-center ml-2'>
            <BsLink45Deg className="mr-1" size={20}/>
            Portfolio
          </a>
        </div>
        <p className="text-md min-[510px]:text-xl w-full mb-10 px-1">
            Share sensitive information that can only be viewed one time. 
            <br/>
            The perfect way to transmit passwords, credit card information,
            private keys, or other confidential data.
        </p>
    </div>
  )
}

export default Hero
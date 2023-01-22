const Hero = () => {
  return (
    <div className="w-full">
        <h1 className="text-5xl min-[510px]:text-7xl">
            Enigma<span className="text-[#39FF14] animate-ping">.</span>
        </h1>
        <p className="text-lg min-[510px]:text-2xl text-[#39FF14] font-semibold mt-3 mb-7 px-1">
            One-time Secret Messages
        </p>
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
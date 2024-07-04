import React from 'react'
import chatbot from '../assets/Chatbot.png'

function Chatbot() {
  return (
    <div className='select-none fixed flex items-center justify-center bottom-6 right-6 overflow-hidden w-16 h-16 cursor-pointer rounded-full z-50'>
        <img src={chatbot} alt="Chatbot" />
    </div>
  )
}

export default Chatbot
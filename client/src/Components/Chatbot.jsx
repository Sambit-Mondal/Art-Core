import React, { useState } from 'react';
import { Chatbot as ChatbotComponent } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import chatbot from '../assets/Chatbot.png';
import config from './ChatbotConfig/config';
import MessageParser from './ChatbotConfig/MessageParser';
import ActionProvider from './ChatbotConfig/ActionProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      toast("Hello! How can I assist you today?");
    }
  };

  return (
    <div>
      <div 
        className='select-none fixed flex items-center justify-center bottom-6 right-6 overflow-hidden w-16 h-16 cursor-pointer rounded-full z-50'
        onClick={toggleChatbot}
      >
        <img src={chatbot} alt="Chatbot" className='z-40' />
      </div>
      {isOpen && (
        <div className='fixed bottom-5 right-8 w-[330px] h-[525px] z-40'>
          <ChatbotComponent
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Chatbot;
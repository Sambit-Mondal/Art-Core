import React, { useState } from 'react'
import Chatbot from '../Components/Chatbot'
import Username from '../Components/Username'
import Login from '../Components/LoginPopup'
import Footer from '../Components/Footer'
import Arundhati from '../assets/Arundhati.jpg'

function About() {
  const [isLoginVisible, setLoginVisible] = useState(false);

  function loginVisibility() {
    setLoginVisible((prev) => (!prev))
  }

  return (
    <div className='select-none flex flex-col justify-center items-center z-40 absolute top-0 bottom-0 left-0 right-0'>
      <Username loginVisibility={loginVisibility} />
      {isLoginVisible && (
        <>
          <Login loginVisibility={loginVisibility} />
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </>
      )}

      {/* About section */}
      <div className='flex flex-col pl-52 items-center justify-center w-auto'>
        <div className='flex flex-col items-center justify-center'>
          <p className='font-inter font-bold text-about pb-3'>ABOUT ME</p>
          <hr className='w-96 pb-7' />
        </div>
        <div className='flex items-center justify-around w-auto pl-20 pt-8'>
          <div className="overflow-hidden flex items-center justify-center w-[40%] h-full pr-3 mr-16 rounded-full">
            <img src={Arundhati} alt="Arundhati Bera" className='w-48 h-52 flex items-center justify-center rounded-full' />
          </div>
          <p className='font-inter text-md pr-7'>Hi! I’m <span className='font-bold'>Arundhati Bera</span>, a passionate artist, currently persuing BTech in Computer Science and Engineering at KIIT University, Bhubaneswar.
            <ul className='list-disc'>
              <li><span className='font-bold'>Mediums:</span> Acrylic, Water, Oil, etc.</li>
              <li>Expertise in Canvas paintings.</li>
              <li>Any kind of bookmark, traditional art forms, or other art/craft available.</li>
              <li>Can also make customised cards (Greetings, birthday, etc.)</li>
            </ul>
          </p>
        </div>
      </div>
      <Chatbot />
      <Footer />
    </div>
  )
}

export default About
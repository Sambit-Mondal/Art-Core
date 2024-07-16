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
    <>
      <div className='select-none flex flex-col justify-around lg:justify-center items-center lg:items-start z-40 w-full overflow-auto lg:overflow-hidden h-screen'>
        <Username loginVisibility={loginVisibility} />
        {isLoginVisible && (
          <>
            <Login loginVisibility={loginVisibility} />
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          </>
        )}

        {/* About section */}
        <div className='flex flex-col items-center justify-center w-full'>
          <div className='flex flex-col items-center justify-center mt-20 lg:mt-4'>
            <p className='font-inter font-bold text-[1.5rem] lg:text-about pb-3'>ABOUT ME</p>
            <hr className='w-[15rem] lg:w-[30rem] mb-7 bg-black border-none h-[2px]' />
          </div>
          <div className='flex flex-col lg:flex-row gap-0 items-center justify-center w-full pt-5'>
            <div className='flex items-center justify-center w-full lg:w-[55%] h-full py-5 lg:py-0'>
              <img src={Arundhati} alt="Arundhati Bera" className='w-52 h-72 lg:w-52 lg:h-72 flex items-center justify-center rounded-md border-4 border-activeTab p-1' />
            </div>
            <p className='font-inter text-md pl-10 py-10 lg:pl-0 lg:py-0 w-full'>Hi! I'm <span className='font-bold'>Arundhati Bera</span>, a passionate artist, currently persuing BTech in Computer Science and Engineering at KIIT University, Bhubaneswar.
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
      </div>
      <Footer />
    </>
  )
}

export default About
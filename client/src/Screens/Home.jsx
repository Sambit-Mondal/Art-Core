import React, { useState } from 'react'
import Chatbot from '../Components/Chatbot'
import Username from '../Components/Username'
import Login from '../Components/LoginPopup'
import Footer from '../Components/Footer';
import { NavLink } from 'react-router-dom';

function Home() {
  const [isLoginVisible, setLoginVisible] = useState(false);

  function loginVisibility() {
    setLoginVisible((prev) => (!prev))
  }

  return (
    <>
      <div className='select-none bg-background flex flex-col justify-center items-center z-40 w-screen h-screen'>
        <Username loginVisibility={loginVisibility} />
        {isLoginVisible && (
          <>
            <Login loginVisibility={loginVisibility} />
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          </>
        )}
        <div className='flex flex-col items-center justify-center w-full '>
          <p className='font-inter text-2xl font-semibold'>WELCOME TO</p>
          <p className='font-carter text-4xl font-bold tracking-wide drop-shadow-text'>ART CORE</p>
          <p className='font-jim text-[3.5rem] font-medium'>"Curating Beauty, one Brushstroke at a Time"</p>
          <NavLink to='/about'>
            <button className='flex items-center justify-center p-3 bg-navbar rounded-full drop-shadow-btn shadow-btn font-bold px-5 mt-8 transition duration-150 ease-in-out hover:bg-activeTab hover:text-white'>
              EXPLORE MORE
            </button>
          </NavLink>
        </div>
        <Chatbot />
      </div>
      <Footer />
    </>
  )
}

export default Home
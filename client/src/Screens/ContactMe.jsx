import React, { useState } from 'react'
import Chatbot from '../Components/Chatbot'
import Username from '../Components/Username'
import Login from '../Components/LoginPopup'

function ContactMe() {
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
      <Chatbot />
    </div>
  )
}

export default ContactMe
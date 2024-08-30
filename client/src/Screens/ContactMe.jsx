import React, { useState, useContext, useEffect } from 'react';
import Chatbot from '../Components/Chatbot';
import Username from '../Components/Username';
import Login from '../Components/LoginPopup';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import instagram from '../assets/Instagram.png';
import linkedin from '../assets/LinkedIn.png';
import facebook from '../assets/Facebook.png';
import gmail from '../assets/Mail.png';
import whatsapp from '../assets/WhatsApp.png';
import call from '../assets/Call.png';
import Footer from '../Components/Footer';

function ContactMe() {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setFormData(prevState => ({ ...prevState, email: user.email }));
    }
  }, [user]);

  function loginVisibility() {
    setLoginVisible(prev => !prev);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://art-core-backend.vercel.app/api/send-email', formData);
      toast.success('Email sent successfully!', { position: 'top-center' });
      setFormData({ name: '', email: user.email, subject: '', message: '' });
    } catch (error) {
      toast.error('Error sending email. Please try again later.', { position: 'top-center' });
    }
  };

  return (
    <>
      <div className='select-none h-screen overflow-y-auto overflow-x-hidden lg:overflow-y-hidden w-full flex flex-col justify-center items-center z-40 pb-16'>
        <Username loginVisibility={loginVisibility} />
        {isLoginVisible && (
          <>
            <Login loginVisibility={loginVisibility} />
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          </>
        )}
        <div className='flex flex-col  items-center justify-center w-auto'>
          <div className='flex flex-col items-center justify-center mt-40 lg:mt-20'>
            <p className='font-inter font-bold text-[1.5rem] lg:text-about pb-3'>CONTACT ME</p>
            <hr className='w-[15rem] lg:w-[30rem] mb-7 bg-black border-none h-[2px]' />
          </div>

          <div className='w-full flex flex-col gap-3 items-center justify-center px-4 lg:px-3'>
            <div className='flex flex-col lg:flex-row items-center justify-center w-full gap-3 lg:gap-5'>
              <div className='bg-navbar w-full p-5 px-6 py-6 pb-8 lg:px-8'>
                <form className='flex flex-col select-none' onSubmit={handleSubmit}>
                  <div className='flex flex-col gap-2 py-2 mt-2'>
                    <input
                      className='w-auto pl-2 py-1 rounded-sm'
                      type="text"
                      name="name"
                      placeholder='Enter your Name'
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='flex flex-col gap-2 py-2 mt-2'>
                    <input
                      className='w-auto lg:w-[40vw] pl-2 py-1 rounded-sm'
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                    />
                  </div>

                  <div className='flex flex-col gap-2 py-2 mt-2'>
                    <input
                      className='w-auto pl-2 py-1 rounded-sm'
                      type="text"
                      name="subject"
                      placeholder='Enter the Subject'
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='flex flex-col gap-2 py-2 mt-2'>
                    <textarea
                      className='w-auto pl-2 py-1 rounded-sm'
                      name="message"
                      placeholder='Enter your Message'
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <button type="submit" className='w-full flex items-center justify-center bg-activeTab text-white font-semibold py-1 mt-4 cursor-pointer rounded-sm'>
                      Send
                    </button>
                  </div>
                </form>
              </div>

              <div className='bg-navbar flex flex-col p-5 py-4 h-full w-full'>
                <div className='flex flex-col items-center justify-center font-inter font-medium'>
                  Let's connect on <br /><span className='font-jim font-semibold text-md tracking-wider'>Socials</span>
                  <hr className='w-full size-10 bg-black border-none h-[2px]' />
                </div>
                <div className='flex lg:flex-col items-center justify-center gap-5 mt-4 h-full'>
                  <div className='flex flex-col items-center justify-center gap-1 font-medium'>
                    <a href="https://instagram.com/art_core0425" target='blank'><img src={instagram} alt="Instagram" className='rounded-full w-10 h-10 cursor-pointer' /></a>
                    <p className='text-[0.71rem] font-bold lg:font-semibold lg:text-socials'>@art_core0425</p>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-1 font-medium'>
                    <a href="https://www.linkedin.com/in/arundhati-bera-b445472aa/" target="blank"><img src={linkedin} alt="LinkedIn" className='rounded-full w-10 h-10 cursor-pointer' /></a>
                    <p className='text-[0.71rem] font-bold lg:font-semibold lg:text-socials'>/Arundhati Bera</p>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-1 font-medium'>
                    <a href="https://www.facebook.com/profile.php?id=100089918468638" target='blank'><img src={facebook} alt="Facebook" className='rounded-full w-10 h-10 cursor-pointer' /></a>
                    <p className='text-[0.71rem] font-bold lg:font-semibold lg:text-socials'>/Arundhati Bera</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full h-full flex items-center justify-center bg-navbar p-2 py-2'>
              <div className='w-full flex items-center justify-center flex-col gap-1 font-medium'>
                <a href="mailto:beraarundhati44@gmail.com"><img src={gmail} alt="Gmail" className='rounded-full w-10 h-10 cursor-pointer' /></a>
                <p className='text-[0.723rem] lg:text-socials'>beraarundhati44@gmail.com</p>
              </div>
              <hr className='rotate-90 w-28 bg-black border-none h-[1px]' />
              <div className='w-full flex items-center justify-center flex-col gap-1 font-medium'>
                <div className='flex items-center justify-center gap-3 lg:gap-5'>
                  <a href="tel:+916295029851"><img src={call} alt="" className='rounded-full w-10 h-10 cursor-pointer' /></a>
                  <a href="https://wa.me/+916295029851" target='blank'><img src={whatsapp} alt="" className='rounded-full w-10 h-10 cursor-pointer' /></a>
                </div>
                <p className='text-socials'>+91-6295-029-851</p>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      <Chatbot />
      </div>
      <Footer />
    </>
  );
}

export default ContactMe;
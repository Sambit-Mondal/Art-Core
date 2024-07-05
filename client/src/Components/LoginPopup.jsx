import React, { useRef, useState, useEffect, useCallback } from 'react';
import google from '../assets/Google.png';
import facebook from '../assets/Facebook.png';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { auth, signupWithGoogle, googleProvider } from '../firebase/Firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

function LoginPopup({ loginVisibility }) {
    const [loginVisible, setLoginVisible] = useState(true);
    const [signupVisible, setSignupVisible] = useState(false);
    const navigate = useNavigate();

    const onClose = useCallback(() => {
        loginVisibility((prev) => (!prev));
    }, [loginVisibility]);

    const onSignupSuccess = () => {
        setLoginVisible(true);
        setSignupVisible(false);
    }

    // Handle Outside Click
    const ref = useRef();

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (loginVisibility && ref.current && !ref.current.contains(e.target)) {
                onClose();
            }
        };

        // Closes the sidebar when a click outside the sidebar is detected
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [loginVisibility, onClose]);

    // Login Screen
    const loginScreen = () => {
        setLoginVisible(true);
        setSignupVisible(false);
    }

    // Signup Screen
    const signupScreen = () => {
        setLoginVisible(false);
        setSignupVisible(true);
    }

    // Signup/Login with Google
    const handleGoogleLogin = async (e) => {
        try {
            e.preventDefault();
            await signupWithGoogle(auth, googleProvider);
            toast.success("User logged in successfully!", { position: "top-center" });
            navigate('/');
            onClose();
        } catch (err) {
            toast.error(err.message, { position: "top-center" });
        }
    }

    return (
        <div ref={ref} className='flex justify-center bg-navbar w-auto flex-col p-5 pt-3 pb-3 px-7 rounded-sm z-50'>
            <div className='w-full flex items-center justify-end mb-2'>
                <XMarkIcon className='w-6 h-6 cursor-pointer' onClick={onClose} />
            </div>
            <div className='flex justify-around items-center'>
                <div className={`${loginVisible ? 'duration-100 bg-activeTab text-white' : 'duration-100 hover:border-b-2 border-activeTab'} w-full p-2 flex items-center justify-center font-semibold cursor-pointer`} onClick={loginScreen}>Login</div>
                <div className={`${signupVisible ? 'duration-100 bg-activeTab text-white' : 'duration-100 hover:border-b-2 border-activeTab'} w-full p-2 flex items-center justify-center font-semibold cursor-pointer`} onClick={signupScreen}>Signup</div>
            </div>

            {loginVisible ? (
                // Login
                <Login onClose={onClose} />
            ) : (
                // Signup
                <Signup onSignupSuccess={onSignupSuccess} />
            )}

            <div className="flex items-center my-6 font-bold">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-4 text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <div className='flex items-center justify-center w-full gap-2 mb-3'>
                <div className='flex items-center justify-center gap-5 font-semibold p-2 px-10 rounded-sm w-auto bg-white cursor-pointer' onClick={handleGoogleLogin}>
                    <img src={google} alt="Google" className='w-6 h-6' />
                    <p>Google</p>
                </div>
                <div className='flex items-center justify-center gap-5 font-semibold p-2 px-10 rounded-sm w-auto bg-white cursor-pointer'>
                    <img src={facebook} alt="Google" className='w-6 h-6' />
                    <p>Facebook</p>
                </div>
            </div>
        </div>
    );
}

export default LoginPopup;
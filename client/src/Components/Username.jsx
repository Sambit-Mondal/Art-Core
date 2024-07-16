// Username.jsx
import React, { useContext } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase/Firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Username({ loginVisibility }) {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        window.location.reload();
        navigate('/');
    };

    return (
        <>
            <div>
                {user ? (
                    <div className='flex flex-row lg:flex-row z-30 items-end justify-center w-auto fixed right-5 top-5 lg:right-6 lg:top-6 gap-2 lg:gap-4'>
                        <div className='flex items-center justify-center w-auto h-auto text-black rounded-sm border-[1px] border-activeTab lg:border-none font-semibold gap-2 bg-navbar text-sm lg:text-[1rem] px-3 py-2 lg:drop-shadow-login-btn lg:shadow-login-btn'>
                            <UserCircleIcon className='size-4 lg:size-5' />
                            { user.displayName }
                        </div>
                        <div className="flex items-center justify-center w-auto h-auto gap-5 font-semibold">
                            <button className='flex items-center justify-center w-auto h-auto border-[1px] border-activeTab lg:border-none bg-navbar p-2 px-3 rounded-sm cursor-pointer text-sm lg:text-[1rem] transition duration-150 ease-in-out hover:bg-activeTab hover:text-white lg:drop-shadow-login-btn lg:shadow-login-btn' onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex z-30 items-center justify-center w-auto h-auto gap-5 fixed right-5 top-5 lg:right-6 lg:top-6 font-semibold">
                            <button className='flex items-center justify-center w-auto h-auto gap-2 border-[1px] border-activeTab lg:border-none text-sm lg:text-[1rem] bg-navbar p-2 px-3 rounded-sm cursor-pointer transition duration-150 ease-in-out hover:bg-activeTab hover:text-white lg:drop-shadow-login-btn lg:shadow-login-btn' onClick={loginVisibility}>
                                <UserCircleIcon className='size-4 lg:size-5' />
                                Login / Signup
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Username;
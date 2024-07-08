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
                    <div className='flex z-30 items-center justify-center w-auto fixed right-6 top-6 gap-4'>
                        <div className='flex items-center justify-center w-auto h-auto text-black rounded-sm font-semibold gap-2 bg-navbar px-3 py-2'>
                            <UserCircleIcon className='size-5' />
                            { user.displayName }
                        </div>
                        <div className="flex items-center justify-center w-auto h-auto gap-5 font-semibold">
                            <button className='flex items-center justify-center w-auto h-auto bg-navbar p-2 px-3 rounded-sm cursor-pointer transition duration-150 ease-in-out hover:bg-activeTab hover:text-white' onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex z-30 items-center justify-center w-auto h-auto gap-5 fixed right-6 top-6 font-semibold">
                            <button className='flex items-center justify-center w-auto h-auto gap-2 bg-navbar p-2 px-3 rounded-sm cursor-pointer transition duration-150 ease-in-out hover:bg-activeTab hover:text-white drop-shadow-login-btn shadow-login-btn' onClick={loginVisibility}>
                                <UserCircleIcon className='size-5' />
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
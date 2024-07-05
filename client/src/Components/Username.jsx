import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Login from './LoginPopup';

function Username({ loginVisibility }) {
    const user = 0;
    const [ isSelected, setIsSelected ] = useState(false);

    const showLogin = () => {
        setIsSelected(true);
    }

    return (
        <>
        <div>
            {user ? (
                <>
                    <div className='flex items-center justify-center w-auto h-auto fixed right-6 top-6 text-black rounded-sm font-semibold gap-2 bg-navbar p-1 pl-2 pr-2 cursor-pointer'>
                        <UserCircleIcon className='size-5' />
                        Username
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center justify-center w-auto h-auto gap-5 fixed right-6 top-6 font-semibold">
                        <button className='flex items-center justify-center w-auto h-auto gap-2 bg-navbar p-2 rounded-sm cursor-pointer transition duration-150 ease-in-out hover:bg-activeTab hover:text-white' onClick={loginVisibility}>
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

export default Username
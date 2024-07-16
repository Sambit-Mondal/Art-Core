import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup({ onSignupSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://192.168.0.115:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message, { position: 'top-center' });
                onSignupSuccess();
                console.log(data.user);
            } else {
                toast.error(data.message, { position: 'top-center' });
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.', { position: 'top-center' });
        }
    };

    return (
        <div>
            <form className='flex flex-col' onSubmit={handleSignup}>
                <div className='flex flex-col gap-2 py-2 mt-2'>
                    <label className='font-medium'>Username</label>
                    <input
                        className='w-auto pl-2 py-1 rounded-sm'
                        type="text"
                        name="username"
                        placeholder='e.g., John Wordsworth'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2 py-2'>
                    <label className='font-medium'>Email</label>
                    <input
                        className='w-auto pl-2 py-1 rounded-sm'
                        type="email"
                        name="email"
                        placeholder='e.g., john@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2 py-2'>
                    <label className='font-medium'>Password</label>
                    <input
                        type="password"
                        className='w-auto pl-2 py-1 rounded-sm'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className='w-full flex items-center justify-center bg-activeTab text-white font-semibold py-1 mt-4 cursor-pointer'>
                        Signup
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
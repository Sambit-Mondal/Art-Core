import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message, {
                    position: 'top-center',
                    autoClose: 1500
                });
                setTimeout(() => {
                    navigate('/');
                    onClose();
                }, 2000);  // Wait for 2 seconds before navigating
            } else {
                toast.error(data.message, { position: 'top-center' });
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.', { position: 'top-center' });
        }
    };

    return (
        <div>
            <form className='flex flex-col' onSubmit={handleLogin}>
                <div className='flex flex-col gap-2 py-2 mt-2'>
                    <label className='font-medium'>Email</label>
                    <input
                        className='w-auto pl-2 py-1 rounded-sm'
                        type="email"
                        placeholder='e.g., john@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        required
                    />
                </div>
                <div>
                    <button type="submit" className='w-full flex items-center justify-center bg-activeTab text-white font-semibold py-1 mt-4 cursor-pointer rounded-sm'>
                        Login
                    </button>
                </div>
                <div className='w-full flex items-center justify-end pt-1 text-sm'>
                    <p className='cursor-pointer'>Forgot Password?</p>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
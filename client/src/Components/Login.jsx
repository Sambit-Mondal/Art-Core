import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Login({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const { loginUserWithEmailAndPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loggedInUser = await loginUserWithEmailAndPassword(email, password);

        if (loggedInUser) {
            toast.success('User logged in successfully!', { position: 'top-center' });

            navigate('/');
            onClose();
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/forgot-password', { email: forgotPasswordEmail });
            toast.success(response.data.message, { position: 'top-center' });
            setIsForgotPassword(false);
        } catch (error) {
            toast.error(error.response.data.message || 'Error sending password reset email.', { position: 'top-center' });
        }
    };

    return (
        <div>
            {isForgotPassword ? (
                <form className='flex flex-col' onSubmit={handleForgotPassword}>
                    <div className='flex flex-col gap-2 py-2 mt-2'>
                        <label className='font-medium'>Email</label>
                        <input
                            className='w-auto pl-2 py-1 rounded-sm'
                            type="email"
                            placeholder='e.g., john@gmail.com'
                            value={forgotPasswordEmail}
                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" className='w-full flex items-center justify-center bg-activeTab text-white font-semibold py-1 mt-4 cursor-pointer rounded-sm'>
                            Send Password Reset Email
                        </button>
                    </div>
                    <div className='w-full flex items-center justify-end pt-1 text-sm'>
                        <p className='cursor-pointer' onClick={() => setIsForgotPassword(false)}>Back to Login</p>
                    </div>
                </form>
            ) : (
                <form className='flex flex-col' onSubmit={handleLogin}>
                    <div className='flex flex-col gap-2 py-2 mt-2'>
                        <label className='font-medium'>Email</label>
                        <input
                            className='w-auto pl-2 py-1 rounded-sm'
                            type="email"
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
                        <button type="submit" className='w-full flex items-center justify-center bg-activeTab text-white font-semibold py-1 mt-4 cursor-pointer rounded-sm'>
                            Login
                        </button>
                    </div>
                    <div className='w-full flex items-center justify-end pt-1 text-sm'>
                        <p className='cursor-pointer' onClick={() => setIsForgotPassword(true)}>Forgot Password?</p>
                    </div>
                </form>
            )}
            <ToastContainer />
        </div>
    );
}

export default Login;
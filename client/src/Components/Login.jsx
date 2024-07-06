import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Login({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const { loginUserWithEmailAndPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            setToken(token);
            setIsResetPassword(true);
        }
    }, [searchParams]);

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
            const response = await axios.post('http://localhost:5000/api/forgot-password', { email: forgotPasswordEmail });
            toast.success(response.data.message, { position: 'top-center' });
            setIsForgotPassword(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error sending password reset email.', { position: 'top-center' });
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match.', { position: 'top-center' });
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/reset-password', { token, newPassword });
            toast.success(response.data.message, { position: 'top-center' });
            setIsResetPassword(false);
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error resetting password.', { position: 'top-center' });
        }
    };

    return (
        <div>
            {isResetPassword ? (
                <form className='flex flex-col' onSubmit={handleResetPassword}>
                    <div className='flex flex-col gap-2 py-2 mt-2'>
                        <label className='font-medium'>New Password</label>
                        <input
                            className='w-auto pl-2 py-1 rounded-sm'
                            type="password"
                            placeholder='Enter New Password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2 py-2'>
                        <label className='font-medium'>Confirm New Password</label>
                        <input
                            type="password"
                            className='w-auto pl-2 py-1 rounded-sm'
                            placeholder='Confirm New Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" className='w-full flex items-center justify-center bg-activeTab text-white font-semibold py-1 mt-4 cursor-pointer rounded-sm'>
                            Update Password
                        </button>
                    </div>
                </form>
            ) : isForgotPassword ? (
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
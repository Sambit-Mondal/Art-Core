import React, { useState } from 'react';
import Chatbot from '../Components/Chatbot';
import Login from '../Components/Login';
import Username from '../Components/Username';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddArtworks() {
    const [isLoginVisible, setLoginVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('');

    function loginVisibility() {
        setLoginVisible((prev) => (!prev));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
        setType('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const artwork = {
            title,
            description,
            price,
            image,
            type
        };

        try {
            await axios.post('https://art-core-backend.vercel.app/api/artworks', artwork);
            toast.success('Artwork uploaded successfully!', {
                position: 'top-center'
            });
            clearForm(); // Clear the form after successful upload
        } catch (error) {
            console.error('Error uploading artwork:', error);
            toast.error('Failed to upload artwork.', {
                position: 'top-center'
            });
        }
    };

    return (
        <div className='select-none flex flex-col justify-center items-center z-40 h-screen w-screen lg:w-full lg:min-h-screen overflow-y-auto overflow-x-hidden bg-background'>
            <div className='flex flex-col  items-center justify-center w-auto'>
                <Username loginVisibility={loginVisibility} />
                {isLoginVisible && (
                    <>
                        <Login loginVisibility={loginVisibility} />
                        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                    </>
                )}
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-inter font-bold text-[1.5rem] lg:text-about pb-1'>ADD ARTWORK</p>
                    <hr className='w-[15rem] lg:w-[30rem] mb-4 bg-black border-none h-[2px]' />
                </div>
            </div>

            <div className='bg-navbar w-screen lg:w-[40rem] h-auto rounded-sm'>
                <form className='flex flex-col w-auto p-5 py-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2 py-2'>
                        <label className='font-medium'>Title:</label>
                        <input
                            className='w-auto pl-2 py-1 rounded-sm'
                            type="text"
                            placeholder='Enter the Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2 py-2'>
                        <label className='font-medium'>Description {'(under 300 characters)'}:</label>
                        <textarea
                            type="text"
                            className='w-auto pl-2 py-1 rounded-sm'
                            placeholder='Enter the description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2 py-2'>
                        <label className='font-medium'>Price:</label>
                        <input
                            className='w-auto pl-2 py-1 rounded-sm'
                            type='text'
                            placeholder='Enter the Price (in INR)'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center justify-between w-full gap-10'>
                        <div className='flex flex-col gap-2 py-2 w-full items-start justify-center'>
                            <label className='font-medium'>Image {'(<70kb):'}</label>
                            <input
                                className='w-full pl-2 py-1 rounded-sm'
                                type="file"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className='flex flex-col gap-2 py-2 w-full items-start justify-center'>
                            <label className='font-medium'>Type:</label>
                            <div className='w-full flex flex-wrap gap-x-5 gap-y-2'>
                                <p className={`p-1 px-2 flex items-center justify-center font-semibold transition duration-150 cursor-pointer rounded-sm text-[0.9rem] ${type === 'LIPPAN ART' ? 'bg-activeTab text-white z-10' : 'bg-background hover:bg-activeTab hover:text-white'}`} onClick={() => setType('LIPPAN ART')}>LIPPAN ART</p>
                                <p className={`p-1 px-2 flex items-center justify-center font-semibold transition duration-150 cursor-pointer rounded-sm text-[0.9rem] ${type === 'WALL HANGING' ? 'bg-activeTab text-white' : 'bg-background hover:bg-activeTab hover:text-white'}`} onClick={() => setType('WALL HANGING')}>WALL HANGING</p>
                                <p className={`p-1 px-2 flex items-center justify-center font-semibold transition duration-150 cursor-pointer rounded-sm text-[0.9rem] ${type === 'CANVAS' ? 'bg-activeTab text-white' : 'bg-background hover:bg-activeTab hover:text-white'}`} onClick={() => setType('CANVAS')}>CANVAS</p>
                                <p className={`p-1 px-2 flex items-center justify-center font-semibold transition duration-150 cursor-pointer rounded-sm text-[0.9rem] ${type === 'BOOKMARKS' ? 'bg-activeTab text-white' : 'bg-background hover:bg-activeTab hover:text-white'}`} onClick={() => setType('BOOKMARKS')}>BOOKMARKS</p>
                                <p className={`p-1 px-2 flex items-center justify-center font-semibold transition duration-150 cursor-pointer rounded-sm text-[0.9rem] ${type === 'DIGITAL' ? 'bg-activeTab text-white' : 'bg-background hover:bg-activeTab hover:text-white'}`} onClick={() => setType('DIGITAL')}>DIGITAL</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className='w-full flex items-center justify-center bg-activeTab text-white font-semibold py-1 mt-4 cursor-pointer rounded-sm'>
                            Upload
                        </button>
                    </div>
                </form>
            </div>
            <Chatbot />
        </div>
    );
}

export default AddArtworks;
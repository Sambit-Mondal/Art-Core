import React, { useState } from 'react';

function UserAddress({ onSubmit }) {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, address });
  };

  return (
    <div className='select-none flex items-center justify-center fixed top-0 bottom-0 lg:absolute lg:top-0 lg:bottom-0 overflow-x-hidden'>
      <form onSubmit={handleSubmit} className='flex flex-col w-full lg:w-auto h-auto bg-navbar p-8 lg:p-8 rounded-sm gap-3'>
        <label className='font-bold font-inter tracking-wide text-artworks'>Enter your name:</label>
        <input
          type="text"
          className='w-[90vw] lg:w-96 p-2 rounded-sm'
          placeholder='Enter your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className='font-bold font-inter tracking-wide text-artworks'>Enter your phone number:</label>
        <input
          type="tel"
          className='w-[90vw] lg:w-96 p-2 rounded-sm'
          placeholder='Enter your phone number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label className='font-bold font-inter tracking-wide text-artworks'>Enter your address:</label>
        <textarea
          type="text"
          className='w-[90vw] lg:w-96 h-52 p-2 rounded-sm'
          placeholder='Enter your full address of delivery (include House no., Street name, Area/Locality, City, State and Pin Code'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className='mt-3 w-full font-inter font-semibold rounded-sm p-1 bg-hoverTabs text-black transition duration-150 ease-in-out hover:bg-activeTab hover:text-white' type="submit">
          Proceed
        </button>
      </form>
    </div>
  );
}

export default UserAddress;
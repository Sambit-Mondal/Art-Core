import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

function Painting({ artwork }) {
  const trimmedDescription = artwork.description.length > 350
    ? artwork.description.substring(0, 350) + '...'
    : artwork.description;

  return (
    <div className="overflow-hidden flex items-center justify-center">
      <div className="relative w-72 h-72 p-3 bg-navbar border-2 border-activeTab overflow-hidden group">
        <div className="absolute overflow-hidden flex flex-col items-center justify-around inset-0 bg-black text-white bg-opacity-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10 p-3 text-sm">
          <div className='flex justify-between items-center w-full'>
            <p className='text-md font-bold'>
              {artwork.title}
            </p>
            <button className='bg-navbar text-black font-semibold rounded-sm p-1 px-3 duration-150 transition hover:bg-activeTab hover:text-white'>More details</button>
          </div>
          <div className='flex flex-wrap max-w-full items-center justify-center text-sm font-inter tracking-wider p-1 mt-3 overflow-hidden'>
            {trimmedDescription}
          </div>
          <div className='flex items-center justify-between w-full mt-3'>
            <div className='text-artworks font-semibold'>
              Rs. {artwork.price}
            </div>
            <button className='bg-navbar text-black font-semibold rounded-sm flex items-center justify-around p-1 px-3 gap-3 duration-150 transition hover:bg-activeTab hover:text-white'>
              <ShoppingCartIcon className='size-5' /> Buy
            </button>
          </div>
        </div>
        <div className="w-full h-full duration-150 transition group-hover:scale-105 group-hover:blur-sm">
          <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Painting;
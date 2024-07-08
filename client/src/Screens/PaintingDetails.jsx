import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Username from '../Components/Username';
import Login from '../Components/LoginPopup';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useArtworks } from '../context/ArtworksContext';

function PaintingDetails() {
  const { id } = useParams();
  const { artworks } = useArtworks();
  const painting = artworks.find((artwork) => artwork._id === id);
  const [quantity, setQuantity] = useState(1);
  const [isLoginVisible, setLoginVisible] = useState(false);

  function loginVisibility() {
    setLoginVisible((prev) => !prev);
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (!painting) {
    return <div>Artwork not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-background">
      <Username loginVisibility={loginVisibility} />
      {isLoginVisible && (
        <>
          <Login loginVisibility={loginVisibility} />
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </>
      )}
      <div className='flex flex-col items-center justify-center h-full w-full p-10 py-16 px-48'>
        <div className="flex flex-col border-b-2 w-2/4 border-solid items-center justify-center font-bold font-inter text-md tracking-wider pb-2">
          {painting.title}
        </div>
        <div className="flex items-center justify-between w-full h-full gap-6">
          <div className="flex items-center justify-center w-[50%] h-[90%] overflow-hidden p-3 border-2">
            <img
              src={painting.image}
              alt={painting.title}
              className="w-full h-full object-cover cursor-pointer transition duration-150 ease-in-out hover:scale-105"
            />
          </div>
          <div className="flex flex-col w-full h-full items-center justify-between">
            <div className="text-[1rem] flex-wrap w-full h-full font-semibold font-inter tracking-wide flex items-center justify-center">
              {painting.description}
            </div>
            <div className="flex items-center justify-between w-full h-full">
              <div className="flex gap-2 w-full items-center justify-start">
                <div
                  onClick={decreaseQuantity}
                  className="flex items-center justify-center p-1 rounded-full bg-hoverTabs font-bold text-black transition duration-150 ease-in-out hover:bg-activeTab hover:text-white cursor-pointer"
                >
                  <MinusIcon className="h-5 w-5" />
                </div>
                <div className="px-7 py-1 font-bold text-white rounded-sm bg-activeTab">{quantity}</div>
                <div
                  onClick={increaseQuantity}
                  className="flex items-center justify-center p-1 rounded-full bg-hoverTabs font-bold text-black transition duration-150 ease-in-out hover:bg-activeTab hover:text-white cursor-pointer"
                >
                  <PlusIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="w-full flex items-center justify-center font-semibold font-inter bg-activeTab text-white rounded-sm py-2">
                Rs. {painting.price * quantity}
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-1 flex items-center justify-center bg-hoverTabs text-black font-inter font-semibold rounded-sm transition duration-150 ease-in-out hover:bg-activeTab hover:text-white"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}

export default PaintingDetails;
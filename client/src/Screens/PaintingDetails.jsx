import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Username from '../Components/Username';
import Login from '../Components/LoginPopup';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useArtworks } from '../context/ArtworksContext';
import UserAddress from '../Components/UserAddress';
import axios from 'axios';

function PaintingDetails() {
  const { id } = useParams();
  const { artworks } = useArtworks();
  const painting = artworks.find((artwork) => artwork._id === id);
  const [quantity, setQuantity] = useState(1);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isAddressVisible, setAddressVisible] = useState(false);
  const popupRef = useRef(null);

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

  const toggleAddressVisibility = () => {
    setAddressVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setAddressVisible(false);
      }
    };

    if (isAddressVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddressVisible]);

  const handleAddressSubmit = async (address) => {
    try {
      const response = await axios.post('https://art-core-backend.vercel.app/api/create-order', {
        amount: painting.price * quantity,
      });

      const { orderId } = response.data;

      const options = {
        key: process.env.RAZORPAY_KEY_ID, // Ensure you're using the correct environment variable here
        amount: painting.price * quantity * 100, // Amount in paise
        currency: 'INR',
        name: 'ArtCore',
        description: painting.title,
        image: painting.image,
        order_id: orderId,
        handler: async function (response) {
          await axios.post('https://art-core-backend.vercel.app/api/payment-success', {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            address,
            title: painting.title,
            quantity,
          });
        },
        prefill: {
          name: localStorage.getItem('username'),
          email: localStorage.getItem('email'),
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error during order creation or payment:', error);
    }
  };


  if (!painting) {
    return <div>Artwork not found</div>;
  }

  return (
    <div className="lg:relative overflow-hidden flex flex-col items-center justify-center h-screen w-screen lg:(w-full h-full) bg-background pb-7">
      <Username loginVisibility={loginVisibility} />
      {isLoginVisible && (
        <>
          <Login loginVisibility={loginVisibility} />
          <div className=" bg-black opacity-50 z-40"></div>
        </>
      )}
      {isAddressVisible && (
        <>
          <div ref={popupRef} className='z-50 inset-0 flex items-center justify-center w-full h-full'>
            <UserAddress onSubmit={handleAddressSubmit} />
          </div>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </>
      )}


      <div className='flex flex-col items-center justify-center lg:justify-center h-full w-full p-10 py-16 px-48 gap-5'>

        <div className="flex flex-col border-b-2 lg:w-2/4 border-solid items-center justify-center font-bold font-inter text-md tracking-wider">
          {painting.title}
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between w-[90vw] lg:w-full h-full gap-6">

          <div className="flex items-center justify-center w-full h-full lg:w-[50%] lg:h-[90%] overflow-hidden p-3 border-2 border-activeTab bg-navbar">
            <img
              src={painting.image}
              alt={painting.title}
              className="w-full h-full object-cover cursor-pointer transition duration-150 ease-in-out hover:scale-105"
            />
          </div>

          <div className="flex flex-col w-full lg:w-full h-auto lg:h-[70%] gap-5 items-center justify-around lg:justify-between">

            <div className="text-[1rem] w-full h-auto px-5 overflow-hidden font-semibold font-inter tracking-wide flex items-center justify-center">
              {painting.description}
            </div>

            <div className="flex items-center justify-between w-screen lg:w-full px-4">
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
          type="button"
          onClick={toggleAddressVisibility}
          className="w-[90vw] lg:w-full py-2 flex items-center justify-center bg-hoverTabs text-black font-inter font-semibold rounded-sm transition duration-150 ease-in-out hover:bg-activeTab hover:text-white"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}

export default PaintingDetails;
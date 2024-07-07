import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chatbot from '../Components/Chatbot';
import Username from '../Components/Username';
import Login from '../Components/LoginPopup';
import Painting from '../Components/Painting';
import FilterableTabs from '../Components/FilterableTabs';
import Footer from '../Components/Footer';

function Artworks() {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/artworks');
        setArtworks(response.data);
        setFilteredArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, []);

  const filterArtworks = (type) => {
    if (type === 'ALL') {
      setFilteredArtworks(artworks);
    } else {
      setFilteredArtworks(artworks.filter(artwork => artwork.type === type));
    }
  };

  function loginVisibility() {
    setLoginVisible((prev) => (!prev));
  }

  return (
    <>
      <div className='select-none flex flex-col items-center justify-between w-full min-h-screen bg-background pt-10'>
        <div className='w-full fixed bg-background top-0 pt-10 flex flex-col items-center justify-center z-20'>
          <Username loginVisibility={loginVisibility} />
          {isLoginVisible && (
            <>
              <Login loginVisibility={loginVisibility} />
              <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            </>
          )}
          <div className='flex flex-col items-center justify-center'>
            <p className='font-inter font-bold text-about pb-1'>MY ARTWORKS</p>
            <hr className='w-96 mb-8 bg-black border-none h-[2px]' />
          </div>
          <FilterableTabs onFilter={filterArtworks} />
        </div>

        <div className='w-full mt-44 flex flex-col items-center justify-center bg-background'>
          <div className='w-[85%] h-auto p-3 flex flex-wrap gap-6 items-center justify-center'>
            {filteredArtworks.map((artwork) => (
              <Painting key={artwork._id} artwork={artwork} />
            ))}
          </div>
        </div>
        <Chatbot />
      </div>
      <Footer />
    </>
  );
}

export default Artworks;
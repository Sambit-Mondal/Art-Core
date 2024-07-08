import React, { createContext, useContext, useState } from 'react';

const ArtworksContext = createContext();

export const useArtworks = () => useContext(ArtworksContext);

export const ArtworksProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);

  return (
    <ArtworksContext.Provider value={{ artworks, setArtworks }}>
      {children}
    </ArtworksContext.Provider>
  );
};
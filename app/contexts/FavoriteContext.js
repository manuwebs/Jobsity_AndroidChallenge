import React, { useState } from 'react';

export const FavoriteContext = React.createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const updateFavorites = id => {
    const favs = [...favorites];
    const index = favs.indexOf(id);
    // if the id is in the list proceed to remove it, otherwise proceed to add it
    if (index === -1) {
      setFavorites([...favs, id]);
    } else {
      favs.slice(index, 1);
      setFavorites([favs]);
    }
  };

  const isFavorite = id => {
    return favorites.includes(id);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, updateFavorites, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

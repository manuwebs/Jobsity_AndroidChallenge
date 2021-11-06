import React, { useEffect, useState } from 'react';
import SecureStorage from '../utils/SecureStorage';

export const FavoriteContext = React.createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavs = async () => {
      const f = await SecureStorage.get('fav');
      if (f) setFavorites(f);
    };
    getFavs();
  }, []);

  useEffect(() => {
    SecureStorage.save('fav', favorites);
  }, [favorites]);

  const updateFavorites = item => {
    setFavorites(_favorites => {
      const index = _favorites.indexOf(item);
      // if the id is in the list proceed to remove it, otherwise proceed to add it
      if (index !== -1) {
        _favorites.splice(index, 1);
        return [..._favorites];
      } else {
        return [..._favorites, item];
      }
    });
  };

  const isFavorite = item => favorites?.find(f => f.id === item.id);

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoriteContext.Provider
      value={{ favorites, updateFavorites, isFavorite, clearFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

import React, { useEffect, useState } from 'react';
import SecureStorage from '../utils/SecureStorage';

export const FavoriteContext = React.createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    const getFavs = async () => {
      const f = await SecureStorage.get('fav');
      setFavorites(f ?? []);
    };
    getFavs();
  }, []);

  useEffect(() => {
    if (favorites) {
      SecureStorage.save('fav', favorites);
    }
  }, [favorites]);

  const updateFavorites = item => {
    const favs = [...favorites];
    const index = favs.indexOf(item);
    // if the id is in the list proceed to remove it, otherwise proceed to add it
    if (index === -1) {
      setFavorites([...favs, item]);
    } else {
      favs.slice(index, 1);
      setFavorites([favs]);
    }
  };

  const isFavorite = item => {
    return favorites?.find(f => f.id === item.id);
  };

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoriteContext.Provider
      value={{ favorites, updateFavorites, isFavorite, clearFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

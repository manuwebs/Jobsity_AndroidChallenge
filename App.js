import { NavigationContainer } from '@react-navigation/native';
import React, { Node, useEffect, useState } from 'react';
import AppHeader from './app/components/AppHeader';
import LoadingIndicator from './app/components/LoadingIndicator';
import { FavoriteProvider } from './app/contexts/FavoriteContext';
import { LockContext } from './app/contexts/LockContext';
import AppNavigator from './app/navigation/AppNavigator';
import LockScreen from './app/screens/Auth/LockScreen';
import SecureStorage from './app/utils/SecureStorage';

const App: () => Node = () => {
  const [PIN, setPIN] = useState();
  const [isLocked, setIsLocked] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserPIN = async () => {
      const pin = await SecureStorage.get('pin');
      setIsLoading(false);
      if (pin) {
        setIsLocked(true);
        setPIN(pin);
      } else {
        setIsLocked(false);
      }
    };
    getUserPIN();
  }, []);

  return (
    <LockContext.Provider value={{ PIN, setPIN, isLocked, setIsLocked }}>
      <FavoriteProvider>
        {isLoading ? (
          <LoadingIndicator />
        ) : isLocked ? (
          <LockScreen />
        ) : (
          <NavigationContainer>
            <AppHeader />
            <AppNavigator />
          </NavigationContainer>
        )}
      </FavoriteProvider>
    </LockContext.Provider>
  );
};

export default App;

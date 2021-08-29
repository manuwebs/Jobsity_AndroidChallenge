import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FavoriteScreen from '../screens/favorites/FavoriteScreen';
import { AppColors } from '../utils/CommonStyles';
import routes from './routes';

const Stack = createNativeStackNavigator();

const FavoritesNavigator = () => (
  <Stack.Navigator
    initialRouteName={routes.SETTINGS}
    screenOptions={{
      headerStyle: {
        backgroundColor: AppColors.secondary,
      },
      headerTintColor: AppColors.white,
      headerTitleAlign: 'center',
    }}>
    <Stack.Screen
      options={{ headerShown: false }}
      name={routes.FAVORITE}
      component={FavoriteScreen}
    />
  </Stack.Navigator>
);

export default FavoritesNavigator;

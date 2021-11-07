import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FavoriteScreen from '../screens/favorites/FavoriteScreen';
import EpisodeDetailScreen from '../screens/Shows/EpisodeDetailScreen';
import ShowDetailScreen from '../screens/Shows/ShowDetailScreen';
import { StackDefaultOptions } from '../utils/CommonStyles';
import routes from './routes';

const Stack = createNativeStackNavigator();

const FavoritesNavigator = () => (
  <Stack.Navigator
    initialRouteName={routes.SETTINGS}
    screenOptions={StackDefaultOptions}>
    <Stack.Screen
      options={{ headerShown: false }}
      name={routes.FAVORITE}
      component={FavoriteScreen}
    />
    <Stack.Screen
      name={routes.SHOW_DETAILS}
      component={ShowDetailScreen}
      options={({ route }) => ({ title: route.params.name })}
    />
    <Stack.Screen
      name={routes.EPISODE_DETAILS}
      component={EpisodeDetailScreen}
      options={({ route }) => ({
        title: route.params.episode.name,
      })}
    />
  </Stack.Navigator>
);

export default FavoritesNavigator;

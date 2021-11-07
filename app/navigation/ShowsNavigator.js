import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EpisodeDetailScreen from '../screens/Shows/EpisodeDetailScreen';
import HomeScreen from '../screens/Shows/HomeScreen';
import ShowDetailScreen from '../screens/Shows/ShowDetailScreen';
import { StackDefaultOptions } from '../utils/CommonStyles';
import routes from './routes';

const Stack = createNativeStackNavigator();

const ShowsNavigator = () => (
  <Stack.Navigator
    initialRouteName={routes.HOME}
    screenOptions={StackDefaultOptions}>
    <Stack.Screen
      name={routes.HOME}
      component={HomeScreen}
      options={{ headerShown: false }}
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

export default ShowsNavigator;

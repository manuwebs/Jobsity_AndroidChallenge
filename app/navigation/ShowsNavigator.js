import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EpisodeDetailScreen from '../screens/EpisodeDetailScreen';
import HomeScreen from '../screens/HomeScreen';
import ShowDetailScreen from '../screens/ShowDetailScreen';
import { AppColors } from '../utils/CommonStyles';
import routes from './routes';

const Stack = createNativeStackNavigator();

const ShowsNavigator = () => (
  <Stack.Navigator
    initialRouteName={routes.HOME}
    screenOptions={{
      headerStyle: {
        backgroundColor: AppColors.secondary,
      },
      headerTintColor: AppColors.white,
      headerTitleAlign: 'center',
    }}>
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

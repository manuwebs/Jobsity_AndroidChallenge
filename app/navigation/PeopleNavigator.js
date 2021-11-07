import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PeopleSearchScreen from '../screens/People/PeopleSearchScreen';
import PersonDetailScreen from '../screens/People/PersonDetailScreen';
import EpisodeDetailScreen from '../screens/Shows/EpisodeDetailScreen';
import ShowDetailScreen from '../screens/Shows/ShowDetailScreen';
import { StackDefaultOptions } from '../utils/CommonStyles';
import routes from './routes';

const Stack = createNativeStackNavigator();

const PeopleNavigator = () => (
  <Stack.Navigator
    initialRouteName={routes.HOME}
    screenOptions={StackDefaultOptions}>
    <Stack.Screen
      name={routes.PEOPLE_SEARCH}
      component={PeopleSearchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={routes.PERSON_DETAILS}
      component={PersonDetailScreen}
      options={({ route }) => ({ title: route.params.name })}
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

export default PeopleNavigator;

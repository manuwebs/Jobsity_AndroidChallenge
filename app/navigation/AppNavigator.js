import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from './routes';
import HomeScreen from '../screens/HomeScreen';
import ShowDetailScreen from '../screens/ShowDetailScreen';

const Tab = createNativeStackNavigator();

const AppNavigator = () => (
  <Tab.Navigator initialRouteName={routes.HOME}>
    <Tab.Screen
      name={routes.HOME}
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name={routes.SHOW_DETAILS}
      component={ShowDetailScreen}
      options={({ route }) => ({ title: route.params.name })}
    />
  </Tab.Navigator>
);

export default AppNavigator;

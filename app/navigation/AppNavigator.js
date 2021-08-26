import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from './routes';
import HomeScreen from '../screens/HomeScreen';

const Tab = createNativeStackNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={routes.HOME}
      component={HomeScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

export default AppNavigator;

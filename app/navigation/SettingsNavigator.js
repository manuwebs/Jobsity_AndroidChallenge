import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PinDeleteScreen from '../screens/Settings/PinDeleteScreen';
import PinSetScreen from '../screens/Settings/PinSetScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import { StackDefaultOptions } from '../utils/CommonStyles';
import routes from './routes';

const Stack = createNativeStackNavigator();

const SettingsNavigator = () => (
  <Stack.Navigator
    initialRouteName={routes.SETTINGS}
    screenOptions={StackDefaultOptions}>
    <Stack.Screen
      options={{ headerShown: false }}
      name={routes.SETTINGS}
      component={SettingsScreen}
    />
    <Stack.Screen
      name={routes.PIN_SET}
      component={PinSetScreen}
      options={({ route }) => ({ title: route.params.name })}
    />
    <Stack.Screen
      name={routes.PIN_DELETE}
      component={PinDeleteScreen}
      options={({ route }) => ({ title: route.params.name })}
    />
  </Stack.Navigator>
);

export default SettingsNavigator;

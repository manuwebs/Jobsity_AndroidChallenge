import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SettingsScreen from '../screens/SettingsScreen';
import { AppColors } from '../utils/CommonStyles';
import routes from './routes';

const Stack = createNativeStackNavigator();

const SettingsNavigator = () => (
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
      name={routes.SETTINGS}
      component={SettingsScreen}
    />
  </Stack.Navigator>
);

export default SettingsNavigator;

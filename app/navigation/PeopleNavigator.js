import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PeopleSearchScreen from '../screens/People/PeopleSearchScreen';
import PersonDetailScreen from '../screens/People/PersonDetailScreen';
import { AppColors } from '../utils/CommonStyles';
import routes from './routes';

const Stack = createNativeStackNavigator();

const PeopleNavigator = () => (
  <Stack.Navigator
    initialRouteName={routes.HOME}
    screenOptions={{
      headerTitleStyle: {
        fontSize: 25,
      },
      headerStyle: {
        backgroundColor: AppColors.secondary,
      },
      headerTintColor: AppColors.white,
      headerTitleAlign: 'center',
    }}>
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
  </Stack.Navigator>
);

export default PeopleNavigator;

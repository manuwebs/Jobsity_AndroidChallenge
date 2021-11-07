import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AppIcon from '../components/AppIcon';
import { AppColors } from '../utils/CommonStyles';
import FavoritesNavigator from './FavoritesNavigator';
import PeopleNavigator from './PeopleNavigator';
import routes from './routes';
import SettingsNavigator from './SettingsNavigator';
import ShowsNavigator from './ShowsNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName={routes.SHOWS_STACK}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = 'play';

        switch (route.name) {
          case routes.SHOWS_STACK:
            iconName = focused ? 'movie' : 'movie-outline';
            break;

          case routes.SETTINGS_STACK:
            iconName = focused ? 'cog' : 'cog-outline';
            break;

          case routes.FAVORITE_STACK:
            iconName = focused ? 'star' : 'star-outline';
            break;

          case routes.PEOPLE_STACK:
            iconName = focused ? 'account-search' : 'account-search-outline';
            break;
        }

        return <AppIcon name={iconName} size={35} color={color} />;
      },
      tabBarActiveTintColor: AppColors.white,
      tabBarInactiveTintColor: AppColors.white,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: AppColors.secondary,
      },
      tabBarActiveBackgroundColor: AppColors.secondaryDark,
      headerShown: false,
    })}>
    <Tab.Screen name={routes.SHOWS_STACK} component={ShowsNavigator} />
    <Tab.Screen name={routes.FAVORITE_STACK} component={FavoritesNavigator} />
    <Tab.Screen name={routes.PEOPLE_STACK} component={PeopleNavigator} />
    <Tab.Screen name={routes.SETTINGS_STACK} component={SettingsNavigator} />
  </Tab.Navigator>
);

export default AppNavigator;

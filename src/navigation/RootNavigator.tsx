import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen } from '../screens/Auth/SplashScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { TabNavigator } from './TabNavigator';

import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <NavigationContainer>
		<Stack.Navigator
			initialRouteName="Splash"
			screenOptions={{ 
				headerShown: false,
				contentStyle: { backgroundColor: colors.background }
			}}
		>
		
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
		<Stack.Screen name="MainTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';

import { SplashScreen } from '../screens/Auth/SplashScreen';
import { OnboardingScreen } from '../screens/Auth/OnboardingScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { ForgotPasswordScreen } from '../screens/Auth/ForgotPasswordScreen';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';
import { TabNavigator } from './TabNavigator';
import { NotificationScreen } from '../screens/Notification/NotificationScreen';

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
		<Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
		<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
		<Stack.Screen name="Register" component={RegisterScreen} />
		<Stack.Screen name="MainTabs" component={TabNavigator} />
		<Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

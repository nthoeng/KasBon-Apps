import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { colors } from '../theme/colors';

import { ForgotPasswordScreen } from '../screens/Auth/ForgotPasswordScreen';
import { LoginErrorScreen } from '../screens/Auth/LoginErrorScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { OnboardingScreen } from '../screens/Auth/OnboardingScreen';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';
import { SplashScreen } from '../screens/Auth/SplashScreen';
import { MonthlyBudgetScreen } from '../screens/Budget/MonthlyBudgetScreen';
import { BusinessDashboardScreen } from '../screens/Business/BusinessDashboardScreen';
import { NotificationScreen } from '../screens/Notification/NotificationScreen';
import { CategorySettingsScreen } from '../screens/Profile/CategorySettingsScreen';
import { CurrencySettingsScreen } from '../screens/Profile/CurrencySettingsScreen';
import { ExportDataScreen } from '../screens/Profile/ExportDataScreen';
import { HelpSupportScreen } from '../screens/Profile/HelpSupportScreen';
import { ManageMembersScreen } from '../screens/Profile/ManageMembersScreen';
import { SettingsScreen } from '../screens/Profile/SettingsScreen';
import { CreateProjectScreen } from '../screens/Project/CreateProjectScreen';
import { ProjectCashflowScreen } from '../screens/Project/ProjectCashflowScreen';
import { ProjectDetailScreen } from '../screens/Project/ProjectDetailScreen';
import { MonthlyStatsScreen } from '../screens/Statistics/MonthlyStatsScreen';
import { AddTransactionScreen } from '../screens/Transaction/AddTransactionScreen';
import { ConfirmationScreen } from '../screens/Transaction/ConfirmationScreen';
import { QRWalletScreen } from '../screens/Transaction/QRWalletScreen';
import { RecurringScreen } from '../screens/Transaction/RecurringScreen';
import { TransactionDetailScreen } from '../screens/Transaction/TransactionDetailScreen';
import { TransactionHistoryScreen } from '../screens/Transaction/TransactionHistoryScreen';
import { CreateWalletScreen } from '../screens/Wallet/CreateWalletScreen';
import { WalletDetailScreen } from '../screens/Wallet/WalletDetailScreen';
import { WalletListScreen } from '../screens/Wallet/WalletListScreen';
import { TabNavigator } from './TabNavigator';

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
		<Stack.Screen name="LoginError" component={LoginErrorScreen} />
		<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
		<Stack.Screen name="Register" component={RegisterScreen} />
		<Stack.Screen name="MainTabs" component={TabNavigator} />
		<Stack.Screen name="Add" component={AddTransactionScreen} />
		<Stack.Screen name="NotificationScreen" component={NotificationScreen} />
		<Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
		<Stack.Screen name="QRWallet" component={QRWalletScreen} />
		<Stack.Screen name="Wallets" component={WalletListScreen} />
		<Stack.Screen name="WalletDetail" component={WalletDetailScreen} />
		<Stack.Screen name="CreateWallet" component={CreateWalletScreen} />
		<Stack.Screen name="Confirmation" component={ConfirmationScreen} />
		<Stack.Screen name="Recurring" component={RecurringScreen} />
		<Stack.Screen name="Settings" component={SettingsScreen} />
		<Stack.Screen name="CategorySettings" component={CategorySettingsScreen} />
		<Stack.Screen name="ManageMembers" component={ManageMembersScreen} />
		<Stack.Screen name="CurrencySettings" component={CurrencySettingsScreen} />
		<Stack.Screen name="ExportData" component={ExportDataScreen} />
		<Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
		<Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
		<Stack.Screen name="CreateProject" component={CreateProjectScreen} />
		<Stack.Screen name="MonthlyStats" component={MonthlyStatsScreen} />
		<Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
		<Stack.Screen name="ProjectCashflow" component={ProjectCashflowScreen} />
		<Stack.Screen name="MonthlyBudget" component={MonthlyBudgetScreen} />
		<Stack.Screen name="BusinessDashboard" component={BusinessDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

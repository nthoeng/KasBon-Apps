import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Screens
import { HomeScreen } from '../screens/Home/HomeScreen';
import { WalletListScreen } from '../screens/Wallet/WalletListScreen';
import { ProjectListScreen } from '../screens/Project/ProjectListScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';

// Komponen Overlay Menu (Tadi kita jadikan komponen, bukan screen navigasi)
import { TransactionTypeSelectionScreen } from '../screens/Transaction/TransactionTypeSelectionScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Komponen kosong agar struktur tab bar tetap seimbang (tengah kosong)
  const DummyScreen = () => null;

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textDim,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} /> }} />
        <Tab.Screen name="Wallets" component={WalletListScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="wallet" size={24} color={color} /> }} />
        
        {/* Slot tengah dibiarkan kosong karena tombol aslinya melayang di atas */}
        <Tab.Screen name="AddSpacer" component={DummyScreen} options={{ tabBarIcon: () => null, tabBarButton: () => <View style={{ width: 60 }} /> }} />
        
        <Tab.Screen name="Projects" component={ProjectListScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="flag" size={24} color={color} /> }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }} />
      </Tab.Navigator>

      {/* 1. LAYER KEDUA: Menu Pilihan Transaksi */}
      <TransactionTypeSelectionScreen 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      {/* 2. LAYER TERATAS: Tombol Plus / Close (FAB Toggle) */}
      <View style={styles.fabWrapper}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <View style={[styles.fabContainer, isMenuOpen && styles.fabContainerOpen]}>
            <Ionicons 
              name={isMenuOpen ? "close" : "add"} 
              size={32} 
              color={isMenuOpen ? colors.primary : colors.background} 
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  fabWrapper: {
    position: 'absolute',
    bottom: 25, // Posisi agar pas melayang menjorok ke atas TabBar
    alignSelf: 'center',
    zIndex: 2000,
    elevation: 10,
  },
  fabContainer: {
    width: 60,
    height: 60,
    borderRadius: 30, // Bulat sempurna
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
	shadowColor: colors.primary,
	shadowOffset: { width: 0, height: 4},
	shadowOpacity: 0.3,
	shadowRadius: 10,
  },		
  fabContainerOpen: {
    backgroundColor: '#152238', // Warna gelap saat jadi tombol X
    borderWidth: 2,
    borderColor: colors.primary,
    shadowOpacity: 0,
  }
});
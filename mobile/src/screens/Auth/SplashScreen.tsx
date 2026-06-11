import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export const SplashScreen = ({ navigation }: any) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      // Navigate to Login after animation
      setTimeout(() => {
        navigation.replace('Login');
      }, 1000);
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Text style={styles.logoText}>KB</Text>
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        KasBon
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
        Keuangan Keluarga, Transparan & Mudah
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 10,
  },
  logoText: {
    ...typography.header1,
    fontSize: 48,
    color: colors.background,
    fontWeight: '800',
  },
  title: {
    ...typography.header1,
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    ...typography.body2,
  },
});

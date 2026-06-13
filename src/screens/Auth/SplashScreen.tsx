import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';

const { colors } = theme;

const UI_COLORS = {
  bg: '#0A1628',
  gold: '#F5C842',
  goldDark: '#E8A800',
  text: '#F0F4FF',
  muted: '#8FA8CC',
  dim: '#3A5070',
  violetAlpha: 'rgba(124,111,247,0.04)',
  mintAlpha: 'rgba(45,212,164,0.04)',
};

export const SplashScreen = ({ navigation }: any) => {
  // Setup Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Fade In Seluruh Konten
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // 2. Animasi Gelombang (Pulse Ring) - Looping
    Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 2400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ).start();

    // 3. Animasi Loading Bar (Lebar dari 0 ke 100%)
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: false, // false karena menganimasi lebar (width)
    }).start();

    // 4. Navigasi ke MainTabs setelah loading selesai (sementara)
    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, pulseAnim, progressAnim]);

  // Interpolasi Animasi Gelombang
  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.5]
  });
  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 0]
  });

  // Interpolasi Loading Bar
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={styles.container}>
      {/* ORNAMEN BACKGROUND (Glassmorphism Circles) */}
      <View style={[styles.bgCircle, { width: 260, height: 260, top: -60, right: -80, backgroundColor: UI_COLORS.violetAlpha }]} />
      <View style={[styles.bgCircle, { width: 180, height: 180, bottom: 40, left: -60, backgroundColor: UI_COLORS.mintAlpha }]} />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        
        {/* LOGO KOIN EMAS DENGAN EFEK PULSE */}
        <View style={styles.logoWrap}>
          {/* Efek Glow & Pulse di belakang koin */}
          <View style={styles.glowGold} />
          <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulseScale }], opacity: pulseOpacity }]} />
          <Animated.View style={[styles.pulseRing2, { transform: [{ scale: pulseScale }], opacity: pulseOpacity }]} />
          
          <View style={styles.coin}>
            <View style={styles.coinInner}>
              <Ionicons name="home" size={40} color="#FDE8D8" />
              {/* Ornamen titik koin agar mirip mockup SVG */}
              <View style={[styles.coinDot, { top: 12, right: 14, width: 5, height: 5, opacity: 0.8 }]} />
              <View style={[styles.coinDot, { top: 8, right: 8, width: 3, height: 3, opacity: 0.5 }]} />
            </View>
          </View>
        </View>

        {/* NAMA APLIKASI & TAGLINE */}
        <Text style={styles.appName}>
          <Text style={{ color: UI_COLORS.gold }}>Kas</Text>Bon
        </Text>
        <Text style={styles.tagline}>catat bareng, hemat bareng</Text>

        {/* LOADING BAR */}
        <View style={styles.loaderWrap}>
          <View style={styles.loaderTrack}>
            <Animated.View style={[styles.loaderFill, { width: progressWidth }]} />
          </View>
          <Text style={styles.loadingTxt}>Menyiapkan keuangan keluarga...</Text>
        </View>

      </Animated.View>

      {/* VERSI APLIKASI (Fixed di Bawah) */}
      <Text style={styles.versionTxt}>v1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgCircle: {
    position: 'absolute',
    borderRadius: 999,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  
  /* LOGO KOIN EMAS */
  logoWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  glowGold: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(245,200,66,0.1)',
  },
  pulseRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(245,200,66,0.3)',
  },
  pulseRing2: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: 'rgba(245,200,66,0.15)',
  },
  coin: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: UI_COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: UI_COLORS.gold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  coinInner: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: UI_COLORS.goldDark,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  coinDot: {
    position: 'absolute',
    borderRadius: 99,
    backgroundColor: '#FDE8D8',
  },

  /* TEKS & BRANDING */
  appName: {
    fontSize: 40,
    fontWeight: '700',
    color: UI_COLORS.text,
    letterSpacing: -1,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 13,
    color: UI_COLORS.muted,
    letterSpacing: 0.5,
    marginBottom: 48,
  },

  /* LOADING TRACKER */
  loaderWrap: {
    alignItems: 'center',
  },
  loaderTrack: {
    width: 140,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 16,
    overflow: 'hidden',
  },
  loaderFill: {
    height: '100%',
    backgroundColor: UI_COLORS.gold,
    borderRadius: 2,
  },
  loadingTxt: {
    fontSize: 11,
    color: UI_COLORS.dim,
    letterSpacing: 0.5,
  },

  /* FOOTER */
  versionTxt: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 28,
    fontSize: 11,
    color: UI_COLORS.dim,
    fontWeight: '500',
  },
});
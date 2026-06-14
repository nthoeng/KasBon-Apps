import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const UI_COLORS = {
  bg: '#0A1628', card: '#152238',
  b2: 'rgba(255,255,255,0.15)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878'
};

export const TransactionTypeSelectionScreen = ({ isOpen, onClose }: any) => {
  const navigation = useNavigation<any>();
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Efek Animasi Super Smooth
  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, friction: 8, tension: 50, useNativeDriver: true })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: height, duration: 200, useNativeDriver: true })
      ]).start();
    }
  }, [isOpen]);

  const handleSelect = (typeParam: string) => {
    onClose();
    // Beri jeda sepersekian detik agar menu turun dulu, baru pindah layar
    setTimeout(() => {
      navigation.navigate('Add', { type: typeParam });
    }, 150);
  };

  return (
    <View style={styles.overlay} pointerEvents={isOpen ? 'auto' : 'none'}>
      {/* Backdrop Gelap - Klik area luar untuk tutup */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      {/* Kontainer Bottom Sheet */}
      <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.handleWrap}><View style={styles.handle} /></View>
        
        <Text style={styles.title}>Pilih Tipe Transaksi</Text>
        <Text style={styles.subtitle}>Apa yang ingin kamu catat hari ini?</Text>

        <View style={styles.grid}>
          {/* Keluar */}
          <TouchableOpacity style={[styles.card, { borderColor: 'rgba(255,107,107,0.3)' }]} activeOpacity={0.7} onPress={() => handleSelect('expense')}>
            <View style={[styles.iconWrap, { backgroundColor: 'rgba(255,107,107,0.15)' }]}>
              <Ionicons name="arrow-up" size={24} color={UI_COLORS.red} />
            </View>
            <Text style={styles.cardTitle}>Pengeluaran</Text>
            <Text style={styles.cardDesc}>Catat uang keluar</Text>
          </TouchableOpacity>

          {/* Masuk */}
          <TouchableOpacity style={[styles.card, { borderColor: 'rgba(45,212,164,0.3)' }]} activeOpacity={0.7} onPress={() => handleSelect('income')}>
            <View style={[styles.iconWrap, { backgroundColor: 'rgba(45,212,164,0.15)' }]}>
              <Ionicons name="arrow-down" size={24} color={UI_COLORS.mint} />
            </View>
            <Text style={styles.cardTitle}>Pemasukan</Text>
            <Text style={styles.cardDesc}>Catat uang masuk</Text>
          </TouchableOpacity>

          {/* Transfer */}
          <TouchableOpacity style={[styles.card, { borderColor: 'rgba(124,111,247,0.3)' }]} activeOpacity={0.7} onPress={() => handleSelect('transfer')}>
            <View style={[styles.iconWrap, { backgroundColor: 'rgba(124,111,247,0.15)' }]}>
              <Ionicons name="swap-horizontal" size={24} color={UI_COLORS.violet} />
            </View>
            <Text style={styles.cardTitle}>Transfer</Text>
            <Text style={styles.cardDesc}>Pindah dompet</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, zIndex: 1000, elevation: 10 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)' },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: UI_COLORS.bg,
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    paddingHorizontal: 24, paddingTop: 12, paddingBottom: 110, // Ruang ekstra agar tombol Plus tidak tertutup teks
    borderTopWidth: 1, borderColor: UI_COLORS.b2,
  },
  handleWrap: { alignItems: 'center', marginBottom: 20 },
  handle: { width: 40, height: 5, borderRadius: 3, backgroundColor: UI_COLORS.t3, opacity: 0.5 },
  title: { fontSize: 20, fontWeight: '700', color: UI_COLORS.text, textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 13, color: UI_COLORS.t2, textAlign: 'center', marginBottom: 24 },
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  card: { flex: 1, backgroundColor: UI_COLORS.card, borderWidth: 1, borderRadius: 20, paddingVertical: 16, paddingHorizontal: 8, alignItems: 'center', marginHorizontal: 4 },
  iconWrap: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 13, fontWeight: '600', color: UI_COLORS.text, marginBottom: 4 },
  cardDesc: { fontSize: 10, color: UI_COLORS.t3, textAlign: 'center' },
});
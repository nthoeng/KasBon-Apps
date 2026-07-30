import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UI_COLORS = {
  bg: '#0A1628',
  card: '#152238',
  card2: '#1A2A42',
  gold: '#F5C842',
  red: '#FF6B6B',
  text: '#F0F4FF',
  t2: '#8FA8CC',
  t3: '#3E5878',
  b2: 'rgba(255,255,255,0.15)',
};

export const ProLimitTriggerScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // Bisa menerima pesan kustom via parameter navigasi
  const limitType = route.params?.limitType || 'member'; // 'member' | 'project'
  const titleText = limitType === 'member' ? 'Batas Anggota Keluarga' : 'Batas Project Usaha';
  const descText =
    limitType === 'member'
      ? 'Paket Free hanya mendukung 2 anggota keluarga. Upgrade ke Pro untuk menambahkan anggota tanpa batas.'
      : 'Paket Free hanya mendukung 1 project usaha aktif. Upgrade ke Pro untuk kelola banyak usaha sekaligus.';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.ibtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={18} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.tcenter}>Batas Paket Free</Text>
        <View style={{ width: 34 }} />
      </View>

      <View style={styles.content}>
        {/* BANNER REASON */}
        <View style={styles.limitBanner}>
          <View style={styles.limitTop}>
            <Ionicons name="lock-closed" size={16} color={UI_COLORS.red} />
            <Text style={styles.limitTopTxt}>{titleText}</Text>
          </View>
          <Text style={styles.limitDesc}>{descText}</Text>

          <View style={styles.limitBarTrack}>
            <View style={[styles.limitBarFill, { width: '100%' }]} />
          </View>

          <View style={styles.limitFoot}>
            <Text style={styles.limitFootTxt}>
              {limitType === 'member' ? '2 dari 2 anggota' : '1 dari 1 project'}
            </Text>
            <Text style={styles.limitFootTxt}>Free plan</Text>
          </View>
        </View>

        {/* INFO CARD */}
        <View style={styles.limitReasonCard}>
          <View style={styles.iconGoldWrap}>
            <Ionicons name="star" size={16} color={UI_COLORS.gold} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.featTitle}>Upgrade untuk lanjutkan</Text>
            <Text style={styles.featSub}>
              Buka semua batasan dan nikmati pencatatan tanpa batas bersama seluruh keluarga.
            </Text>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* 👇 CTA MENUJU HALAMAN UTAMA UPGRADE */}
        <TouchableOpacity
          style={styles.ctaBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ProUpgrade')}
        >
          <Ionicons name="star" size={17} color={UI_COLORS.bg} />
          <Text style={styles.ctaBtnTxt}>Lihat Paket Pro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ghostBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.ghostBtnTxt}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UI_COLORS.bg },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  ibtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: UI_COLORS.b2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tcenter: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: UI_COLORS.text,
  },
  content: { flex: 1, paddingHorizontal: 18, paddingTop: 10, paddingBottom: 20 },
  limitBanner: {
    backgroundColor: UI_COLORS.card2,
    borderWidth: 1,
    borderColor: 'rgba(255,107,107,0.3)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  limitTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  limitTopTxt: { fontSize: 14, fontWeight: '600', color: UI_COLORS.red },
  limitDesc: { fontSize: 12.5, color: UI_COLORS.t2, lineHeight: 18, marginBottom: 12 },
  limitBarTrack: {
    height: 6,
    backgroundColor: UI_COLORS.b2,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  limitBarFill: { height: '100%', backgroundColor: UI_COLORS.red, borderRadius: 3 },
  limitFoot: { flexDirection: 'row', justifyContent: 'space-between' },
  limitFootTxt: { fontSize: 11, color: UI_COLORS.t3 },
  limitReasonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: UI_COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 0.5,
    borderColor: UI_COLORS.b2,
  },
  iconGoldWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(245,200,66,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featTitle: { fontSize: 13, fontWeight: '600', color: UI_COLORS.text, marginBottom: 2 },
  featSub: { fontSize: 11.5, color: UI_COLORS.t3, lineHeight: 16 },
  ctaBtn: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    backgroundColor: UI_COLORS.gold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  ctaBtnTxt: { fontSize: 14.5, fontWeight: '700', color: UI_COLORS.bg },
  ghostBtn: {
    width: '100%',
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostBtnTxt: { fontSize: 12, color: UI_COLORS.t2, fontWeight: '500' },
});
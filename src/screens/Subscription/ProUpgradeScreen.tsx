/**
 * ============================================================================
 * ⚓ BACKEND ARCHITECTURE NOTES (Untuk Fase Laravel + MySQL Nanti)
 * ============================================================================
 * * 1. METHOD & ENDPOINT KUNCI:
 * - GET /api/subscriptions/plans
 * Mengambil daftar harga aktif, diskon tahunan, dan ketersediaan trial 14 hari.
 * - POST /api/subscriptions/checkout
 * Memulai transaksi pembayaran (integrasi Midtrans / Xendit / Google Play IAP).
 * - GET /api/subscriptions/status
 * Mengecek status langganan workspace saat ini dan limit yang tersisa.
 * * 2. POTENSI TABEL DATABASE (MySQL):
 * - `subscriptions`
 * (id, user_id, workspace_id, plan_type ['free', 'pro_monthly', 'pro_yearly'],
 * start_date, end_date, status, payment_gateway_id)
 * - `subscription_transactions`
 * (id, subscription_id, amount, payment_method, status, transaction_date)
 * * 3. LOGIKA BACKEND (Laravel Middleware & Policy):
 * - Limit Enforcement: Middleware `CheckWorkspaceLimit` memeriksa jumlah anggota
 * atau project. Jika `plan_type === 'free'` dan limit tercapai, return HTTP 403
 * dengan error code `LIMIT_EXCEEDED` agar mobile app otomatis membuka layar ini.
 * - Family Shared Access: 1 langganan aktif pada `workspace_id` otomatis
 * memberlakukan status Pro ke seluruh anggota di dalam workspace tersebut.
 * ============================================================================
 */

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UI_COLORS = {
  bg: '#0A1628',
  bg2: '#0F1E35',
  card: '#152238',
  card2: '#1A2A42',
  gold: '#F5C842',
  mint: '#2DD4A4',
  violet: '#7C6FF7',
  text: '#F0F4FF',
  t2: '#8FA8CC',
  t3: '#3E5878',
  b1: 'rgba(255,255,255,0.08)',
  b2: 'rgba(255,255,255,0.15)',
};

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

type BillingPlan = 'monthly' | 'yearly';

export const ProUpgradeScreen = () => {
  const navigation = useNavigation<any>();
  const [billingPlan, setBillingPlan] = useState<BillingPlan>('yearly');

  const priceData = {
    monthly: {
      num: 'Rp 35.000',
      period: '/bulan',
      sub: 'Ditagih setiap bulan, bisa batal kapan saja',
    },
    yearly: {
      num: 'Rp 24.900',
      period: '/bulan, ditagih tahunan',
      sub: 'Setara Rp 299.000/tahun untuk seluruh keluarga',
    },
  };

  const currentPrice = priceData[billingPlan];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.ibtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={18} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.tcenter}>KasBon Pro</Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Ionicons name="star" size={13} color={UI_COLORS.gold} />
            <Text style={styles.heroBadgeTxt}>Untuk seluruh keluarga</Text>
          </View>
          <Text style={styles.heroTitle}>
            Kelola keuangan keluarga{'\n'}
            <Text style={{ color: UI_COLORS.gold }}>tanpa batas</Text>
          </Text>
          <Text style={styles.heroDesc}>
            Satu langganan, semua anggota keluarga ikut menikmati. Anak,
            project usaha, dan riwayat tanpa batas.
          </Text>
        </View>

        {/* TOGGLE BULANAN / TAHUNAN */}
        <View style={styles.toggleWrap}>
          <TouchableOpacity
            style={[
              styles.toggleOpt,
              billingPlan === 'monthly' && styles.toggleOptOn,
            ]}
            onPress={() => setBillingPlan('monthly')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.toggleOptTxt,
                billingPlan === 'monthly' && styles.toggleOptTxtOn,
              ]}
            >
              Bulanan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleOpt,
              billingPlan === 'yearly' && styles.toggleOptOn,
            ]}
            onPress={() => setBillingPlan('yearly')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.toggleOptTxt,
                billingPlan === 'yearly' && styles.toggleOptTxtOn,
              ]}
            >
              Tahunan
            </Text>
            <View style={styles.saveChip}>
              <Text style={styles.saveChipTxt}>Hemat 30%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* PRICE CARD */}
        <View style={styles.priceCard}>
          <View style={styles.priceRow}>
            <Text style={styles.priceNum}>{currentPrice.num}</Text>
            <Text style={styles.pricePeriod}>{currentPrice.period}</Text>
          </View>
          <Text style={styles.priceSub}>{currentPrice.sub}</Text>
          <View style={styles.trialRow}>
            <Ionicons name="gift" size={16} color="#A89FF9" />
            <Text style={styles.trialTxt}>
              Coba gratis 14 hari, batalkan kapan saja
            </Text>
          </View>
        </View>

        {/* FEATURE LIST SINGKAT */}
        <View style={styles.featList}>
          <View style={styles.featRow}>
            <View style={styles.featIcon}>
              <Ionicons name="people" size={15} color={UI_COLORS.mint} />
            </View>
            <View style={styles.featText}>
              <Text style={styles.featTitle}>
                Anggota keluarga tanpa batas
              </Text>
              <Text style={styles.featSub}>
                Free dibatasi 2 anggota, Pro tanpa batas
              </Text>
            </View>
          </View>

          <View style={styles.featRow}>
            <View style={styles.featIcon}>
              <Ionicons name="briefcase" size={15} color={UI_COLORS.mint} />
            </View>
            <View style={styles.featText}>
              <Text style={styles.featTitle}>
                Project & usaha tanpa batas
              </Text>
              <Text style={styles.featSub}>
                Kelola banyak usaha keluarga sekaligus
              </Text>
            </View>
          </View>

          <View style={[styles.featRow, { borderBottomWidth: 0 }]}>
            <View style={styles.featIcon}>
              <Ionicons
                name="time-outline"
                size={15}
                color={UI_COLORS.mint}
              />
            </View>
            <View style={styles.featText}>
              <Text style={styles.featTitle}>
                Riwayat transaksi tanpa batas
              </Text>
              <Text style={styles.featSub}>
                Free hanya simpan 3 bulan terakhir
              </Text>
            </View>
          </View>
        </View>

        {/* 👇 TRIGGER KE HALAMAN PERBANDINGAN & FAQ */}
        <TouchableOpacity
          style={styles.compareLink}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ProComparisonFaq')}
        >
          <Text style={styles.compareLinkTxt}>
            Lihat perbandingan lengkap & FAQ
          </Text>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={UI_COLORS.violet}
          />
        </TouchableOpacity>

        {/* CTA BUTTONS */}
        <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.85}>
          <Ionicons name="rocket" size={18} color={UI_COLORS.bg} />
          <Text style={styles.ctaBtnTxt}>Mulai coba gratis 14 hari</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ghostBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.ghostBtnTxt}>Lanjutkan dengan Free</Text>
        </TouchableOpacity>

        <Text style={styles.legalNote}>
          Otomatis diperpanjang setelah trial berakhir kecuali dibatalkan.
          Kelola langganan kapan saja di Pengaturan.
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  scrollContent: { paddingHorizontal: 18 },
  hero: { alignItems: 'center', paddingVertical: 14 },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: hexToRgba(UI_COLORS.gold, 0.12),
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.gold, 0.3),
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  heroBadgeTxt: { fontSize: 11, fontWeight: '600', color: UI_COLORS.gold },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: UI_COLORS.text,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroDesc: {
    fontSize: 12.5,
    color: UI_COLORS.t2,
    lineHeight: 18,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  toggleWrap: {
    flexDirection: 'row',
    backgroundColor: UI_COLORS.card2,
    borderRadius: 12,
    padding: 3,
    marginVertical: 16,
  },
  toggleOpt: {
    flex: 1,
    height: 38,
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  toggleOptOn: { backgroundColor: UI_COLORS.gold },
  toggleOptTxt: { fontSize: 12.5, color: UI_COLORS.t3, fontWeight: '600' },
  toggleOptTxtOn: { color: UI_COLORS.bg },
  saveChip: {
    backgroundColor: hexToRgba(UI_COLORS.mint, 0.18),
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  saveChipTxt: { fontSize: 9, fontWeight: '700', color: UI_COLORS.mint },
  priceCard: {
    backgroundColor: UI_COLORS.card2,
    borderWidth: 1,
    borderColor: hexToRgba(UI_COLORS.gold, 0.35),
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 4,
  },
  priceNum: { fontSize: 32, fontWeight: '700', color: UI_COLORS.gold },
  pricePeriod: { fontSize: 12, color: UI_COLORS.t2 },
  priceSub: {
    textAlign: 'center',
    fontSize: 11,
    color: UI_COLORS.t3,
    marginBottom: 14,
  },
  trialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: hexToRgba(UI_COLORS.violet, 0.08),
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.violet, 0.25),
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  trialTxt: { fontSize: 11, color: '#A89FF9' },
  featList: {
    backgroundColor: UI_COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 0.5,
    borderColor: UI_COLORS.b2,
    marginBottom: 14,
  },
  featRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: UI_COLORS.b1,
  },
  featIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: hexToRgba(UI_COLORS.mint, 0.12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  featText: { flex: 1 },
  featTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: UI_COLORS.text,
    marginBottom: 2,
  },
  featSub: { fontSize: 11, color: UI_COLORS.t3, lineHeight: 16 },
  compareLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 20,
    paddingVertical: 8,
  },
  compareLinkTxt: {
    fontSize: 12.5,
    fontWeight: '600',
    color: UI_COLORS.violet,
  },
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
  legalNote: {
    textAlign: 'center',
    fontSize: 10,
    color: UI_COLORS.t3,
    lineHeight: 15,
    paddingHorizontal: 12,
    marginTop: 6,
  },
});
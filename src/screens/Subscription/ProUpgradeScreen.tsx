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
import { useNavigation, useRoute } from '@react-navigation/native';
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

// ─── TEMA WARNA KASBON (DARK / GLASSMORPHISM) ───────────────────────────────
const UI_COLORS = {
  bg: '#0A1628',
  bg2: '#0F1E35',
  card: '#152238',
  card2: '#1A2A42',
  gold: '#F5C842',
  mint: '#2DD4A4',
  red: '#FF6B6B',
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

type ScreenTab = 'utama' | 'limit' | 'compare';
type BillingPlan = 'monthly' | 'yearly';

export function ProUpgradeScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // Secara default mengambil tab dari parameter navigasi jika ada (misal: 'limit')
  const [activeTab, setActiveTab] = useState<ScreenTab>(
    route.params?.initialTab || 'utama'
  );
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

      {/* ── TOP NAV TABS (PENGGANTI SWIPE / MODE EKSPLORASI) ── */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tb, activeTab === 'utama' && styles.tbOn]}
          onPress={() => setActiveTab('utama')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tbText,
              activeTab === 'utama' && styles.tbTextOn,
            ]}
          >
            Halaman utama
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tb, activeTab === 'limit' && styles.tbOn]}
          onPress={() => setActiveTab('limit')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tbText,
              activeTab === 'limit' && styles.tbTextOn,
            ]}
          >
            Trigger limit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tb, activeTab === 'compare' && styles.tbOn]}
          onPress={() => setActiveTab('compare')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tbText,
              activeTab === 'compare' && styles.tbTextOn,
            ]}
          >
            Perbandingan & FAQ
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── TOPBAR DENGAN TOMBOL CLOSE/BACK ── */}
      <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.ibtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons
            name={activeTab === 'utama' ? 'close' : 'arrow-back'}
            size={18}
            color={UI_COLORS.t2}
          />
        </TouchableOpacity>
        <Text style={styles.tcenter}>
          {activeTab === 'utama'
            ? 'KasBon Pro'
            : activeTab === 'limit'
            ? 'Tambah anggota'
            : 'Free vs Pro'}
        </Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* =================================================================
            TAB 1: HALAMAN UTAMA (HERO, TOGGLE, FITUR, CTA)
           ================================================================= */}
        {activeTab === 'utama' && (
          <View>
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

            {/* FEATURE LIST */}
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

              <View style={styles.featRow}>
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

              <View style={styles.featRow}>
                <View style={styles.featIcon}>
                  <Ionicons
                    name="share-outline"
                    size={15}
                    color={UI_COLORS.mint}
                  />
                </View>
                <View style={styles.featText}>
                  <Text style={styles.featTitle}>
                    Export laporan PDF & Excel
                  </Text>
                  <Text style={styles.featSub}>
                    Untuk laporan pajak atau dokumentasi usaha
                  </Text>
                </View>
              </View>

              <View style={styles.featRow}>
                <View style={styles.featIcon}>
                  <Ionicons
                    name="desktop-outline"
                    size={15}
                    color={UI_COLORS.mint}
                  />
                </View>
                <View style={styles.featText}>
                  <Text style={styles.featTitle}>
                    Akses web admin dashboard
                  </Text>
                  <Text style={styles.featSub}>
                    Pantau statistik keluarga dari laptop/PC
                  </Text>
                </View>
              </View>

              <View style={[styles.featRow, { borderBottomWidth: 0 }]}>
                <View style={styles.featIcon}>
                  <Ionicons
                    name="bar-chart-outline"
                    size={15}
                    color={UI_COLORS.mint}
                  />
                </View>
                <View style={styles.featText}>
                  <Text style={styles.featTitle}>
                    Statistik & insight lengkap
                  </Text>
                  <Text style={styles.featSub}>
                    Perbandingan antar anggota dan tren tahunan
                  </Text>
                </View>
              </View>
            </View>

            {/* CALL TO ACTION BUTTONS */}
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
          </View>
        )}

        {/* =================================================================
            TAB 2: TRIGGER LIMIT (PAYWALL SAAT MENCAPAI BATAS FREE)
           ================================================================= */}
        {activeTab === 'limit' && (
          <View>
            <View style={styles.limitBanner}>
              <View style={styles.limitTop}>
                <Ionicons name="lock-closed" size={16} color={UI_COLORS.red} />
                <Text style={styles.limitTopTxt}>
                  Batas paket Free tercapai
                </Text>
              </View>
              <Text style={styles.limitDesc}>
                Paket Free hanya mendukung 2 anggota keluarga. Upgrade ke Pro
                untuk menambahkan anggota tanpa batas.
              </Text>

              <View style={styles.limitBarTrack}>
                <View
                  style={[styles.limitBarFill, { width: '100%' }]}
                />
              </View>

              <View style={styles.limitFoot}>
                <Text style={styles.limitFootTxt}>2 dari 2 anggota</Text>
                <Text style={styles.limitFootTxt}>Free plan</Text>
              </View>
            </View>

            <View style={styles.limitReasonCard}>
              <View
                style={[
                  styles.featIcon,
                  { backgroundColor: hexToRgba(UI_COLORS.gold, 0.12) },
                ]}
              >
                <Ionicons name="star" size={15} color={UI_COLORS.gold} />
              </View>
              <View style={styles.featText}>
                <Text style={styles.featTitle}>Upgrade untuk lanjutkan</Text>
                <Text style={styles.featSub}>
                  Tambahkan Andi dan anggota lainnya tanpa batas dengan KasBon
                  Pro
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.ctaBtn}
              activeOpacity={0.85}
              onPress={() => setActiveTab('utama')}
            >
              <Ionicons name="star" size={17} color={UI_COLORS.bg} />
              <Text style={styles.ctaBtnTxt}>Lihat paket Pro</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ghostBtn}
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.ghostBtnTxt}>Kembali</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* =================================================================
            TAB 3: COMPARE & FAQ (TABEL PERBANDINGAN FREE VS PRO)
           ================================================================= */}
        {activeTab === 'compare' && (
          <View>
            {/* COMPARISON TABLE */}
            <View style={styles.cmpHead}>
              <Text style={[styles.cmpHeadTxt, { textAlign: 'left' }]}>
                Fitur
              </Text>
              <Text style={styles.cmpHeadTxt}>Free</Text>
              <Text style={[styles.cmpHeadTxt, { color: UI_COLORS.gold }]}>
                Pro
              </Text>
            </View>

            <View style={styles.cmpRow}>
              <Text style={styles.cmpLabel}>Anggota keluarga</Text>
              <Text style={styles.cmpVal}>2</Text>
              <View style={styles.cmpCheckWrap}>
                <Ionicons name="infinite" size={16} color={UI_COLORS.mint} />
              </View>
            </View>

            <View style={styles.cmpRow}>
              <Text style={styles.cmpLabel}>Project & usaha</Text>
              <Text style={styles.cmpVal}>1</Text>
              <View style={styles.cmpCheckWrap}>
                <Ionicons name="infinite" size={16} color={UI_COLORS.mint} />
              </View>
            </View>

            <View style={styles.cmpRow}>
              <Text style={styles.cmpLabel}>Riwayat transaksi</Text>
              <Text style={styles.cmpVal}>3 bulan</Text>
              <Text style={[styles.cmpVal, { color: UI_COLORS.gold }]}>
                Tanpa batas
              </Text>
            </View>

            <View style={styles.cmpRow}>
              <Text style={styles.cmpLabel}>QR transfer</Text>
              <View style={styles.cmpCheckWrap}>
                <Ionicons name="checkmark" size={16} color={UI_COLORS.mint} />
              </View>
              <View style={styles.cmpCheckWrap}>
                <Ionicons name="checkmark" size={16} color={UI_COLORS.mint} />
              </View>
            </View>

            <View style={styles.cmpRow}>
              <Text style={styles.cmpLabel}>Export PDF/Excel</Text>
              <View style={styles.cmpCheckWrap}>
                <Ionicons name="remove" size={15} color={UI_COLORS.t3} />
              </View>
              <View style={styles.cmpCheckWrap}>
                <Ionicons name="checkmark" size={16} color={UI_COLORS.mint} />
              </View>
            </View>

            <View style={styles.cmpRow}>
              <Text style={styles.cmpLabel}>Web admin dashboard</Text>
              <View style={styles.cmpCheckWrap}>
                <Ionicons name="remove" size={15} color={UI_COLORS.t3} />
              </View>
              <View style={styles.cmpCheckWrap}>
                <Ionicons name="checkmark" size={16} color={UI_COLORS.mint} />
              </View>
            </View>

            <View style={styles.cmpRow}>
              <Text style={styles.cmpLabel}>Statistik lengkap</Text>
              <View style={styles.cmpCheckWrap}>
                <Ionicons name="remove" size={15} color={UI_COLORS.t3} />
              </View>
              <View style={styles.cmpCheckWrap}>
                <Ionicons name="checkmark" size={16} color={UI_COLORS.mint} />
              </View>
            </View>

            <View style={[styles.cmpRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.cmpLabel}>Akun anak terbatas</Text>
              <View style={styles.cmpCheckWrap}>
                <Ionicons name="checkmark" size={16} color={UI_COLORS.mint} />
              </View>
              <View style={styles.cmpCheckWrap}>
                <Ionicons name="checkmark" size={16} color={UI_COLORS.mint} />
              </View>
            </View>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <Text style={styles.sectLbl}>Pertanyaan umum</Text>

            <View style={styles.faqItem}>
              <View style={styles.faqQ}>
                <Ionicons
                  name="help-circle-outline"
                  size={16}
                  color={UI_COLORS.violet}
                />
                <Text style={styles.faqQTxt}>
                  Apakah semua anggota harus bayar?
                </Text>
              </View>
              <Text style={styles.faqA}>
                Tidak. Satu langganan Pro berlaku untuk seluruh keluarga yang
                tergabung dalam satu workspace.
              </Text>
            </View>

            <View style={styles.faqItem}>
              <View style={styles.faqQ}>
                <Ionicons
                  name="help-circle-outline"
                  size={16}
                  color={UI_COLORS.violet}
                />
                <Text style={styles.faqQTxt}>
                  Bagaimana jika trial berakhir?
                </Text>
              </View>
              <Text style={styles.faqA}>
                Akun otomatis turun ke Free, data tetap aman tersimpan, hanya
                fitur Pro yang terkunci kembali.
              </Text>
            </View>

            <View style={styles.faqItem}>
              <View style={styles.faqQ}>
                <Ionicons
                  name="help-circle-outline"
                  size={16}
                  color={UI_COLORS.violet}
                />
                <Text style={styles.faqQTxt}>Bisa batalkan kapan saja?</Text>
              </View>
              <Text style={styles.faqA}>
                Bisa, langsung dari menu Pengaturan tanpa perlu hubungi siapa
                pun.
              </Text>
            </View>
          </View>
        )}

        {/* 👇 PENGAMAN BOTTOM NAV BAR */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_COLORS.bg,
  },
  tabBar: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  tb: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: UI_COLORS.b2,
    backgroundColor: 'transparent',
  },
  tbOn: {
    borderColor: UI_COLORS.gold,
    backgroundColor: hexToRgba(UI_COLORS.gold, 0.1),
  },
  tbText: {
    fontSize: 11,
    color: UI_COLORS.t2,
  },
  tbTextOn: {
    color: UI_COLORS.gold,
    fontWeight: '600',
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 6,
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
  scrollContent: {
    paddingHorizontal: 18,
  },

  // HERO
  hero: {
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
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
  heroBadgeTxt: {
    fontSize: 11,
    fontWeight: '600',
    color: UI_COLORS.gold,
  },
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

  // TOGGLE WRAP
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
  toggleOptOn: {
    backgroundColor: UI_COLORS.gold,
  },
  toggleOptTxt: {
    fontSize: 12.5,
    color: UI_COLORS.t3,
    fontWeight: '600',
  },
  toggleOptTxtOn: {
    color: UI_COLORS.bg,
  },
  saveChip: {
    backgroundColor: hexToRgba(UI_COLORS.mint, 0.18),
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  saveChipTxt: {
    fontSize: 9,
    fontWeight: '700',
    color: UI_COLORS.mint,
  },

  // PRICE CARD
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
  priceNum: {
    fontSize: 32,
    fontWeight: '700',
    color: UI_COLORS.gold,
  },
  pricePeriod: {
    fontSize: 12,
    color: UI_COLORS.t2,
  },
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
  trialTxt: {
    fontSize: 11,
    color: '#A89FF9',
  },

  // FEAT LIST
  featList: {
    marginBottom: 18,
  },
  featRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
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
  featText: {
    flex: 1,
  },
  featTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: UI_COLORS.text,
    marginBottom: 2,
  },
  featSub: {
    fontSize: 11,
    color: UI_COLORS.t3,
    lineHeight: 16,
  },

  // CTA BUTTONS
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
  ctaBtnTxt: {
    fontSize: 14.5,
    fontWeight: '700',
    color: UI_COLORS.bg,
  },
  ghostBtn: {
    width: '100%',
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostBtnTxt: {
    fontSize: 12,
    color: UI_COLORS.t2,
    fontWeight: '500',
  },
  legalNote: {
    textAlign: 'center',
    fontSize: 10,
    color: UI_COLORS.t3,
    lineHeight: 15,
    paddingHorizontal: 12,
    marginTop: 6,
  },

  // TAB 2: LIMIT BANNER
  limitBanner: {
    backgroundColor: UI_COLORS.card2,
    borderWidth: 1,
    borderColor: hexToRgba(UI_COLORS.red, 0.3),
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  limitTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  limitTopTxt: {
    fontSize: 13,
    fontWeight: '600',
    color: UI_COLORS.red,
  },
  limitDesc: {
    fontSize: 11.5,
    color: UI_COLORS.t2,
    lineHeight: 17,
    marginBottom: 10,
  },
  limitBarTrack: {
    height: 6,
    backgroundColor: UI_COLORS.b2,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  limitBarFill: {
    height: '100%',
    backgroundColor: UI_COLORS.red,
    borderRadius: 3,
  },
  limitFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  limitFootTxt: {
    fontSize: 10,
    color: UI_COLORS.t3,
  },
  limitReasonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: UI_COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
  },

  // TAB 3: COMPARE & FAQ
  cmpHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: UI_COLORS.b1,
    marginBottom: 4,
  },
  cmpHeadTxt: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: UI_COLORS.t2,
  },
  cmpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: UI_COLORS.b1,
  },
  cmpLabel: {
    flex: 1.4,
    fontSize: 12,
    color: UI_COLORS.text,
  },
  cmpVal: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11.5,
    color: UI_COLORS.t2,
  },
  cmpCheckWrap: {
    flex: 1,
    alignItems: 'center',
  },
  sectLbl: {
    fontSize: 11,
    color: UI_COLORS.t3,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  faqItem: {
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: UI_COLORS.b2,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  faqQ: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  faqQTxt: {
    fontSize: 12.5,
    fontWeight: '600',
    color: UI_COLORS.text,
  },
  faqA: {
    fontSize: 11.5,
    color: UI_COLORS.t2,
    lineHeight: 17,
    paddingLeft: 24,
  },
});
/**
 * ============================================================================
 * ⚓ BACKEND ARCHITECTURE NOTES (Untuk Fase Laravel + MySQL Nanti)
 * ============================================================================
 * * 1. METHOD & ENDPOINT KUNCI:
 * - GET /api/debts
 * Mengambil semua data hutang & piutang aktif, riwayat cicilan, dan 
 * agregasi total (untuk summary card).
 * - POST /api/debts/{id}/pay
 * Endpoint untuk mencatat pembayaran cicilan atau pelunasan.
 * * 2. POTENSI TABEL DATABASE (MySQL):
 * - `debts`
 * (id, user_id, type [debt/receivable], name, total_amount, remaining_amount, 
 * monthly_installment, start_date, due_date, status)
 * - `debt_transactions`
 * (id, debt_id, amount_paid, payment_date, notes)
 * * 3. LOGIKA BACKEND (Laravel Controller):
 * - Kesehatan Finansial: (Total Cicilan Bulanan / Rata-rata Pemasukan Bulanan) * 100.
 * Jika > 30%, bisa kirim flag ke frontend untuk ubah warna bar jadi merah/kuning.
 * - Alert Jatuh Tempo: Dihitung selisih hari (datediff) antara `due_date` terdekat
 * dengan tanggal hari ini (now). Jika <= 7 hari, tampilkan di alert card.
 * ============================================================================
 */

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Simulasi UI_COLORS (Tema Dark/Glassmorphism KasBon)
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
};

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function DebtManagementScreen() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<'hutang' | 'piutang'>('hutang');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      {/* ── TOPBAR ── */}
      <View style={styles.topbar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={22} color={UI_COLORS.text} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Hutang & piutang</Text>
            <Text style={styles.headerSubtitle}>Pantau semua kewajiban & tagihan</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="time-outline" size={18} color={UI_COLORS.t2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="add" size={18} color={UI_COLORS.gold} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ── TABS ── */}
        <View style={styles.tabRow}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'hutang' ? styles.tabOnRed : styles.tabOff]}
            onPress={() => setActiveTab('hutang')}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-up-right-box" size={14} color={activeTab === 'hutang' ? UI_COLORS.bg : UI_COLORS.t3} />
            <Text style={[styles.tabText, { color: activeTab === 'hutang' ? UI_COLORS.bg : UI_COLORS.t3 }]}>Hutang saya</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'piutang' ? styles.tabOnGreen : styles.tabOff]}
            onPress={() => setActiveTab('piutang')}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-down-left-box" size={14} color={activeTab === 'piutang' ? UI_COLORS.bg : UI_COLORS.t3} />
            <Text style={[styles.tabText, { color: activeTab === 'piutang' ? UI_COLORS.bg : UI_COLORS.t3 }]}>Piutang saya</Text>
          </TouchableOpacity>
        </View>

        {/* ── SUMMARY CARD ── */}
        <View style={styles.summaryCard}>
          <View style={styles.scTop}>
            <View>
              <Text style={styles.scLbl}>Total hutang aktif</Text>
              <Text style={[styles.scVal, { color: UI_COLORS.red }]}>Rp 23.200.000</Text>
              <Text style={styles.scSub}>3 hutang aktif</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.scLbl}>Cicilan bulan ini</Text>
              <Text style={[styles.scVal, { color: UI_COLORS.red, fontSize: 18 }]}>Rp 2.300.000</Text>
              <Text style={[styles.scSub, { color: UI_COLORS.mint }]}>1 sudah dibayar</Text>
            </View>
          </View>

          <View style={styles.healthBar}>
            <View style={styles.hbLabels}>
              <Text style={{ color: UI_COLORS.t3, fontSize: 10 }}>Kesehatan finansial</Text>
              <Text style={{ color: UI_COLORS.gold, fontSize: 10 }}>Cicilan = 27% pendapatan</Text>
            </View>
            <View style={styles.hbTrack}>
              <View style={[styles.hbFill, { width: '27%', backgroundColor: UI_COLORS.gold }]} />
            </View>
          </View>

          <View style={styles.miniGrid}>
            <View style={styles.mgItem}>
              <Text style={styles.mgLbl}>Sudah lunas</Text>
              <Text style={[styles.mgVal, { color: UI_COLORS.mint }]}>63%</Text>
            </View>
            <View style={styles.mgItem}>
              <Text style={styles.mgLbl}>Sisa total</Text>
              <Text style={[styles.mgVal, { color: UI_COLORS.red }]}>Rp 23,2jt</Text>
            </View>
            <View style={styles.mgItem}>
              <Text style={styles.mgLbl}>Est. lunas</Text>
              <Text style={[styles.mgVal, { color: UI_COLORS.violet }]}>Okt 2026</Text>
            </View>
          </View>
        </View>

        {/* ── ALERT CARD ── */}
        <TouchableOpacity style={styles.alertCard} activeOpacity={0.8}>
          <View style={styles.acIcon}>
            <Ionicons name="notifications" size={16} color={UI_COLORS.gold} />
          </View>
          <View style={styles.acInfo}>
            <Text style={styles.acTitle}>Jatuh tempo dalam 3 hari</Text>
            <Text style={styles.acSub}>Cicilan motor Rp 800rb · 25 Juni 2025</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={UI_COLORS.t3} />
        </TouchableOpacity>

        {/* ── SECTION: HUTANG AKTIF ── */}
        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>Hutang aktif</Text>
          <TouchableOpacity><Text style={styles.secLink}>+ Tambah hutang</Text></TouchableOpacity>
        </View>

        {/* HUTANG CARD 1 (Cicilan Motor) */}
        <TouchableOpacity style={styles.debtCard} activeOpacity={0.8}>
          <View style={styles.dcTop}>
            <View style={[styles.dcIcon, { backgroundColor: hexToRgba(UI_COLORS.red, 0.12) }]}>
              <Ionicons name="bicycle" size={20} color={UI_COLORS.red} />
            </View>
            <View style={styles.dcInfo}>
              <Text style={styles.dcName}>Cicilan motor Honda Beat</Text>
              <View style={styles.dcMeta}>
                <Text style={styles.dcType}>FIF · kredit kendaraan</Text>
                <View style={styles.dcDot} />
                <Text style={[styles.dcDue, { color: UI_COLORS.gold }]}>jatuh tempo 25 Jun</Text>
                <View style={[styles.badge, styles.badgeWarn]}><Text style={styles.badgeWarnTxt}>3 hari lagi</Text></View>
              </View>
            </View>
            <View style={styles.dcRight}>
              <Text style={styles.dcTotal}>Rp 8.200.000</Text>
              <Text style={styles.dcCicilan}>Rp 800rb/bln</Text>
            </View>
          </View>
          <View style={styles.progWrap}>
            <View style={styles.progLbl}>
              <Text style={{ color: UI_COLORS.t3, fontSize: 10 }}>Terlunasi 63% — 14 bulan lagi</Text>
              <Text style={{ color: UI_COLORS.gold, fontSize: 10 }}>Rp 14jt dari Rp 22,2jt</Text>
            </View>
            <View style={styles.progTrack}>
              <View style={[styles.progFill, { width: '63%', backgroundColor: UI_COLORS.gold }]} />
            </View>
          </View>
          <View style={styles.dcFooter}>
            <View style={styles.dcfItem}>
              <Text style={styles.dcfLbl}>Mulai</Text>
              <Text style={styles.dcfVal}>Agt 2024</Text>
            </View>
            <View style={styles.dcfItem}>
              <Text style={styles.dcfLbl}>Lunas</Text>
              <Text style={[styles.dcfVal, { color: UI_COLORS.violet }]}>Okt 2026</Text>
            </View>
            <View style={styles.dcfItem}>
              <Text style={styles.dcfLbl}>Tenor</Text>
              <Text style={styles.dcfVal}>24 bln</Text>
            </View>
          </View>
          <View style={[styles.dueStrip, styles.dueStripWarn]}>
            <Ionicons name="time-outline" size={14} color={UI_COLORS.gold} />
            <Text style={{ fontSize: 11, color: UI_COLORS.gold }}>Belum dibayar bulan ini — jatuh tempo 25 Jun</Text>
          </View>
        </TouchableOpacity>

        {/* HUTANG CARD 2 (KPR) */}
        <TouchableOpacity style={styles.debtCard} activeOpacity={0.8}>
          <View style={styles.dcTop}>
            <View style={[styles.dcIcon, { backgroundColor: hexToRgba(UI_COLORS.violet, 0.12) }]}>
              <Ionicons name="home" size={20} color={UI_COLORS.violet} />
            </View>
            <View style={styles.dcInfo}>
              <Text style={styles.dcName}>KPR rumah BTN</Text>
              <View style={styles.dcMeta}>
                <Text style={styles.dcType}>BTN · kredit kepemilikan</Text>
                <View style={styles.dcDot} />
                <Text style={styles.dcDue}>jatuh tempo 1 Jul</Text>
                <View style={[styles.badge, styles.badgeAktif]}><Text style={styles.badgeAktifTxt}>20 hari lagi</Text></View>
              </View>
            </View>
            <View style={styles.dcRight}>
              <Text style={[styles.dcTotal, { color: UI_COLORS.text }]}>Rp 14.200.000</Text>
              <Text style={styles.dcCicilan}>Rp 1.350rb/bln</Text>
            </View>
          </View>
          <View style={styles.progWrap}>
            <View style={styles.progLbl}>
              <Text style={{ color: UI_COLORS.t3, fontSize: 10 }}>Terlunasi 18% — 196 bulan lagi</Text>
              <Text style={{ color: UI_COLORS.violet, fontSize: 10 }}>Rp 36,4jt dari Rp 200jt</Text>
            </View>
            <View style={styles.progTrack}>
              <View style={[styles.progFill, { width: '18%', backgroundColor: UI_COLORS.violet }]} />
            </View>
          </View>
          <View style={styles.dcFooter}>
            <View style={styles.dcfItem}>
              <Text style={styles.dcfLbl}>Mulai</Text>
              <Text style={styles.dcfVal}>Jan 2023</Text>
            </View>
            <View style={styles.dcfItem}>
              <Text style={styles.dcfLbl}>Lunas</Text>
              <Text style={[styles.dcfVal, { color: UI_COLORS.violet }]}>Jan 2040</Text>
            </View>
            <View style={styles.dcfItem}>
              <Text style={styles.dcfLbl}>Tenor</Text>
              <Text style={styles.dcfVal}>240 bln</Text>
            </View>
          </View>
          <View style={[styles.dueStrip, styles.dueStripGreen]}>
            <Ionicons name="checkmark-circle" size={14} color={UI_COLORS.mint} />
            <Text style={{ fontSize: 11, color: UI_COLORS.mint }}>Cicilan Juni sudah dibayar — Rp 1.350.000</Text>
          </View>
        </TouchableOpacity>

        {/* HUTANG CARD 3 (Personal) */}
        <TouchableOpacity style={styles.debtCard} activeOpacity={0.8}>
          <View style={styles.dcTop}>
            <View style={[styles.dcIcon, { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) }]}>
              <Ionicons name="person" size={20} color={UI_COLORS.red} />
            </View>
            <View style={styles.dcInfo}>
              <Text style={styles.dcName}>Pinjam ke Pak Budi</Text>
              <View style={styles.dcMeta}>
                <Text style={styles.dcType}>Pinjaman personal · tanpa bunga</Text>
                <View style={styles.dcDot} />
                <Text style={styles.dcDue}>target lunas Jul</Text>
              </View>
            </View>
            <View style={styles.dcRight}>
              <Text style={[styles.dcTotal, { color: UI_COLORS.text }]}>Rp 800.000</Text>
              <Text style={styles.dcCicilan}>fleksibel</Text>
            </View>
          </View>
          <View style={styles.progWrap}>
            <View style={styles.progLbl}>
              <Text style={{ color: UI_COLORS.t3, fontSize: 10 }}>Terlunasi 60%</Text>
              <Text style={{ color: UI_COLORS.mint, fontSize: 10 }}>Rp 1,2jt dari Rp 2jt</Text>
            </View>
            <View style={styles.progTrack}>
              <View style={[styles.progFill, { width: '60%', backgroundColor: UI_COLORS.mint }]} />
            </View>
          </View>
          <View style={styles.dcFooter}>
            <View style={styles.dcfItem}>
              <Text style={styles.dcfLbl}>Total pinjam</Text>
              <Text style={styles.dcfVal}>Rp 2.000.000</Text>
            </View>
            <View style={styles.dcfItem}>
              <Text style={styles.dcfLbl}>Sudah bayar</Text>
              <Text style={[styles.dcfVal, { color: UI_COLORS.mint }]}>Rp 1.200.000</Text>
            </View>
            <View style={styles.dcfItem}>
              <Text style={styles.dcfLbl}>Sisa</Text>
              <Text style={[styles.dcfVal, { color: UI_COLORS.red }]}>Rp 800.000</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* ── TOMBOL BAYAR CICILAN ── */}
        <TouchableOpacity style={styles.payBtn} activeOpacity={0.8}>
          <Ionicons name="card" size={18} color={UI_COLORS.red} />
          <Text style={styles.payBtnText}>Catat pembayaran cicilan</Text>
        </TouchableOpacity>

        {/* ── SECTION: PIUTANG SAYA ── */}
        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>Piutang saya</Text>
          <TouchableOpacity><Text style={styles.secLink}>+ Tambah piutang</Text></TouchableOpacity>
        </View>

        {/* PIUTANG CARD */}
        <TouchableOpacity style={styles.piutangCard} activeOpacity={0.8}>
          <View style={styles.pcTop}>
            <View style={styles.pcIcon}>
              <Ionicons name="person" size={20} color={UI_COLORS.mint} />
            </View>
            <View style={styles.pcInfo}>
              <Text style={styles.pcName}>Pinjaman ke Doni</Text>
              <Text style={styles.pcMeta}>Dipinjam 1 Mei · target balik Jul 2025</Text>
            </View>
            <View style={styles.pcRight}>
              <Text style={styles.pcTotal}>Rp 500.000</Text>
              <Text style={styles.pcEta}>belum dikembalikan</Text>
            </View>
          </View>
          <View style={styles.pcFooter}>
            <Ionicons name="notifications" size={15} color={UI_COLORS.mint} />
            <Text style={styles.pcRemind}>Kirim reminder ke Doni</Text>
            <Ionicons name="send" size={14} color={UI_COLORS.mint} />
          </View>
        </TouchableOpacity>

        {/* ── TOMBOL TAMBAH PIUTANG ── */}
        <TouchableOpacity style={[styles.addBtn, styles.addBtnGreen]} activeOpacity={0.8}>
          <Ionicons name="add" size={18} color={UI_COLORS.mint} />
          <Text style={[styles.addBtnText, { color: UI_COLORS.mint }]}>Catat piutang baru</Text>
        </TouchableOpacity>

        {/* ── PENGAMAN BOTTOM NAV ── */}
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
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.text, 0.14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: UI_COLORS.text,
  },
  headerSubtitle: {
    fontSize: 11,
    color: UI_COLORS.t3,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.text, 0.14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 0,
  },
  
  // TABS
  tabRow: {
    flexDirection: 'row',
    backgroundColor: UI_COLORS.card2,
    borderRadius: 13,
    padding: 3,
    marginHorizontal: 18,
    marginBottom: 12,
    marginTop: 4,
  },
  tab: {
    flex: 1,
    height: 32,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  tabOnRed: { backgroundColor: UI_COLORS.red },
  tabOnGreen: { backgroundColor: UI_COLORS.mint },
  tabOff: { backgroundColor: 'transparent' },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
  },

  // SUMMARY CARD
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: UI_COLORS.card2,
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.text, 0.14),
    borderRadius: 18,
    padding: 14,
  },
  scTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  scLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 3 },
  scVal: { fontSize: 24, fontWeight: '600' },
  scSub: { fontSize: 11, marginTop: 2, color: UI_COLORS.t3 },
  
  healthBar: { marginBottom: 0, marginTop: 4 },
  hbLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  hbTrack: { height: 6, backgroundColor: hexToRgba(UI_COLORS.text, 0.07), borderRadius: 3, overflow: 'hidden' },
  hbFill: { height: 6, borderRadius: 3 },
  
  miniGrid: { flexDirection: 'row', gap: 8, marginTop: 14 },
  mgItem: {
    flex: 1,
    backgroundColor: hexToRgba(UI_COLORS.text, 0.04),
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.text, 0.07),
  },
  mgLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 2 },
  mgVal: { fontSize: 12, fontWeight: '500' },

  // ALERT CARD
  alertCard: {
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: hexToRgba(UI_COLORS.gold, 0.08),
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.gold, 0.25),
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  acIcon: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: hexToRgba(UI_COLORS.gold, 0.12),
    alignItems: 'center', justifyContent: 'center',
  },
  acInfo: { flex: 1 },
  acTitle: { fontSize: 12, fontWeight: '500', color: UI_COLORS.gold, marginBottom: 2 },
  acSub: { fontSize: 11, color: hexToRgba(UI_COLORS.gold, 0.7) },

  // SECTION HEADER
  secHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 8,
  },
  secLbl: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.4, textTransform: 'uppercase', fontWeight: '600' },
  secLink: { fontSize: 11, color: UI_COLORS.violet, fontWeight: '500' },

  // DEBT CARD
  debtCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.text, 0.14),
    borderRadius: 16,
    overflow: 'hidden',
  },
  dcTop: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 13, paddingTop: 13, paddingBottom: 10 },
  dcIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  dcInfo: { flex: 1 },
  dcName: { fontSize: 14, fontWeight: '500', color: UI_COLORS.text, marginBottom: 4 },
  dcMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  dcType: { fontSize: 10, color: UI_COLORS.t3 },
  dcDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: UI_COLORS.t3 },
  dcDue: { fontSize: 10, color: UI_COLORS.t3 },
  
  badge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20 },
  badgeWarn: { backgroundColor: hexToRgba(UI_COLORS.gold, 0.1) },
  badgeWarnTxt: { fontSize: 9, fontWeight: '500', color: UI_COLORS.gold },
  badgeAktif: { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) },
  badgeAktifTxt: { fontSize: 9, fontWeight: '500', color: '#FF9090' },
  
  dcRight: { alignItems: 'flex-end' },
  dcTotal: { fontSize: 14, fontWeight: '600', color: UI_COLORS.red },
  dcCicilan: { fontSize: 10, color: UI_COLORS.t3, marginTop: 2 },

  progWrap: { paddingHorizontal: 13, paddingBottom: 12 },
  progLbl: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progTrack: { height: 5, backgroundColor: hexToRgba(UI_COLORS.text, 0.07), borderRadius: 3, overflow: 'hidden' },
  progFill: { height: 5, borderRadius: 3 },
  
  dcFooter: { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: hexToRgba(UI_COLORS.text, 0.07) },
  dcfItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRightWidth: 0.5, borderRightColor: hexToRgba(UI_COLORS.text, 0.07) },
  dcfLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 2 },
  dcfVal: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text },

  dueStrip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 13, paddingVertical: 8, borderTopWidth: 0.5 },
  dueStripWarn: { backgroundColor: hexToRgba(UI_COLORS.gold, 0.06), borderTopColor: hexToRgba(UI_COLORS.gold, 0.15) },
  dueStripGreen: { backgroundColor: hexToRgba(UI_COLORS.mint, 0.04), borderTopColor: hexToRgba(UI_COLORS.mint, 0.15) },

  // PIUTANG CARD
  piutangCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.mint, 0.2),
    borderRadius: 16,
    overflow: 'hidden',
  },
  pcTop: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 13, paddingTop: 13, paddingBottom: 10 },
  pcIcon: { width: 40, height: 40, borderRadius: 14, backgroundColor: hexToRgba(UI_COLORS.mint, 0.1), alignItems: 'center', justifyContent: 'center' },
  pcInfo: { flex: 1 },
  pcName: { fontSize: 14, fontWeight: '500', color: UI_COLORS.text, marginBottom: 2 },
  pcMeta: { fontSize: 11, color: UI_COLORS.t3 },
  pcRight: { alignItems: 'flex-end' },
  pcTotal: { fontSize: 14, fontWeight: '600', color: UI_COLORS.mint },
  pcEta: { fontSize: 10, color: UI_COLORS.t3, marginTop: 2 },
  
  pcFooter: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 13, paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: hexToRgba(UI_COLORS.text, 0.07), backgroundColor: hexToRgba(UI_COLORS.mint, 0.04) },
  pcRemind: { fontSize: 11, color: UI_COLORS.mint, flex: 1, fontWeight: '500' },

  // BUTTONS
  payBtn: {
    marginHorizontal: 16,
    marginBottom: 16,
    height: 48,
    borderRadius: 14,
    backgroundColor: hexToRgba(UI_COLORS.red, 0.1),
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.red, 0.25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  payBtnText: { fontSize: 14, fontWeight: '500', color: '#FF9090' },

  addBtn: {
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: UI_COLORS.card,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: hexToRgba(UI_COLORS.red, 0.2),
    borderRadius: 16,
    padding: 13,
  },
  addBtnGreen: { borderColor: hexToRgba(UI_COLORS.mint, 0.2) },
  addBtnText: { fontSize: 13, fontWeight: '500', color: '#FF9090' },
});
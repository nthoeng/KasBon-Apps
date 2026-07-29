/**
 * ============================================================================
 * ⚓ BACKEND ARCHITECTURE NOTES (Untuk Fase Laravel + MySQL Nanti)
 * ============================================================================
 * * 1. METHOD & ENDPOINT KUNCI:
 * - GET /api/projects/{id}/cashflow?period=month
 * Mengambil ringkasan laba bersih, margin, statistik arus kas mingguan,
 * serta daftar transaksi project yang dikelompokkan per tanggal.
 * - POST /api/projects/{id}/transactions
 * Dipanggil saat klik "Catat pemasukan" atau "Catat biaya" untuk project ini.
 * * 2. POTENSI TABEL DATABASE (MySQL):
 * - `projects`
 * (id, user_id, client_name, project_name, contract_value, deadline, status)
 * - `project_transactions`
 * (id, project_id, type [income/expense], category, title, amount, 
 * transaction_date, is_pending, notes)
 * * 3. LOGIKA BACKEND (Laravel Controller):
 * - Laba Bersih = SUM(income where is_pending = 0) - SUM(expense).
 * - Margin = (Laba Bersih / Total Pemasukan) * 100.
 * - Kalkulasi Grafik Mingguan: Agregasi SUM(amount) di-group berdasarkan
 * WEEK(transaction_date) dalam bulan berjalan.
 * ============================================================================
 */

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  b1: 'rgba(255,255,255,0.07)',
  b2: 'rgba(255,255,255,0.14)',
};

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function ProjectCashflowScreen() {
  const navigation = useNavigation<any>();
  const [activePeriod, setActivePeriod] = useState<'minggu' | 'bulan' | 'semua' | 'custom'>('bulan');
  const [activeFilter, setActiveFilter] = useState<'semua' | 'pemasukan' | 'biaya' | 'klien'>('semua');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      {/* ── TOPBAR DENGAN TOMBOL BACK ── */}
      <View style={styles.topbar}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigation.goBack()} 
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color={UI_COLORS.t2} />
        </TouchableOpacity>

        <Text style={styles.topbarTitle}>Cashflow project</Text>

        <View style={styles.topbarRight}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="download-outline" size={18} color={UI_COLORS.t2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="options-outline" size={18} color={UI_COLORS.t2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ── PROJECT HEADER ── */}
        <View style={styles.projectHeader}>
          <View style={styles.phIcon}>
            <Ionicons name="code-slash" size={20} color={UI_COLORS.mint} />
          </View>
          <View style={styles.phInfo}>
            <Text style={styles.phName}>Web Company Profile</Text>
            <Text style={styles.phMeta}>PT Maju Jaya · deadline 30 Jun 2025</Text>
          </View>
          <View style={styles.phSaldo}>
            <Text style={styles.phAmt}>Rp 2.900.000</Text>
            <Text style={styles.phLbl}>laba bersih</Text>
          </View>
        </View>

        {/* ── PERIOD TABS ── */}
        <View style={styles.periodTabs}>
          {(['minggu', 'bulan', 'semua', 'custom'] as const).map((tab) => {
            const labels = { minggu: 'Minggu ini', bulan: 'Bulan ini', semua: 'Semua waktu', custom: 'Custom' };
            const isOn = activePeriod === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.pt, isOn ? styles.ptOn : styles.ptOff]}
                onPress={() => setActivePeriod(tab)}
                activeOpacity={0.8}
              >
                <Text style={[styles.ptText, { color: isOn ? UI_COLORS.bg : UI_COLORS.t3 }]}>
                  {labels[tab]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── SUMMARY CARD ── */}
        <View style={styles.summaryCard}>
          <View style={styles.scTop}>
            <View>
              <Text style={styles.scLbl}>Total pemasukan</Text>
              <Text style={[styles.scVal, { color: UI_COLORS.mint }]}>Rp 3.750.000</Text>
              <Text style={styles.scSub}>1 invoice terbayar</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.scLbl}>Total pengeluaran</Text>
              <Text style={[styles.scVal, { color: UI_COLORS.red }]}>Rp 850.000</Text>
              <Text style={styles.scSub}>3 transaksi biaya</Text>
            </View>
          </View>

          {/* Ratio Bar */}
          <View style={styles.ratioBarTrack}>
            <View style={{ flexDirection: 'row', height: 5 }}>
              <View style={{ width: '81%', backgroundColor: UI_COLORS.mint, borderTopLeftRadius: 3, borderBottomLeftRadius: 3 }} />
              <View style={{ width: '19%', backgroundColor: UI_COLORS.red, borderTopRightRadius: 3, borderBottomRightRadius: 3 }} />
            </View>
          </View>

          <View style={styles.scMini}>
            <View style={styles.scm}>
              <Text style={styles.scmLbl}>Laba bersih</Text>
              <Text style={[styles.scmVal, { color: UI_COLORS.gold }]}>Rp 2,9jt</Text>
            </View>
            <View style={styles.scm}>
              <Text style={styles.scmLbl}>Margin</Text>
              <Text style={[styles.scmVal, { color: UI_COLORS.gold }]}>77,3%</Text>
            </View>
            <View style={styles.scm}>
              <Text style={styles.scmLbl}>Tx count</Text>
              <Text style={[styles.scmVal, { color: UI_COLORS.violet }]}>4 tx</Text>
            </View>
          </View>
        </View>

        {/* ── CHART AREA (MINGGUAN) ── */}
        <View style={styles.chartArea}>
          <View style={styles.caHeader}>
            <Text style={styles.caTitle}>Pemasukan vs biaya per minggu</Text>
            <View style={styles.legend}>
              <View style={styles.leg}>
                <View style={[styles.legDot, { backgroundColor: UI_COLORS.mint }]} />
                <Text style={styles.legText}>Masuk</Text>
              </View>
              <View style={styles.leg}>
                <View style={[styles.legDot, { backgroundColor: UI_COLORS.red }]} />
                <Text style={styles.legText}>Biaya</Text>
              </View>
            </View>
          </View>

          <View style={styles.weekBars}>
            <View style={styles.wbGrp}>
              <View style={[styles.wb, { height: 54, backgroundColor: hexToRgba(UI_COLORS.mint, 0.7) }]} />
              <View style={[styles.wb, { height: 14, backgroundColor: hexToRgba(UI_COLORS.red, 0.6) }]} />
            </View>
            <View style={styles.wbGrp}>
              <View style={[styles.wb, { height: 2, backgroundColor: hexToRgba(UI_COLORS.mint, 0.4) }]} />
              <View style={[styles.wb, { height: 8, backgroundColor: hexToRgba(UI_COLORS.red, 0.5) }]} />
            </View>
            <View style={styles.wbGrp}>
              <View style={[styles.wb, { height: 2, backgroundColor: hexToRgba(UI_COLORS.mint, 0.4) }]} />
              <View style={[styles.wb, { height: 18, backgroundColor: hexToRgba(UI_COLORS.red, 0.6) }]} />
            </View>
            <View style={[styles.wbGrp, styles.wbGrpNow]}>
              <View style={[styles.wb, { height: 2, backgroundColor: hexToRgba(UI_COLORS.mint, 0.4) }]} />
              <View style={[styles.wb, { height: 12, backgroundColor: UI_COLORS.red }]} />
            </View>
          </View>

          <View style={styles.wbLbl}>
            <Text style={styles.wbl}>Mgg 1</Text>
            <Text style={styles.wbl}>Mgg 2</Text>
            <Text style={styles.wbl}>Mgg 3</Text>
            <Text style={[styles.wbl, { color: UI_COLORS.gold }]}>Mgg 4</Text>
          </View>
        </View>

        {/* ── FILTER CHIPS ── */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filterRow}
        >
          {(['semua', 'pemasukan', 'biaya', 'klien'] as const).map((f) => {
            const labels = { semua: 'Semua', pemasukan: 'Pemasukan', biaya: 'Biaya operasional', klien: 'Pembayaran client' };
            const isOn = activeFilter === f;
            return (
              <TouchableOpacity
                key={f}
                style={[styles.fc, isOn ? styles.fcOn : styles.fcOff]}
                onPress={() => setActiveFilter(f)}
                activeOpacity={0.8}
              >
                <Text style={[styles.fcText, { color: isOn ? UI_COLORS.bg : UI_COLORS.t2 }]}>
                  {labels[f]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── TRANSACTIONS: 11 JUNI 2025 ── */}
        <View style={styles.dayLbl}>
          <Text style={styles.dlTxt}>11 Juni 2025</Text>
          <View style={styles.dlLine} />
          <Text style={[styles.dlNet, { color: UI_COLORS.red }]}>-Rp 400rb</Text>
        </View>
        <View style={styles.txGroup}>
          <TouchableOpacity style={styles.txItem} activeOpacity={0.8}>
            <View style={[styles.txIcon, { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) }]}>
              <Ionicons name="extension-puzzle-outline" size={17} color={UI_COLORS.red} />
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txName} numberOfLines={1}>Plugin premium Elementor</Text>
              <Text style={styles.txMeta}>Biaya operasional</Text>
              <View style={[styles.tag, styles.tagOp]}><Text style={styles.tagOpTxt}>Biaya</Text></View>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmt, { color: UI_COLORS.red }]}>-Rp 400.000</Text>
              <Text style={styles.txTime}>15:30</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── TRANSACTIONS: 5 JUNI 2025 ── */}
        <View style={styles.dayLbl}>
          <Text style={styles.dlTxt}>5 Juni 2025</Text>
          <View style={styles.dlLine} />
          <Text style={[styles.dlNet, { color: UI_COLORS.mint }]}>+Rp 3,3jt</Text>
        </View>
        <View style={styles.txGroup}>
          <TouchableOpacity style={[styles.txItem, styles.borderBottom]} activeOpacity={0.8}>
            <View style={[styles.txIcon, { backgroundColor: hexToRgba(UI_COLORS.mint, 0.1) }]}>
              <Ionicons name="cash-outline" size={17} color={UI_COLORS.mint} />
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txName} numberOfLines={1}>DP 50% dari PT Maju Jaya</Text>
              <Text style={styles.txMeta}>Pembayaran client</Text>
              <View style={[styles.tag, styles.tagDp]}><Text style={styles.tagDpTxt}>DP 50%</Text></View>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmt, { color: UI_COLORS.mint }]}>+Rp 3.750.000</Text>
              <Text style={styles.txTime}>10:15</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.txItem} activeOpacity={0.8}>
            <View style={[styles.txIcon, { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) }]}>
              <Ionicons name="globe-outline" size={17} color={UI_COLORS.red} />
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txName} numberOfLines={1}>Beli domain + hosting 1 tahun</Text>
              <Text style={styles.txMeta}>Biaya operasional</Text>
              <View style={[styles.tag, styles.tagOp]}><Text style={styles.tagOpTxt}>Biaya</Text></View>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmt, { color: UI_COLORS.red }]}>-Rp 450.000</Text>
              <Text style={styles.txTime}>11:00</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── TRANSACTIONS: 3 JUNI 2025 ── */}
        <View style={styles.dayLbl}>
          <Text style={styles.dlTxt}>3 Juni 2025</Text>
          <View style={styles.dlLine} />
          <Text style={[styles.dlNet, { color: UI_COLORS.red }]}>-Rp 450rb</Text>
        </View>
        <View style={styles.txGroup}>
          <TouchableOpacity style={styles.txItem} activeOpacity={0.8}>
            <View style={[styles.txIcon, { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) }]}>
              <Ionicons name="laptop-outline" size={17} color={UI_COLORS.red} />
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txName} numberOfLines={1}>Langganan Figma 1 bulan</Text>
              <Text style={styles.txMeta}>Biaya operasional · alat kerja</Text>
              <View style={[styles.tag, styles.tagOp]}><Text style={styles.tagOpTxt}>Biaya</Text></View>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmt, { color: UI_COLORS.red }]}>-Rp 180.000</Text>
              <Text style={styles.txTime}>09:00</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── INVOICE PENDING CARD ── */}
        <View style={styles.invoicePending}>
          <View style={styles.ipHeader}>
            <Ionicons name="receipt-outline" size={16} color={UI_COLORS.mint} />
            <Text style={styles.ipHeaderTxt}>Invoice pending — belum terbayar</Text>
          </View>
          <View style={styles.ipBody}>
            <View>
              <Text style={styles.ipTitle}>Pelunasan 50% PT Maju Jaya</Text>
              <Text style={styles.ipSub}>Estimasi saat serah terima · 30 Jun 2025</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.ipAmt}>Rp 3.750.000</Text>
              <Text style={styles.ipStatus}>belum diterima</Text>
            </View>
          </View>
        </View>

        {/* ── FAB ROW (AKSI KAS) ── */}
        <View style={styles.fabRow}>
          <TouchableOpacity style={[styles.fabBtn, styles.fabIn]} activeOpacity={0.8}>
            <Ionicons name="arrow-down-left-box" size={18} color={UI_COLORS.bg} />
            <Text style={styles.fabInTxt}>Catat pemasukan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.fabBtn, styles.fabOp]} activeOpacity={0.8}>
            <Ionicons name="arrow-up-right-box" size={18} color={UI_COLORS.red} />
            <Text style={styles.fabOpTxt}>Catat biaya</Text>
          </TouchableOpacity>
        </View>

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
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: UI_COLORS.b2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topbarTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: UI_COLORS.text,
  },
  topbarRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: UI_COLORS.b2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 0,
  },

  // PROJECT HEADER
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  phIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: hexToRgba(UI_COLORS.mint, 0.12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  phInfo: { flex: 1 },
  phName: {
    fontSize: 14,
    fontWeight: '500',
    color: UI_COLORS.text,
    marginBottom: 2,
  },
  phMeta: { fontSize: 11, color: UI_COLORS.t3 },
  phSaldo: { alignItems: 'flex-end' },
  phAmt: { fontSize: 16, fontWeight: '600', color: UI_COLORS.mint },
  phLbl: { fontSize: 10, color: UI_COLORS.t3, marginTop: 1 },

  // PERIOD TABS
  periodTabs: {
    flexDirection: 'row',
    backgroundColor: UI_COLORS.card2,
    borderRadius: 12,
    padding: 3,
    marginHorizontal: 18,
    marginBottom: 12,
  },
  pt: {
    flex: 1,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ptOn: { backgroundColor: UI_COLORS.mint },
  ptOff: { backgroundColor: 'transparent' },
  ptText: { fontSize: 11, fontWeight: '500' },

  // SUMMARY CARD
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: UI_COLORS.card2,
    borderWidth: 0.5,
    borderColor: UI_COLORS.b2,
    borderRadius: 16,
    padding: 14,
  },
  scTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  scLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 3 },
  scVal: { fontSize: 20, fontWeight: '600' },
  scSub: { fontSize: 11, marginTop: 2, color: UI_COLORS.t3 },
  ratioBarTrack: {
    height: 5,
    backgroundColor: hexToRgba(UI_COLORS.text, 0.06),
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  scMini: {
    flexDirection: 'row',
    gap: 8,
  },
  scm: {
    flex: 1,
    backgroundColor: hexToRgba(UI_COLORS.text, 0.04),
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: UI_COLORS.b1,
  },
  scmLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 2 },
  scmVal: { fontSize: 12, fontWeight: '500' },

  // CHART AREA
  chartArea: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: UI_COLORS.b2,
    borderRadius: 14,
    padding: 14,
  },
  caHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  caTitle: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text },
  legend: { flexDirection: 'row', gap: 10 },
  leg: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legDot: { width: 7, height: 7, borderRadius: 3.5 },
  legText: { fontSize: 10, color: UI_COLORS.t2 },
  weekBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    height: 60,
    marginBottom: 8,
  },
  wbGrp: {
    flex: 1,
    flexDirection: 'row',
    gap: 3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  wbGrpNow: {
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.gold, 0.3),
    borderRadius: 4,
    padding: 2,
  },
  wb: {
    flex: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    minHeight: 2,
  },
  wbLbl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wbl: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    color: UI_COLORS.t3,
  },

  // FILTER CHIPS
  filterRow: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 10,
  },
  fc: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  fcOn: { backgroundColor: UI_COLORS.mint },
  fcOff: {
    backgroundColor: UI_COLORS.card,
    borderWidth: 0.5,
    borderColor: UI_COLORS.b2,
  },
  fcText: { fontSize: 11, fontWeight: '500' },

  // DAY LABEL & TRANSACTIONS
  dayLbl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  dlTxt: {
    fontSize: 11,
    color: UI_COLORS.t3,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  dlLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: UI_COLORS.b1,
  },
  dlNet: { fontSize: 11, fontWeight: '500' },
  txGroup: {
    backgroundColor: UI_COLORS.card,
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 8,
  },
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    padding: 12,
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: UI_COLORS.b1,
  },
  txIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txInfo: { flex: 1 },
  txName: {
    fontSize: 13,
    fontWeight: '500',
    color: UI_COLORS.text,
  },
  txMeta: {
    fontSize: 11,
    color: UI_COLORS.t3,
    marginTop: 1,
  },
  txRight: { alignItems: 'flex-end' },
  txAmt: { fontSize: 13, fontWeight: '600' },
  txTime: {
    fontSize: 10,
    color: UI_COLORS.t3,
    marginTop: 1,
  },

  // TAGS
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  tagOp: { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) },
  tagOpTxt: { fontSize: 9, fontWeight: '500', color: '#FF9090' },
  tagDp: { backgroundColor: hexToRgba(UI_COLORS.gold, 0.1) },
  tagDpTxt: { fontSize: 9, fontWeight: '500', color: UI_COLORS.gold },

  // INVOICE PENDING
  invoicePending: {
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 14,
    backgroundColor: hexToRgba(UI_COLORS.mint, 0.06),
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.mint, 0.2),
    borderRadius: 14,
    padding: 13,
  },
  ipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  ipHeaderTxt: { fontSize: 12, fontWeight: '500', color: UI_COLORS.mint },
  ipBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ipTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: UI_COLORS.text,
  },
  ipSub: {
    fontSize: 11,
    color: UI_COLORS.t3,
    marginTop: 2,
  },
  ipAmt: {
    fontSize: 14,
    fontWeight: '600',
    color: UI_COLORS.gold,
  },
  ipStatus: {
    fontSize: 10,
    color: UI_COLORS.t3,
    marginTop: 1,
  },

  // FAB ROW
  fabRow: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 4,
  },
  fabBtn: {
    flex: 1,
    height: 44,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  fabIn: { backgroundColor: UI_COLORS.mint },
  fabInTxt: { fontSize: 12, fontWeight: '600', color: UI_COLORS.bg },
  fabOp: {
    backgroundColor: hexToRgba(UI_COLORS.red, 0.1),
    borderWidth: 0.5,
    borderColor: hexToRgba(UI_COLORS.red, 0.25),
  },
  fabOpTxt: { fontSize: 12, fontWeight: '600', color: '#FF9090' },
});
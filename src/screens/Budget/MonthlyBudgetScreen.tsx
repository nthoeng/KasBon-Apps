/**
 * ============================================================================
 * ⚓ BACKEND ARCHITECTURE NOTES (Fase Laravel + MySQL)
 * ============================================================================
 * - Method & Endpoint: GET /api/budgets/monthly?month=6&year=2026
 * - Data yang dikirim dari Backend harus sudah dihitung (termasuk total 
 * terpakai per kategori).
 * - Algoritma 'Hampir Habis': Jika (spent/budget)*100 >= 85%, maka flag 
 * isWarning = true dari backend agar frontend tinggal render UI strip.
 * ============================================================================
 */

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg'; // SVG Donut Chart

// ─── TEMA UTAMA KASBON ────────────────────────────────────────────────────────
const COLORS = {
  bg: '#0A1628', sf: '#111F35', sf2: '#152338', bd: '#1E3050',
  gold: '#F5C842', mint: '#2DD4A4', coral: '#FF6B6B', violet: '#7C6FF7',
  t1: '#E8EDF5', t2: '#8AA0BE', t3: '#5A7890'
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// ─── TYPES & DATA DINAMIS (Dari V1) ──────────────────────────────────────────
type BudgetCategory = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  budget: number;
  spent: number;
  isRecurring: boolean;
};

const BUDGET_CATEGORIES: BudgetCategory[] = [
  { id: 'belanja', name: 'Belanja', icon: 'cart', color: COLORS.coral, budget: 500000, spent: 480000, isRecurring: false },
  { id: 'makan', name: 'Makan & minum', icon: 'fast-food', color: COLORS.gold, budget: 1500000, spent: 1170000, isRecurring: false },
  { id: 'tagihan', name: 'Tagihan & utilitas', icon: 'flash', color: COLORS.violet, budget: 1000000, spent: 785000, isRecurring: false },
  { id: 'transport', name: 'Transportasi', icon: 'car', color: COLORS.mint, budget: 500000, spent: 204000, isRecurring: false },
  { id: 'kesehatan', name: 'Kesehatan', icon: 'fitness', color: COLORS.mint, budget: 800000, spent: 296000, isRecurring: false },
  { id: 'hiburan', name: 'Hiburan', icon: 'game-controller', color: COLORS.gold, budget: 500000, spent: 330000, isRecurring: false },
  { id: 'cicilan', name: 'Cicilan motor', icon: 'bicycle', color: COLORS.coral, budget: 800000, spent: 800000, isRecurring: true },
];

const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n: number): string => {
  if (n >= 1000000) {
    const v = n / 1000000;
    return `Rp ${v % 1 === 0 ? v : v.toFixed(1)}jt`;
  }
  if (n >= 1000) return `Rp ${Math.round(n / 1000)}rb`;
  return `Rp ${n.toLocaleString('id-ID')}`;
};

// ─── KOMPONEN: DONUT CHART SVG (Dari V1) ─────────────────────────────────────
const DonutChart = ({ pct, color = COLORS.gold }: { pct: number; color?: string }) => {
  const R = 26, SW = 8, circ = 2 * Math.PI * R;
  const filled = (Math.min(pct, 100) / 100) * circ;
  return (
    <View style={{ width: 64, height: 64 }}>
      <Svg width={64} height={64} viewBox="0 0 64 64">
        <Circle cx="32" cy="32" r={R} fill="none" stroke={hexToRgba(COLORS.t1, 0.07)} strokeWidth={SW} />
        <Circle cx="32" cy="32" r={R} fill="none" stroke={color} strokeWidth={SW}
          strokeDasharray={`${filled} ${circ}`} strokeDashoffset={circ * 0.25} strokeLinecap="round" />
      </Svg>
      <View style={styles.donutCenter} pointerEvents="none">
        <Text style={[styles.donutPct, { color }]}>{pct}%</Text>
        <Text style={styles.donutSub}>terpakai</Text>
      </View>
    </View>
  );
};

// ─── SCREEN UTAMA (Layout V2) ────────────────────────────────────────────────
export const MonthlyBudgetScreen = () => {
  const navigation = useNavigation<any>();
  const [monthIdx, setMonthIdx] = useState(5); // Juni
  const YEAR = 2026;
  const SISA_HARI = 19;

  // Kalkulasi Dinamis
  const totalBudget = BUDGET_CATEGORIES.reduce((s, c) => s + c.budget, 0);
  const totalSpent = BUDGET_CATEGORIES.reduce((s, c) => s + c.spent, 0);
  const totalPct = Math.round((totalSpent / totalBudget) * 100);
  const sisaBudget = totalBudget - totalSpent;
  const budgetPerHari = Math.round(sisaBudget / SISA_HARI);

  const hampirHabisCount = BUDGET_CATEGORIES.filter(c => {
    const p = (c.spent / c.budget) * 100;
    return p >= 85 && p < 100; // Peringatan jika terpakai di atas 85%
  }).length;

  return (
    // Edges 'top' agar bottom tidak nabrak global nav
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      
      {/* ── TOPBAR DENGAN BACK BUTTON ── */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={COLORS.t1} />
        </TouchableOpacity>
        
        <View style={styles.topbarCenter}>
          <Text style={styles.pageTitle}>Budget bulanan</Text>
          <Text style={styles.pageSub}>Atur anggaran per kategori</Text>
        </View>

        <View style={styles.topbarRight}>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="time" size={16} color={COLORS.t2} /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="settings" size={16} color={COLORS.t2} /></TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* NAVIGASI BULAN (Dinamis) */}
        <View style={styles.monthNav}>
          <TouchableOpacity style={styles.monthBtn} onPress={() => setMonthIdx(i => i === 0 ? 11 : i - 1)}>
            <Ionicons name="chevron-back" size={16} color={COLORS.t2} />
          </TouchableOpacity>
          <Text style={styles.monthTxt}>{MONTHS[monthIdx]} {YEAR}</Text>
          <TouchableOpacity style={styles.monthBtn} onPress={() => setMonthIdx(i => i === 11 ? 0 : i + 1)}>
            <Ionicons name="chevron-forward" size={16} color={COLORS.t2} />
          </TouchableOpacity>
        </View>

        {/* OVERVIEW CARD */}
        <View style={styles.overviewCard}>
          <View style={styles.ovTop}>
            <View>
              <Text style={styles.ovLbl}>Total budget bulan ini</Text>
              <Text style={styles.ovVal}>Rp {totalBudget.toLocaleString('id-ID')}</Text>
              <Text style={styles.ovSub}>Rp {totalSpent.toLocaleString('id-ID')} terpakai · {totalPct}%</Text>
            </View>
            {/* Menggunakan Donut Chart SVG asli dari V1 */}
            <DonutChart pct={totalPct} color={COLORS.gold} />
          </View>

          <View style={styles.miniStats}>
            <View style={styles.mstat}>
              <Text style={styles.mstatLbl}>Sisa budget</Text>
              <Text style={[styles.mstatVal, { color: COLORS.mint }]}>{fmt(sisaBudget)}</Text>
            </View>
            <View style={styles.mstat}>
              <Text style={styles.mstatLbl}>Sisa hari</Text>
              <Text style={[styles.mstatVal, { color: COLORS.violet }]}>{SISA_HARI} hari</Text>
            </View>
            <View style={styles.mstat}>
              <Text style={styles.mstatLbl}>Budget/hari</Text>
              <Text style={[styles.mstatVal, { color: COLORS.gold }]}>{fmt(budgetPerHari)}</Text>
            </View>
          </View>
        </View>

        {/* ALERTS & INSIGHTS */}
        {hampirHabisCount > 0 && (
          <View style={styles.alertCard}>
            <View style={styles.alertIcon}><Ionicons name="warning" size={16} color={COLORS.coral} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>{hampirHabisCount} kategori hampir habis</Text>
              <Text style={styles.alertSub}>Beberapa kategori mendekati batas. Hemat lebih atau naikkan limitnya.</Text>
            </View>
          </View>
        )}

        <View style={styles.insightCard}>
          <View style={styles.insightIcon}><Ionicons name="bulb" size={16} color={COLORS.mint} /></View>
          <Text style={styles.insightTxt}>Transport hemat 32% dari budget. Sisa Rp 136rb aman sampai akhir bulan.</Text>
        </View>

        {/* DAFTAR BUDGET KATEGORI (Gaya V2, Data Dinamis V1) */}
        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>Per kategori</Text>
          <TouchableOpacity><Text style={styles.secLink}>+ Tambah kategori ↗</Text></TouchableOpacity>
        </View>

        {BUDGET_CATEGORIES.map((cat) => {
          // Kalkulasi on-the-fly untuk masing-masing card
          const pct = Math.round((cat.spent / cat.budget) * 100);
          const sisa = cat.budget - cat.spent;
          const isDone = cat.isRecurring && pct >= 100;
          const isWarning = pct >= 85 && pct < 100;
          let statusText = 'Aman';
          if (pct >= 85) statusText = 'Hampir habis';
          else if (pct >= 70) statusText = 'Waspada';

          return (
            <TouchableOpacity 
              key={cat.id} 
              style={[styles.bcat, isDone && { borderColor: hexToRgba(COLORS.coral, 0.3) }]}
            >
              <View style={styles.bcatMain}>
                <View style={[styles.bcatIcon, { backgroundColor: hexToRgba(cat.color, 0.12) }]}>
                  <Ionicons name={cat.icon as any} size={18} color={cat.color} />
                </View>
                <View style={styles.bcatInfo}>
                  <Text style={styles.bcatName}>{cat.name}</Text>
                  <View style={styles.bcatMeta}>
                    <Text style={styles.bcatSpent}>{fmt(cat.spent)} terpakai</Text>
                    <View style={styles.bcatDot} />
                    <Text style={styles.bcatDays}>{cat.isRecurring ? 'rutin bulanan' : `sisa ${fmt(sisa)}`}</Text>
                  </View>
                </View>
                <View style={styles.bcatRight}>
                  <Text style={styles.bcatLimit}>
                    {isDone ? fmt(cat.budget) : (pct < 50 ? `${fmt(cat.budget)} · sisa ${100 - pct}%` : fmt(cat.budget))}
                  </Text>
                  <Text style={[styles.bcatSisa, { color: cat.color }]}>
                    {isDone ? '100% — lunas' : (pct >= 50 ? `${pct}% — ${statusText}` : statusText)}
                  </Text>
                </View>
              </View>

              <View style={styles.barWrap}>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${Math.min(pct, 100)}%`, backgroundColor: cat.color }]} />
                </View>
                <View style={styles.barLabels}>
                  {isDone ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Ionicons name="checkmark" size={13} color={COLORS.mint} />
                      <Text style={{ color: COLORS.mint, fontSize: 10 }}>Cicilan bulan ini sudah dibayar</Text>
                    </View>
                  ) : (
                    <>
                      <Text style={{ color: cat.color }}>{fmt(cat.spent)}</Text>
                      <Text style={{ color: COLORS.t3 }}>dari {fmt(cat.budget)}</Text>
                    </>
                  )}
                </View>
              </View>

              {/* Strip Peringatan V2 */}
              {isWarning && (
                <View style={styles.exceedStrip}>
                  <Ionicons name="alert-circle" size={14} color="#FF9090" />
                  <Text style={styles.exceedStripTxt}>Hati-hati — hanya {fmt(sisa)} tersisa untuk {SISA_HARI} hari lagi</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* BUTTON ADD CATEGORY */}
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={18} color={COLORS.violet} />
          <Text style={styles.addBtnTxt}>Tambah kategori budget baru</Text>
        </TouchableOpacity>

        {/* RUANG BOTTOM NAV: Spacer agar tidak nabrak menu bawah */}
        <View style={{ height: 100 }} />

      </ScrollView>
    </SafeAreaView>
  );
};

// ─── STYLES (Style Asli V2) ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  scrollBody: { paddingBottom: 0 },
  
  // TOPBAR (Diperbarui dengan 3 kolom)
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 10, paddingBottom: 10, gap: 10 },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd, alignItems: 'center', justifyContent: 'center' },
  topbarCenter: { flex: 1 },
  pageTitle: { fontSize: 17, fontWeight: '600', color: COLORS.t1 },
  pageSub: { fontSize: 11, color: COLORS.t3, marginTop: 2 },
  topbarRight: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd, alignItems: 'center', justifyContent: 'center' },

  // MONTH NAV
  monthNav: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 6, marginHorizontal: 18, marginBottom: 14 },
  monthBtn: { width: 28, height: 28, borderRadius: 8, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center' },
  monthTxt: { flex: 1, textAlign: 'center', fontSize: 13, fontWeight: '600', color: COLORS.t1 },

  // OVERVIEW CARD
  overviewCard: { marginHorizontal: 16, marginBottom: 14, backgroundColor: 'rgba(21, 35, 56, 0.7)', borderWidth: 1, borderColor: COLORS.bd, borderRadius: 18, padding: 14 },
  ovTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  ovLbl: { fontSize: 11, color: COLORS.t3, marginBottom: 4 },
  ovVal: { fontSize: 24, fontWeight: '600', color: COLORS.t1 },
  ovSub: { fontSize: 11, color: COLORS.coral, marginTop: 4 },
  
  // DONUT SVG STYLES (Diambil dari V1)
  donutCenter: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  donutPct: { fontSize: 14, fontWeight: '600' },
  donutSub: { fontSize: 9, color: COLORS.t3 },

  miniStats: { flexDirection: 'row', gap: 8 },
  mstat: { flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 8, alignItems: 'center', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.07)' },
  mstatLbl: { fontSize: 10, color: COLORS.t3, marginBottom: 4 },
  mstatVal: { fontSize: 12, fontWeight: '600' },

  // ALERTS & INSIGHTS
  alertCard: { marginHorizontal: 16, marginBottom: 12, backgroundColor: 'rgba(255,107,107,0.08)', borderWidth: 1, borderColor: 'rgba(255,107,107,0.25)', borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  alertIcon: { width: 30, height: 30, borderRadius: 9, backgroundColor: 'rgba(255,107,107,0.15)', alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  alertTitle: { fontSize: 12, fontWeight: '600', color: '#FF9090', marginBottom: 4 },
  alertSub: { fontSize: 11, color: 'rgba(255,107,107,0.8)', lineHeight: 16 },

  insightCard: { marginHorizontal: 16, marginBottom: 16, backgroundColor: 'rgba(45,212,164,0.07)', borderWidth: 1, borderColor: 'rgba(45,212,164,0.2)', borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  insightIcon: { width: 30, height: 30, borderRadius: 9, backgroundColor: 'rgba(45,212,164,0.12)', alignItems: 'center', justifyContent: 'center' },
  insightTxt: { flex: 1, fontSize: 11, color: '#6EE7C0', lineHeight: 16 },

  // CATEGORY LIST
  secHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginBottom: 10 },
  secLbl: { fontSize: 11, color: COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: '500' },
  secLink: { fontSize: 11, color: COLORS.violet, fontWeight: '500' },

  bcat: { marginHorizontal: 16, marginBottom: 10, backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd, borderRadius: 16, overflow: 'hidden' },
  bcatMain: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingTop: 14, paddingBottom: 10 },
  bcatIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  bcatInfo: { flex: 1 },
  bcatName: { fontSize: 13, fontWeight: '600', color: COLORS.t1, marginBottom: 4 },
  bcatMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  bcatSpent: { fontSize: 11, color: COLORS.t2 },
  bcatDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: COLORS.t3 },
  bcatDays: { fontSize: 11, color: COLORS.t3 },
  bcatRight: { alignItems: 'flex-end' },
  bcatLimit: { fontSize: 12, fontWeight: '600', color: COLORS.t1 },
  bcatSisa: { fontSize: 11, marginTop: 4, fontWeight: '500' },

  barWrap: { paddingHorizontal: 14, paddingBottom: 14 },
  barTrack: { height: 5, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 3 },
  barLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, fontSize: 10, fontWeight: '500' },

  exceedStrip: { backgroundColor: 'rgba(255,107,107,0.07)', paddingHorizontal: 14, paddingVertical: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,107,107,0.15)', flexDirection: 'row', alignItems: 'center', gap: 8 },
  exceedStripTxt: { fontSize: 11, color: '#FF9090', fontWeight: '500' },

  // ADD BUTTON
  addBtn: { marginHorizontal: 16, marginTop: 4, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.sf2, borderWidth: 1.5, borderColor: 'rgba(124,111,247,0.25)', borderStyle: 'dashed', borderRadius: 16, padding: 14 },
  addBtnTxt: { fontSize: 13, fontWeight: '600', color: COLORS.violet }
});
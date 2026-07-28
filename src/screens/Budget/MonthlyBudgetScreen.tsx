import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

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

// ─── TYPES ───────────────────────────────────────────────────────────────────
type BudgetCategory = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bgColor: string;
  budget: number;
  spent: number;
  isRecurring: boolean;
};

// ─── DUMMY DATA (Nanti disambung ke API) ─────────────────────────────────────
const BUDGET_CATEGORIES: BudgetCategory[] = [
  { id: 'belanja', name: 'Belanja', icon: 'cart-outline', color: COLORS.coral, bgColor: hexToRgba(COLORS.coral, 0.12), budget: 500000, spent: 420000, isRecurring: false },
  { id: 'makan', name: 'Makan & minum', icon: 'restaurant-outline', color: COLORS.gold, bgColor: hexToRgba(COLORS.gold, 0.12), budget: 1500000, spent: 1170000, isRecurring: false },
  { id: 'tagihan', name: 'Tagihan & utilitas', icon: 'flash-outline', color: COLORS.violet, bgColor: hexToRgba(COLORS.violet, 0.12), budget: 1000000, spent: 785000, isRecurring: false },
  { id: 'transport', name: 'Transportasi', icon: 'car-outline', color: COLORS.mint, bgColor: hexToRgba(COLORS.mint, 0.1), budget: 500000, spent: 204000, isRecurring: false },
  { id: 'kesehatan', name: 'Kesehatan', icon: 'fitness-outline', color: COLORS.mint, bgColor: hexToRgba(COLORS.mint, 0.1), budget: 800000, spent: 296000, isRecurring: false },
  { id: 'hiburan', name: 'Hiburan', icon: 'game-controller-outline', color: COLORS.violet, bgColor: hexToRgba(COLORS.violet, 0.1), budget: 500000, spent: 330000, isRecurring: false },
  { id: 'cicilan', name: 'Cicilan motor', icon: 'bicycle-outline', color: COLORS.coral, bgColor: hexToRgba(COLORS.coral, 0.1), budget: 800000, spent: 800000, isRecurring: true },
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

const getStatus = (pct: number) => {
  if (pct >= 100) return { color: COLORS.coral, bar: COLORS.coral, label: 'Lunas' };
  if (pct >= 85) return { color: COLORS.coral, bar: COLORS.coral, label: 'Hampir habis' };
  if (pct >= 70) return { color: COLORS.gold, bar: COLORS.gold, label: 'Waspada' };
  return { color: COLORS.mint, bar: COLORS.mint, label: 'Aman' };
};

// ─── KOMPONEN: DONUT CHART ───────────────────────────────────────────────────
const DonutChart = ({ pct, color = COLORS.gold }: { pct: number; color?: string; }) => {
  const R = 26;
  const SW = 8;
  const circ = 2 * Math.PI * R;
  const filled = (Math.min(pct, 100) / 100) * circ;
  
  return (
    <View style={{ width: 64, height: 64 }}>
      <Svg width={64} height={64} viewBox="0 0 64 64">
        <Circle cx="32" cy="32" r={R} fill="none" stroke={hexToRgba(COLORS.t1, 0.07)} strokeWidth={SW} />
        <Circle cx="32" cy="32" r={R} fill="none" stroke={color} strokeWidth={SW} strokeDasharray={`${filled} ${circ}`} strokeDashoffset={circ * 0.25} strokeLinecap="round" />
      </Svg>
      <View style={styles.donutCenter} pointerEvents="none">
        <Text style={[styles.donutPct, { color }]}>{pct}%</Text>
        <Text style={styles.donutSub}>terpakai</Text>
      </View>
    </View>
  );
};

// ─── KOMPONEN: KARTU KATEGORI ────────────────────────────────────────────────
const BudgetCategoryCard = ({ cat, sisaHari, onPress }: { cat: BudgetCategory; sisaHari: number; onPress: () => void; }) => {
  const pct = Math.round((cat.spent / cat.budget) * 100);
  const status = getStatus(pct);
  const sisa = cat.budget - cat.spent;
  const isDone = cat.isRecurring && pct >= 100;

  return (
    <TouchableOpacity
      style={[styles.catCard, pct >= 100 && { borderColor: hexToRgba(COLORS.coral, 0.3) }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.catMain}>
        <View style={[styles.catIcon, { backgroundColor: cat.bgColor }]}>
          <Ionicons name={cat.icon} size={18} color={cat.color} />
        </View>
        <View style={styles.catMeta}>
          <Text style={styles.catName}>{cat.name}</Text>
          <View style={styles.catSub}>
            <Text style={styles.catSpent}>{fmt(cat.spent)} terpakai</Text>
            <View style={styles.dot} />
            <Text style={styles.catSisa}>{cat.isRecurring ? 'rutin bulanan' : `sisa ${fmt(sisa)}`}</Text>
          </View>
        </View>
        <View style={styles.catRight}>
          <Text style={styles.catLimit}>{fmt(cat.budget)}</Text>
          <Text style={[styles.catStatus, { color: status.color }]}>
            {pct}% — {isDone ? 'lunas' : status.label}
          </Text>
        </View>
      </View>
      
      <View style={styles.barWrap}>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${Math.min(pct, 100)}%` as any, backgroundColor: status.bar }]} />
        </View>
        <View style={styles.barLabels}>
          {isDone ? (
            <Text style={[styles.barLeft, { color: COLORS.mint }]}>✓ Cicilan bulan ini sudah dibayar</Text>
          ) : (
            <>
              <Text style={[styles.barLeft, { color: status.bar }]}>{fmt(cat.spent)}</Text>
              <Text style={styles.barRight}>dari {fmt(cat.budget)}</Text>
            </>
          )}
        </View>
      </View>

      {pct >= 85 && pct < 100 && (
        <View style={styles.exceedStrip}>
          <Ionicons name="alert-circle-outline" size={14} color={COLORS.coral} />
          <Text style={styles.exceedTxt}>Hati-hati — hanya {fmt(sisa)} tersisa untuk {sisaHari} hari lagi</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// ─── SCREEN UTAMA ────────────────────────────────────────────────────────────
export const BudgetScreen = () => {
  const navigation = useNavigation<any>();
  const [monthIdx, setMonthIdx] = useState(5); // 5 = Juni (0-indexed)
  const YEAR = 2026; 
  const SISA_HARI = 19; 

  const totalBudget = BUDGET_CATEGORIES.reduce((s, c) => s + c.budget, 0);
  const totalSpent = BUDGET_CATEGORIES.reduce((s, c) => s + c.spent, 0);
  const totalPct = Math.round((totalSpent / totalBudget) * 100);
  const sisaBudget = totalBudget - totalSpent;
  const budgetPerHari = Math.round(sisaBudget / SISA_HARI);

  const hampirHabisCount = BUDGET_CATEGORIES.filter(c => (c.spent / c.budget) * 100 >= 75 && (c.spent / c.budget) * 100 < 100).length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topbar}>
        <View>
          <Text style={styles.pageTitle}>Budget Bulanan</Text>
          <Text style={styles.pageSub}>Atur anggaran per kategori</Text>
        </View>
        <View style={styles.topBtns}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('BudgetHistory')}>
            <Ionicons name="time-outline" size={16} color={COLORS.t2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('BudgetSettings')}>
            <Ionicons name="settings-outline" size={16} color={COLORS.t2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        
        <View style={styles.monthNav}>
          <TouchableOpacity style={styles.monthBtn} onPress={() => setMonthIdx((i) => (i === 0 ? 11 : i - 1))}>
            <Ionicons name="chevron-back" size={16} color={COLORS.t2} />
          </TouchableOpacity>
          <Text style={styles.monthTxt}>{MONTHS[monthIdx]} {YEAR}</Text>
          <TouchableOpacity style={styles.monthBtn} onPress={() => setMonthIdx((i) => (i === 11 ? 0 : i + 1))}>
            <Ionicons name="chevron-forward" size={16} color={COLORS.t2} />
          </TouchableOpacity>
        </View>

        <View style={styles.overviewCard}>
          <View style={styles.ovTop}>
            <View style={styles.ovLeft}>
              <Text style={styles.ovLbl}>Total budget bulan ini</Text>
              <Text style={styles.ovVal}>Rp {totalBudget.toLocaleString('id-ID')}</Text>
              <Text style={[styles.ovSub, { color: COLORS.coral }]}>Rp {totalSpent.toLocaleString('id-ID')} terpakai · {totalPct}%</Text>
            </View>
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

        {hampirHabisCount > 0 && (
          <View style={styles.alertCard}>
            <View style={[styles.infoIcon, { backgroundColor: hexToRgba(COLORS.coral, 0.15) }]}>
              <Ionicons name="warning" size={17} color={COLORS.coral} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>{hampirHabisCount} kategori hampir habis</Text>
              <Text style={styles.alertSub}>Belanja (84%) dan Makan (78%) mendekati batas. Hemat lebih atau naikkan limitnya.</Text>
            </View>
          </View>
        )}

        <View style={styles.insightCard}>
          <View style={[styles.infoIcon, { backgroundColor: hexToRgba(COLORS.mint, 0.12) }]}>
            <Ionicons name="bulb-outline" size={17} color={COLORS.mint} />
          </View>
          <Text style={styles.insightTxt}>Transport hemat 32% dari budget. Sisa Rp 136rb aman sampai akhir bulan.</Text>
        </View>

        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>PER KATEGORI</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddBudgetCategory')}>
            <Text style={styles.secLink}>+ Tambah kategori</Text>
          </TouchableOpacity>
        </View>

        {BUDGET_CATEGORIES.map((cat) => (
          <BudgetCategoryCard key={cat.id} cat={cat} sisaHari={SISA_HARI} onPress={() => navigation.navigate('BudgetCategoryDetail', { category: cat })} />
        ))}

        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddBudgetCategory')}>
          <Ionicons name="add" size={18} color={COLORS.violet} />
          <Text style={styles.addBtnTxt}>Tambah kategori budget baru</Text>
        </TouchableOpacity>
        
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  scrollBody: { paddingBottom: 24 },
  
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  pageTitle: { fontSize: 18, fontWeight: '600', color: COLORS.t1 },
  pageSub: { fontSize: 11, color: COLORS.t3, marginTop: 1 },
  topBtns: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: COLORS.sf, borderWidth: 0.5, borderColor: COLORS.bd, alignItems: 'center', justifyContent: 'center' },
  
  monthNav: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: COLORS.sf, borderWidth: 0.5, borderColor: COLORS.bd, borderRadius: 12, paddingVertical: 6, paddingHorizontal: 8, marginHorizontal: 18, marginBottom: 12 },
  monthBtn: { width: 28, height: 28, borderRadius: 8, backgroundColor: COLORS.sf2, alignItems: 'center', justifyContent: 'center' },
  monthTxt: { flex: 1, textAlign: 'center', fontSize: 13, fontWeight: '500', color: COLORS.t1 },
  
  overviewCard: { marginHorizontal: 16, marginBottom: 12, backgroundColor: COLORS.sf2, borderWidth: 0.5, borderColor: COLORS.bd, borderRadius: 18, padding: 14 },
  ovTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  ovLeft: { flex: 1, marginRight: 12 },
  ovLbl: { fontSize: 11, color: COLORS.t3, marginBottom: 3 },
  ovVal: { fontSize: 22, fontWeight: '600', color: COLORS.t1 },
  ovSub: { fontSize: 11, marginTop: 2 },
  miniStats: { flexDirection: 'row', gap: 8 },
  mstat: { flex: 1, backgroundColor: hexToRgba(COLORS.t1, 0.04), borderRadius: 10, padding: 8, alignItems: 'center', borderWidth: 0.5, borderColor: hexToRgba(COLORS.t1, 0.08) },
  mstatLbl: { fontSize: 10, color: COLORS.t3, marginBottom: 2 },
  mstatVal: { fontSize: 12, fontWeight: '500' },
  
  donutCenter: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  donutPct: { fontSize: 14, fontWeight: '500' },
  donutSub: { fontSize: 9, color: COLORS.t3 },
  
  alertCard: { marginHorizontal: 16, marginBottom: 10, backgroundColor: hexToRgba(COLORS.coral, 0.08), borderWidth: 0.5, borderColor: hexToRgba(COLORS.coral, 0.25), borderRadius: 14, padding: 11, flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  alertTitle: { fontSize: 12, fontWeight: '500', color: '#FF9090', marginBottom: 2 },
  alertSub: { fontSize: 11, color: hexToRgba(COLORS.coral, 0.65), lineHeight: 16 },
  
  insightCard: { marginHorizontal: 16, marginBottom: 12, backgroundColor: hexToRgba(COLORS.mint, 0.07), borderWidth: 0.5, borderColor: hexToRgba(COLORS.mint, 0.2), borderRadius: 14, padding: 11, flexDirection: 'row', alignItems: 'center', gap: 9 },
  insightTxt: { flex: 1, fontSize: 12, color: '#6EE7C0', lineHeight: 17 },
  infoIcon: { width: 30, height: 30, borderRadius: 9, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  
  secHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginBottom: 8 },
  secLbl: { fontSize: 11, color: COLORS.t3, letterSpacing: 0.5 },
  secLink: { fontSize: 11, color: COLORS.violet },
  
  catCard: { marginHorizontal: 16, marginBottom: 8, backgroundColor: COLORS.sf, borderWidth: 0.5, borderColor: COLORS.bd, borderRadius: 16, overflow: 'hidden' },
  catMain: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 12, paddingBottom: 8 },
  catIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  catMeta: { flex: 1, minWidth: 0 },
  catName: { fontSize: 13, fontWeight: '500', color: COLORS.t1, marginBottom: 2 },
  catSub: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  catSpent: { fontSize: 11, color: COLORS.t2 },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: COLORS.t3 },
  catSisa: { fontSize: 11, color: COLORS.t3 },
  catRight: { alignItems: 'flex-end', flexShrink: 0 },
  catLimit: { fontSize: 13, fontWeight: '500', color: COLORS.t1 },
  catStatus: { fontSize: 11, marginTop: 1 },
  
  barWrap: { paddingHorizontal: 13, paddingBottom: 11 },
  barTrack: { height: 5, backgroundColor: hexToRgba(COLORS.t1, 0.07), borderRadius: 3, overflow: 'hidden' },
  barFill: { height: 5, borderRadius: 3 },
  barLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  barLeft: { fontSize: 10 },
  barRight: { fontSize: 10, color: COLORS.t3 },
  
  exceedStrip: { backgroundColor: hexToRgba(COLORS.coral, 0.07), paddingVertical: 6, paddingHorizontal: 13, borderTopWidth: 0.5, borderTopColor: hexToRgba(COLORS.coral, 0.15), flexDirection: 'row', alignItems: 'center', gap: 6 },
  exceedTxt: { fontSize: 11, color: '#FF9090', flex: 1 },
  
  addBtn: { marginHorizontal: 16, marginTop: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.sf, borderWidth: 1.5, borderColor: hexToRgba(COLORS.violet, 0.25), borderStyle: 'dashed', borderRadius: 16, padding: 13 },
  addBtnTxt: { fontSize: 13, fontWeight: '500', color: COLORS.violet },
});
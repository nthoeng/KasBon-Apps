import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export const MonthlyBudgetScreen = () => {
  const navigation = useNavigation<any>();

  // Simulasi Data Kategori Budget
  const budgets = [
    { id: 1, name: 'Belanja', icon: 'cart', spent: '420.000', limit: '500.000', sisa: '80rb', pct: 84, color: COLORS.coral, status: 'hampir habis', isWarning: true },
    { id: 2, name: 'Makan & minum', icon: 'fast-food', spent: '1.170.000', limit: '1.500.000', sisa: '330rb', pct: 78, color: COLORS.gold, status: 'waspada' },
    { id: 3, name: 'Tagihan & utilitas', icon: 'flash', spent: '785.000', limit: '1.000.000', sisa: '215rb', pct: 78, color: COLORS.violet, status: 'waspada' },
    { id: 4, name: 'Transportasi', icon: 'car', spent: '204.000', limit: '500.000', sisa: '296rb', pct: 41, color: COLORS.mint, status: 'Aman' },
    { id: 5, name: 'Kesehatan', icon: 'fitness', spent: '296.000', limit: '800.000', sisa: '504rb', pct: 37, color: COLORS.mint, status: 'Aman' },
    { id: 6, name: 'Hiburan', icon: 'game-controller', spent: '330.000', limit: '500.000', sisa: '170rb', pct: 66, color: COLORS.gold, status: 'Perhatian' },
    { id: 7, name: 'Cicilan motor', icon: 'bicycle', spent: '800.000', limit: '800.000', sisa: 'rutin bulanan', pct: 100, color: COLORS.coral, status: '100% — lunas', isDone: true },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <View>
          <Text style={styles.pageTitle}>Budget bulanan</Text>
          <Text style={styles.pageSub}>Atur anggaran per kategori</Text>
        </View>
        <View style={styles.topbarRight}>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="time" size={16} color={COLORS.t2} /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="settings" size={16} color={COLORS.t2} /></TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* NAVIGASI BULAN */}
        <View style={styles.monthNav}>
          <TouchableOpacity style={styles.monthBtn}><Ionicons name="chevron-back" size={16} color={COLORS.t2} /></TouchableOpacity>
          <Text style={styles.monthTxt}>Juni 2026</Text>
          <TouchableOpacity style={styles.monthBtn}><Ionicons name="chevron-forward" size={16} color={COLORS.t2} /></TouchableOpacity>
        </View>

        {/* OVERVIEW CARD */}
        <View style={styles.overviewCard}>
          <View style={styles.ovTop}>
            <View>
              <Text style={styles.ovLbl}>Total budget bulan ini</Text>
              <Text style={styles.ovVal}>Rp 8.000.000</Text>
              <Text style={styles.ovSub}>Rp 5.455.000 terpakai · 68%</Text>
            </View>
            {/* Visualisasi Donut Sederhana */}
            <View style={styles.donutWrap}>
              <View style={styles.donutRing}>
                <View style={styles.donutLabel}>
                  <Text style={styles.donutPct}>68%</Text>
                  <Text style={styles.donutSub}>terpakai</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.miniStats}>
            <View style={styles.mstat}>
              <Text style={styles.mstatLbl}>Sisa budget</Text>
              <Text style={[styles.mstatVal, { color: COLORS.mint }]}>Rp 2,55jt</Text>
            </View>
            <View style={styles.mstat}>
              <Text style={styles.mstatLbl}>Sisa hari</Text>
              <Text style={[styles.mstatVal, { color: COLORS.violet }]}>19 hari</Text>
            </View>
            <View style={styles.mstat}>
              <Text style={styles.mstatLbl}>Budget/hari</Text>
              <Text style={[styles.mstatVal, { color: COLORS.gold }]}>Rp 134rb</Text>
            </View>
          </View>
        </View>

        {/* ALERTS & INSIGHTS */}
        <View style={styles.alertCard}>
          <View style={styles.alertIcon}><Ionicons name="warning" size={16} color={COLORS.coral} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>2 kategori hampir habis</Text>
            <Text style={styles.alertSub}>Belanja (84%) dan Makan (78%) mendekati batas. Hemat lebih atau naikkan limitnya.</Text>
          </View>
        </View>

        <View style={styles.insightCard}>
          <View style={styles.insightIcon}><Ionicons name="bulb" size={16} color={COLORS.mint} /></View>
          <Text style={styles.insightTxt}>Transport hemat 32% dari budget. Sisa Rp 136rb aman sampai akhir bulan.</Text>
        </View>

        {/* DAFTAR BUDGET KATEGORI */}
        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>Per kategori</Text>
          <TouchableOpacity><Text style={styles.secLink}>+ Tambah kategori ↗</Text></TouchableOpacity>
        </View>

        {budgets.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.bcat, item.isDone && { borderColor: hexToRgba(COLORS.coral, 0.3) }]}
          >
            <View style={styles.bcatMain}>
              <View style={[styles.bcatIcon, { backgroundColor: hexToRgba(item.color, 0.12) }]}>
                <Ionicons name={item.icon as any} size={18} color={item.color} />
              </View>
              <View style={styles.bcatInfo}>
                <Text style={styles.bcatName}>{item.name}</Text>
                <View style={styles.bcatMeta}>
                  <Text style={styles.bcatSpent}>Rp {item.spent} terpakai</Text>
                  <View style={styles.bcatDot} />
                  <Text style={styles.bcatDays}>{item.isDone ? item.sisa : `sisa Rp ${item.sisa}`}</Text>
                </View>
              </View>
              <View style={styles.bcatRight}>
                <Text style={styles.bcatLimit}>{item.isDone ? `Rp ${item.limit}` : (item.pct < 50 ? `Rp ${item.limit} · sisa ${100 - item.pct}%` : `Rp ${item.limit}`)}</Text>
                <Text style={[styles.bcatSisa, { color: item.color }]}>{item.isDone ? item.status : (item.pct >= 50 ? `${item.pct}% — ${item.status}` : item.status)}</Text>
              </View>
            </View>

            <View style={styles.barWrap}>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${item.pct}%`, backgroundColor: item.color }]} />
              </View>
              <View style={styles.barLabels}>
                {item.isDone ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Ionicons name="checkmark" size={13} color={COLORS.mint} />
                    <Text style={{ color: COLORS.mint, fontSize: 10 }}>Cicilan bulan ini sudah dibayar</Text>
                  </View>
                ) : (
                  <>
                    <Text style={{ color: item.color }}>Rp {item.spent.split('.')[0]}{item.spent.split('.')[1] === '000' ? 'rb' : 'jt'}</Text>
                    <Text style={{ color: COLORS.t3 }}>dari Rp {item.limit.split('.')[0]}rb</Text>
                  </>
                )}
              </View>
            </View>

            {item.isWarning && (
              <View style={styles.exceedStrip}>
                <Ionicons name="alert-circle" size={14} color="#FF9090" />
                <Text style={styles.exceedStripTxt}>Hati-hati — hanya Rp {item.sisa} tersisa untuk 19 hari lagi</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* BUTTON ADD CATEGORY */}
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={18} color={COLORS.violet} />
          <Text style={styles.addBtnTxt}>Tambah kategori budget baru</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  scrollBody: { paddingBottom: 20 },
  
  // TOPBAR
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 10 },
  pageTitle: { fontSize: 17, fontWeight: '600', color: COLORS.t1 },
  pageSub: { fontSize: 11, color: COLORS.t3, marginTop: 2 },
  topbarRight: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd, alignItems: 'center', justifyContent: 'center' },

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
  
  donutWrap: { width: 64, height: 64 },
  donutRing: { width: 64, height: 64, borderRadius: 32, borderWidth: 6, borderColor: 'rgba(245,200,66,0.2)', borderLeftColor: COLORS.gold, borderTopColor: COLORS.gold, borderRightColor: COLORS.gold, alignItems: 'center', justifyContent: 'center' },
  donutLabel: { alignItems: 'center', justifyContent: 'center' },
  donutPct: { fontSize: 14, fontWeight: '600', color: COLORS.gold },
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
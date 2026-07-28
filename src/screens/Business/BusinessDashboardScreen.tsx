import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Warna disesuaikan dengan tema utama KasBon
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

export const BusinessDashboardScreen = () => {
  const navigation = useNavigation<any>();
  const [activePeriod, setActivePeriod] = useState('Bulan ini');

  const periods = ['Hari ini', 'Pekan ini', 'Bulan ini', '3 bulan', 'Semua waktu'];

  // Dummy Data Chart
  const chartData = [
    { label: 'Mgg 1', omsetH: 52, hppH: 32 },
    { label: 'Mgg 2', omsetH: 44, hppH: 28 },
    { label: 'Mgg 3', omsetH: 60, hppH: 36 },
    { label: 'Mgg 4', omsetH: 70, hppH: 42, active: true }
  ];

  // Dummy Data Stok
  const stockItems = [
    { id: 1, name: 'Tepung tapioka', detail: 'Rp 8.000/kg · beli 20 Jun', qty: '4,5 kg', status: 'Cukup', color: COLORS.mint, statColor: COLORS.mint },
    { id: 2, name: 'Bumbu balado sachet', detail: 'Rp 2.500/pcs · 30 pcs/kotak', qty: '12 pcs', status: 'Hampir habis', color: COLORS.gold, statColor: COLORS.gold },
    { id: 3, name: 'Minyak goreng', detail: 'Rp 18.000/liter', qty: '0,5 liter', status: 'Stok kritis!', color: COLORS.coral, statColor: COLORS.coral },
    { id: 4, name: 'Plastik kemasan', detail: 'Rp 15.000/100 pcs', qty: '80 pcs', status: 'Cukup', color: COLORS.t2, statColor: COLORS.mint }
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Dashboard Usaha</Text>
        <View style={styles.topbarRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="download-outline" size={16} color={COLORS.t2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="ellipsis-horizontal" size={16} color={COLORS.t2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* HERO HEADER */}
        <View style={styles.heroTop}>
          <View style={styles.bizIcon}>
            <Ionicons name="storefront" size={26} color={COLORS.gold} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bizName}>Usaha Cimol Pak Bos</Text>
            <View style={styles.bizMeta}>
              <View style={[styles.badge, styles.badgeAktif]}><Text style={styles.badgeTxtAktif}>Aktif</Text></View>
              <View style={[styles.badge, styles.badgeBiz]}><Text style={styles.badgeTxtBiz}>Kuliner</Text></View>
              <Text style={styles.bizStartDate}>Mulai Jan 2026</Text>
            </View>
          </View>
        </View>

        {/* PERIOD SELECTOR */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.periodRow}>
          {periods.map((p) => (
            <TouchableOpacity 
              key={p} 
              style={[styles.periodChip, activePeriod === p ? styles.pcOn : styles.pcOff]}
              onPress={() => setActivePeriod(p)}
            >
              <Text style={[styles.periodTxt, activePeriod === p ? styles.pcTxtOn : styles.pcTxtOff]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* MAIN KPI - LABA & MARGIN */}
        <View style={styles.mainKpi}>
          <View style={styles.mkTop}>
            <View>
              <Text style={styles.mkLbl}>Laba bersih — Juni 2026</Text>
              <Text style={styles.mkVal}>Rp 2.400.000</Text>
              <Text style={styles.mkSub}>Margin 38,7% dari omset</Text>
            </View>
            <View style={styles.mkTrend}>
              <Ionicons name="trending-up" size={14} color={COLORS.mint} />
              <Text style={styles.mkTrendTxt}>+22% vs Mei</Text>
            </View>
          </View>

          {/* HPP FLOW */}
          <View style={styles.hppFlow}>
            <View style={styles.hppBlock}>
              <Text style={styles.hppLbl}>Omset</Text>
              <Text style={[styles.hppVal, { color: COLORS.mint }]}>Rp 6,2jt</Text>
            </View>
            <Text style={styles.hppArrow}>-</Text>
            <View style={styles.hppBlock}>
              <Text style={styles.hppLbl}>HPP / Modal</Text>
              <Text style={[styles.hppVal, { color: COLORS.coral }]}>Rp 3,8jt</Text>
            </View>
            <Text style={styles.hppArrow}>=</Text>
            <View style={[styles.hppBlock, { borderColor: hexToRgba(COLORS.gold, 0.25) }]}>
              <Text style={styles.hppLbl}>Laba kotor</Text>
              <Text style={[styles.hppVal, { color: COLORS.gold }]}>Rp 2,4jt</Text>
            </View>
          </View>

          <View style={styles.marginBarRow}>
            <View style={styles.mbLabels}>
              <Text style={styles.mbLblTxt}>Margin laba kotor</Text>
              <Text style={[styles.mbLblTxt, { color: COLORS.gold, fontWeight: '600' }]}>38,7%</Text>
            </View>
            <View style={styles.mbTrack}>
              <View style={[styles.mbFill, { width: '39%' }]} />
            </View>
          </View>
        </View>

        {/* SECONDARY KPIs */}
        <View style={styles.kpi2Grid}>
          <View style={styles.kpi2}>
            <View style={styles.kpi2LblWrap}>
              <Ionicons name="calendar" size={13} color={COLORS.violet} />
              <Text style={styles.kpi2Lbl}>Rata-rata harian</Text>
            </View>
            <Text style={[styles.kpi2Val, { color: COLORS.violet }]}>Rp 207rb</Text>
            <Text style={styles.kpi2Sub}>omset per hari buka</Text>
          </View>
          <View style={styles.kpi2}>
            <View style={styles.kpi2LblWrap}>
              <Ionicons name="time" size={13} color={COLORS.mint} />
              <Text style={styles.kpi2Lbl}>Hari buka bln ini</Text>
            </View>
            <Text style={[styles.kpi2Val, { color: COLORS.mint }]}>30 hari</Text>
            <Text style={styles.kpi2Sub}>dari 30 hari aktif</Text>
          </View>
          <View style={styles.kpi2}>
            <View style={styles.kpi2LblWrap}>
              <Ionicons name="cube" size={13} color={COLORS.gold} />
              <Text style={styles.kpi2Lbl}>Porsi terjual</Text>
            </View>
            <Text style={[styles.kpi2Val, { color: COLORS.gold }]}>620 pcs</Text>
            <Text style={styles.kpi2Sub}>est. @Rp 10rb/pcs</Text>
          </View>
          <View style={styles.kpi2}>
            <View style={styles.kpi2LblWrap}>
              <Ionicons name="receipt" size={13} color={COLORS.coral} />
              <Text style={styles.kpi2Lbl}>Biaya operasional</Text>
            </View>
            <Text style={[styles.kpi2Val, { color: COLORS.coral }]}>Rp 380rb</Text>
            <Text style={styles.kpi2Sub}>gas, bumbu, dll</Text>
          </View>
        </View>

        {/* CHART AREA */}
        <View style={styles.chartArea}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Omset vs HPP — mingguan</Text>
            <View style={styles.chartLegend}>
              <View style={styles.legItem}><View style={[styles.legDot, { backgroundColor: COLORS.mint }]} /><Text style={styles.legTxt}>Omset</Text></View>
              <View style={styles.legItem}><View style={[styles.legDot, { backgroundColor: COLORS.coral }]} /><Text style={styles.legTxt}>HPP</Text></View>
            </View>
          </View>
          
          <View style={styles.barChartWrap}>
            {chartData.map((d, i) => (
              <View key={i} style={[styles.barGroup, d.active && styles.barGroupActive]}>
                <View style={[styles.bar, { height: d.omsetH, backgroundColor: COLORS.mint, opacity: d.active ? 1 : 0.85 }]} />
                <View style={[styles.bar, { height: d.hppH, backgroundColor: COLORS.coral, opacity: d.active ? 1 : 0.85 }]} />
              </View>
            ))}
          </View>
          
          <View style={styles.barLabelsRow}>
            {chartData.map((d, i) => (
              <Text key={i} style={[styles.barLbl, d.active && { color: COLORS.gold, fontWeight: '600' }]}>{d.label}</Text>
            ))}
          </View>
        </View>

        {/* INVENTORY / STOK */}
        <View style={styles.stokCard}>
          <View style={styles.stokHeader}>
            <Text style={styles.stokTitle}>Stok bahan baku</Text>
            <TouchableOpacity><Text style={styles.stokAdd}>+ Perbarui stok</Text></TouchableOpacity>
          </View>
          {stockItems.map((item, index) => (
            <View key={item.id} style={[styles.stokRow, index === stockItems.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={[styles.stokColor, { backgroundColor: item.color }]} />
              <View style={styles.stokInfo}>
                <Text style={styles.stokName}>{item.name}</Text>
                <Text style={styles.stokDetail}>{item.detail}</Text>
              </View>
              <View style={styles.stokRight}>
                <Text style={styles.stokQty}>{item.qty}</Text>
                <Text style={[styles.stokStatus, { color: item.statColor }]}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* NOTES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.secLbl}>Catatan hari ini</Text>
          <TouchableOpacity><Text style={styles.secLink}>+ Tambah</Text></TouchableOpacity>
        </View>
        <View style={styles.noteCard}>
          <View style={styles.noteItem}>
            <View style={[styles.noteDot, { backgroundColor: COLORS.coral }]} />
            <Text style={styles.noteTxt}>Minyak goreng hampir habis — beli besok pagi sebelum buka</Text>
          </View>
          <View style={styles.noteItem}>
            <View style={[styles.noteDot, { backgroundColor: COLORS.mint }]} />
            <Text style={styles.noteTxt}>Minggu ke-4 omset tertinggi bulan ini — ramai karena dekat akhir bulan</Text>
          </View>
          <View style={styles.noteItem}>
            <View style={[styles.noteDot, { backgroundColor: COLORS.gold }]} />
            <Text style={styles.noteTxt}>Pertimbangkan tambah varian rasa keju minggu depan</Text>
          </View>
        </View>

        {/* BOTTOM FAB / ACTIONS */}
        <View style={styles.fabRow}>
          <TouchableOpacity style={[styles.fabBtn, styles.fabOmset]} onPress={() => navigation.navigate('Add', { type: 'income' })}>
            <Ionicons name="arrow-down" size={16} color={COLORS.bg} />
            <Text style={styles.fabTxtOmset}>Catat omset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.fabBtn, styles.fabHpp]} onPress={() => navigation.navigate('Add', { type: 'expense' })}>
            <Ionicons name="arrow-up" size={16} color={COLORS.coral} />
            <Text style={styles.fabTxtHpp}>Catat HPP</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.fabFull}>
          <Ionicons name="bar-chart" size={16} color={COLORS.gold} />
          <Text style={styles.fabTxtFull}>Lihat cashflow lengkap</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  scrollBody: { paddingHorizontal: 16, paddingBottom: 24 },
  
  // TOPBAR
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 16 },
  iconBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { fontSize: 15, fontWeight: '600', color: COLORS.t1 },
  topbarRight: { flexDirection: 'row', gap: 8 },

  // HERO
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  bizIcon: { width: 52, height: 52, borderRadius: 18, backgroundColor: 'rgba(245,200,66,0.12)', borderWidth: 1, borderColor: 'rgba(245,200,66,0.2)', alignItems: 'center', justifyContent: 'center' },
  bizName: { fontSize: 18, fontWeight: '600', color: COLORS.t1, marginBottom: 4 },
  bizMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  badgeAktif: { backgroundColor: 'rgba(45,212,164,0.12)' },
  badgeTxtAktif: { fontSize: 10, fontWeight: '600', color: COLORS.mint },
  badgeBiz: { backgroundColor: 'rgba(245,200,66,0.1)' },
  badgeTxtBiz: { fontSize: 10, fontWeight: '600', color: COLORS.gold },
  bizStartDate: { fontSize: 10, color: COLORS.t3 },

  // PERIOD ROW
  periodRow: { flexDirection: 'row', gap: 8, marginBottom: 16, paddingRight: 16 },
  periodChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  pcOn: { backgroundColor: COLORS.gold },
  pcOff: { backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd },
  periodTxt: { fontSize: 11, fontWeight: '500' },
  pcTxtOn: { color: COLORS.bg },
  pcTxtOff: { color: COLORS.t2 },

  // MAIN KPI
  mainKpi: { backgroundColor: COLORS.sf, borderWidth: 1, borderColor: COLORS.bd, borderRadius: 18, padding: 14, marginBottom: 12 },
  mkTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  mkLbl: { fontSize: 11, color: COLORS.t3, marginBottom: 4 },
  mkVal: { fontSize: 26, fontWeight: '600', color: COLORS.gold },
  mkSub: { fontSize: 11, color: COLORS.mint, marginTop: 4 },
  mkTrend: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(45,212,164,0.1)', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  mkTrendTxt: { fontSize: 11, color: COLORS.mint, fontWeight: '600' },
  
  hppFlow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  hppBlock: { flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 12, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  hppLbl: { fontSize: 10, color: COLORS.t3, marginBottom: 4 },
  hppVal: { fontSize: 13, fontWeight: '600' },
  hppArrow: { fontSize: 16, color: COLORS.t3, paddingHorizontal: 8 },

  marginBarRow: { marginTop: 4 },
  mbLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  mbLblTxt: { fontSize: 10, color: COLORS.t3 },
  mbTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' },
  mbFill: { height: '100%', backgroundColor: COLORS.gold, borderRadius: 3 },

  // SECONDARY KPI
  kpi2Grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 },
  kpi2: { width: '48.5%', backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd, borderRadius: 14, padding: 12, marginBottom: 8 },
  kpi2LblWrap: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  kpi2Lbl: { fontSize: 10, color: COLORS.t3 },
  kpi2Val: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  kpi2Sub: { fontSize: 10, color: COLORS.t3 },

  // CHART AREA
  chartArea: { backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd, borderRadius: 16, padding: 14, marginBottom: 12 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  chartTitle: { fontSize: 12, fontWeight: '600', color: COLORS.t1 },
  chartLegend: { flexDirection: 'row', gap: 10 },
  legItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legDot: { width: 8, height: 8, borderRadius: 4 },
  legTxt: { fontSize: 10, color: COLORS.t3 },
  barChartWrap: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 80, marginBottom: 8, paddingHorizontal: 4 },
  barGroup: { width: '20%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 4 },
  barGroupActive: { borderWidth: 1, borderColor: 'rgba(245,200,66,0.3)', borderRadius: 6, paddingVertical: 2, backgroundColor: 'rgba(245,200,66,0.05)' },
  bar: { width: 12, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  barLabelsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 },
  barLbl: { fontSize: 10, color: COLORS.t3, width: '20%', textAlign: 'center' },

  // STOK AREA
  stokCard: { backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd, borderRadius: 16, marginBottom: 12 },
  stokHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderBottomWidth: 1, borderBottomColor: '#1A2D47' },
  stokTitle: { fontSize: 12, fontWeight: '600', color: COLORS.t1 },
  stokAdd: { fontSize: 11, color: COLORS.violet, fontWeight: '500' },
  stokRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#1A2D47' },
  stokColor: { width: 4, height: 36, borderRadius: 2, marginRight: 12 },
  stokInfo: { flex: 1 },
  stokName: { fontSize: 12, fontWeight: '600', color: COLORS.t1, marginBottom: 2 },
  stokDetail: { fontSize: 10, color: COLORS.t3 },
  stokRight: { alignItems: 'flex-end' },
  stokQty: { fontSize: 12, fontWeight: '600', color: COLORS.t1, marginBottom: 2 },
  stokStatus: { fontSize: 10, fontWeight: '500' },

  // NOTES
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, marginTop: 4 },
  secLbl: { fontSize: 11, color: COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: '500' },
  secLink: { fontSize: 11, color: COLORS.violet, fontWeight: '500' },
  noteCard: { backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd, borderRadius: 14, padding: 14, marginBottom: 16 },
  noteItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 10 },
  noteDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  noteTxt: { flex: 1, fontSize: 12, color: COLORS.t2, lineHeight: 18 },

  // FAB ACTIONS
  fabRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  fabBtn: { flex: 1, height: 48, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  fabOmset: { backgroundColor: COLORS.mint },
  fabTxtOmset: { fontSize: 13, fontWeight: '600', color: COLORS.bg },
  fabHpp: { backgroundColor: 'rgba(255,107,107,0.1)', borderWidth: 1, borderColor: 'rgba(255,107,107,0.3)' },
  fabTxtHpp: { fontSize: 13, fontWeight: '600', color: '#FF9090' },
  fabFull: { width: '100%', height: 48, borderRadius: 14, backgroundColor: 'rgba(245,200,66,0.1)', borderWidth: 1, borderColor: 'rgba(245,200,66,0.3)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  fabTxtFull: { fontSize: 13, fontWeight: '600', color: COLORS.gold }
});
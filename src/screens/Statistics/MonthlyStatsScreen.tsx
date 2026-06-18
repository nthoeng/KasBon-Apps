import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UI_COLORS = {
  bg: '#0A1628', bg2: '#0F1E35', card: '#152238', card2: '#1A2A42',
  b1: 'rgba(255,255,255,0.07)', b2: 'rgba(255,255,255,0.14)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878'
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const MonthlyStatsScreen = () => {
  const navigation = useNavigation<any>();
  const [currentMonth, setCurrentMonth] = useState('Juni 2026');

  // Simulasi data trend bar
  const trendData = [
    { label: 'Jan', inc: 44, exp: 38 },
    { label: 'Feb', inc: 50, exp: 40 },
    { label: 'Mar', inc: 48, exp: 42 },
    { label: 'Apr', inc: 46, exp: 44 },
    { label: 'Mei', inc: 54, exp: 38 },
    { label: 'Jun', inc: 80, exp: 40, active: true },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <View>
          <Text style={styles.pageTitle}>Statistik</Text>
          <Text style={styles.pageSub}>Ringkasan keuangan keluarga</Text>
        </View>
        <View style={styles.topbarRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="download-outline" size={18} color={UI_COLORS.t2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="swap-horizontal" size={18} color={UI_COLORS.t2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* NAVIGASI BULAN */}
        <View style={styles.monthNav}>
          <TouchableOpacity style={styles.monthBtn}>
            <Ionicons name="chevron-back" size={16} color={UI_COLORS.t2} />
          </TouchableOpacity>
          <Text style={styles.monthTxt}>{currentMonth}</Text>
          <TouchableOpacity style={styles.monthBtn}>
            <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t2} />
          </TouchableOpacity>
        </View>

        {/* KPI CARDS (Masuk / Keluar) */}
        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <View style={styles.kpiTop}>
              <View style={[styles.kpiIcon, { backgroundColor: hexToRgba(UI_COLORS.mint, 0.12) }]}>
                <Ionicons name="arrow-down-outline" size={15} color={UI_COLORS.mint} />
              </View>
              <Text style={styles.kpiLbl}>Pemasukan</Text>
              <View style={[styles.kpiTrend, { backgroundColor: hexToRgba(UI_COLORS.mint, 0.12) }]}>
                <Text style={[styles.kpiTrendTxt, { color: UI_COLORS.mint }]}>+12%</Text>
              </View>
            </View>
            <Text style={[styles.kpiVal, { color: UI_COLORS.mint }]}>Rp 8,5jt</Text>
            <Text style={styles.kpiSub}>vs Rp 7,6jt Mei</Text>
          </View>
          
          <View style={styles.kpiCard}>
            <View style={styles.kpiTop}>
              <View style={[styles.kpiIcon, { backgroundColor: hexToRgba(UI_COLORS.red, 0.12) }]}>
                <Ionicons name="arrow-up-outline" size={15} color={UI_COLORS.red} />
              </View>
              <Text style={styles.kpiLbl}>Pengeluaran</Text>
              <View style={[styles.kpiTrend, { backgroundColor: hexToRgba(UI_COLORS.mint, 0.12) }]}>
                <Text style={[styles.kpiTrendTxt, { color: UI_COLORS.mint }]}>-5%</Text>
              </View>
            </View>
            <Text style={[styles.kpiVal, { color: UI_COLORS.red }]}>Rp 4,25jt</Text>
            <Text style={styles.kpiSub}>vs Rp 4,5jt Mei</Text>
          </View>
        </View>

        {/* KPI ARUS KAS BERSIH */}
        <View style={styles.kpiFull}>
          <View style={styles.netRow}>
            <View>
              <Text style={styles.netLbl}>Arus kas bersih</Text>
              <Text style={styles.netVal}>+Rp 4.250.000</Text>
              <Text style={styles.netSub}>50% dari pemasukan berhasil ditabung</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.netLbl}>Rasio hemat</Text>
              <Text style={styles.netValRatio}>50%</Text>
              <Text style={styles.netSubTrend}>↑ dari 41% Mei</Text>
            </View>
          </View>
          <View style={styles.netBar}>
            <View style={[styles.nbIncome, { width: '67%' }]} />
            <View style={[styles.nbExpense, { width: '33%' }]} />
          </View>
          <View style={styles.nbLabels}>
            <Text style={{ color: UI_COLORS.mint }}>Rp 8,5jt pemasukan</Text>
            <Text style={{ color: UI_COLORS.red }}>Rp 4,25jt keluar</Text>
          </View>
        </View>

        {/* SECTION: TREN 6 BULAN */}
        <View style={styles.section}>
          <View style={styles.secHeader}>
            <Text style={styles.secTitle}>Tren 6 bulan terakhir</Text>
            <TouchableOpacity><Text style={styles.secLink}>Lihat semua ↗</Text></TouchableOpacity>
          </View>
          <View style={styles.chartArea}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Pemasukan vs pengeluaran</Text>
              <View style={styles.legend}>
                <View style={styles.leg}><View style={[styles.legDot, { backgroundColor: UI_COLORS.mint }]} /><Text style={styles.legTxt}>Masuk</Text></View>
                <View style={styles.leg}><View style={[styles.legDot, { backgroundColor: UI_COLORS.red }]} /><Text style={styles.legTxt}>Keluar</Text></View>
              </View>
            </View>
            
            {/* STATIC BAR CHART SIMULATION */}
            <View style={styles.barsArea}>
              {trendData.map((data, index) => (
                <View key={index} style={styles.barGrp}>
                  <View style={[
                    styles.barBase, 
                    { height: data.inc, backgroundColor: data.active ? UI_COLORS.mint : hexToRgba(UI_COLORS.mint, 0.5) },
                    data.active && styles.barActive
                  ]} />
                  <View style={[
                    styles.barBase, 
                    { height: data.exp, backgroundColor: data.active ? UI_COLORS.red : hexToRgba(UI_COLORS.red, 0.5) },
                    data.active && styles.barActive
                  ]} />
                </View>
              ))}
            </View>
            <View style={styles.barXLblArea}>
              {trendData.map((data, index) => (
                <Text key={index} style={[styles.bxlTxt, data.active && styles.bxlActive]}>{data.label}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* SECTION: BREAKDOWN PENGELUARAN */}
        <View style={styles.section}>
          <View style={styles.secHeader}>
            <Text style={styles.secTitle}>Breakdown pengeluaran</Text>
            <Text style={{ fontSize: 11, color: UI_COLORS.t3 }}>Total Rp 4.255.000</Text>
          </View>
          
          <View style={[styles.chartArea, { paddingBottom: 8 }]}>
            {/* Item 1 */}
            <View style={styles.catItem}>
              <View style={[styles.catColorBar, { backgroundColor: UI_COLORS.gold }]} />
              <View style={[styles.catIconWrap, { backgroundColor: hexToRgba(UI_COLORS.gold, 0.1) }]}><Ionicons name="fast-food" size={17} color={UI_COLORS.gold} /></View>
              <View style={styles.catInfo}>
                <Text style={styles.catName}>Makan & minum</Text>
                <View style={styles.catBarTrack}><View style={[styles.catBarFill, { width: '28%', backgroundColor: UI_COLORS.gold }]} /></View>
              </View>
              <View style={styles.catRight}>
                <Text style={[styles.catAmt, { color: UI_COLORS.gold }]}>Rp 1,17jt</Text>
                <Text style={styles.catPct}>27,5%</Text>
              </View>
            </View>
            
            {/* Item 2 */}
            <View style={styles.catItem}>
              <View style={[styles.catColorBar, { backgroundColor: UI_COLORS.violet }]} />
              <View style={[styles.catIconWrap, { backgroundColor: hexToRgba(UI_COLORS.violet, 0.1) }]}><Ionicons name="flash" size={17} color={UI_COLORS.violet} /></View>
              <View style={styles.catInfo}>
                <Text style={styles.catName}>Tagihan & utilitas</Text>
                <View style={styles.catBarTrack}><View style={[styles.catBarFill, { width: '19%', backgroundColor: UI_COLORS.violet }]} /></View>
              </View>
              <View style={styles.catRight}>
                <Text style={[styles.catAmt, { color: UI_COLORS.violet }]}>Rp 785rb</Text>
                <Text style={styles.catPct}>18,5%</Text>
              </View>
            </View>
            
            {/* Item 3 */}
            <View style={[styles.catItem, { borderBottomWidth: 0 }]}>
              <View style={[styles.catColorBar, { backgroundColor: UI_COLORS.red }]} />
              <View style={[styles.catIconWrap, { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) }]}><Ionicons name="bicycle" size={17} color={UI_COLORS.red} /></View>
              <View style={styles.catInfo}>
                <Text style={styles.catName}>Cicilan motor</Text>
                <View style={styles.catBarTrack}><View style={[styles.catBarFill, { width: '19%', backgroundColor: UI_COLORS.red }]} /></View>
              </View>
              <View style={styles.catRight}>
                <Text style={[styles.catAmt, { color: UI_COLORS.red }]}>Rp 800rb</Text>
                <Text style={styles.catPct}>18,8%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION: INSIGHT */}
        <View style={styles.section}>
          <View style={styles.secHeader}>
            <Text style={styles.secTitle}>Insight bulan ini</Text>
          </View>
          <View style={styles.insightCard}>
            <View style={styles.insRow}>
              <View style={[styles.insIcon, { backgroundColor: hexToRgba(UI_COLORS.mint, 0.12) }]}><Ionicons name="trending-down" size={15} color={UI_COLORS.mint} /></View>
              <Text style={styles.insTxt}>Pengeluaran makan turun <Text style={styles.insTxtBold}>18% dibanding Mei</Text> — hemat Rp 257rb. Pertahankan!</Text>
            </View>
            <View style={styles.insRow}>
              <View style={[styles.insIcon, { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) }]}><Ionicons name="warning" size={15} color={UI_COLORS.red} /></View>
              <Text style={styles.insTxt}>Belanja naik <Text style={styles.insTxtBold}>24% dari bulan lalu</Text> — Rp 420rb dari budget Rp 500rb sudah terpakai.</Text>
            </View>
            <View style={[styles.insRow, { marginBottom: 0 }]}>
              <View style={[styles.insIcon, { backgroundColor: hexToRgba(UI_COLORS.gold, 0.1) }]}><Ionicons name="trophy" size={15} color={UI_COLORS.gold} /></View>
              <Text style={styles.insTxt}>Rasio tabungan <Text style={styles.insTxtBold}>50%</Text> — terbaik sejak Januari! Setengah pendapatan berhasil disimpan.</Text>
            </View>
          </View>
        </View>

        {/* EXPORT BUTTON */}
        <TouchableOpacity style={styles.exportBtn}>
          <Ionicons name="document-text" size={16} color={UI_COLORS.t2} />
          <Text style={styles.exportBtnTxt}>Export laporan PDF / CSV</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollBody: { paddingBottom: 20 },
  
  // TOPBAR
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 8 },
  pageTitle: { fontSize: 17, fontWeight: '600', color: UI_COLORS.text },
  pageSub: { fontSize: 11, color: UI_COLORS.t3, marginTop: 2 },
  topbarRight: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },

  // MONTH NAV
  monthNav: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 12, paddingVertical: 5, paddingHorizontal: 14, marginHorizontal: 18, marginBottom: 14 },
  monthBtn: { width: 28, height: 28, borderRadius: 8, backgroundColor: UI_COLORS.card2, alignItems: 'center', justifyContent: 'center' },
  monthTxt: { flex: 1, textAlign: 'center', fontSize: 13, fontWeight: '600', color: UI_COLORS.text },

  // KPI ROWS
  kpiRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 10 },
  kpiCard: { flex: 1, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, padding: 13 },
  kpiTop: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 8 },
  kpiIcon: { width: 28, height: 28, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  kpiLbl: { flex: 1, fontSize: 11, color: UI_COLORS.t2 },
  kpiTrend: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 20 },
  kpiTrendTxt: { fontSize: 10, fontWeight: '600' },
  kpiVal: { fontSize: 18, fontWeight: '600', marginBottom: 2 },
  kpiSub: { fontSize: 10, color: UI_COLORS.t3 },

  // KPI FULL (NET FLOW)
  kpiFull: { backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, padding: 14, marginHorizontal: 16, marginBottom: 14 },
  netRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  netLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 4 },
  netVal: { fontSize: 22, fontWeight: '600', color: UI_COLORS.mint },
  netSub: { fontSize: 11, color: UI_COLORS.t3, marginTop: 4 },
  netValRatio: { fontSize: 22, fontWeight: '600', color: UI_COLORS.gold },
  netSubTrend: { fontSize: 10, color: UI_COLORS.mint, marginTop: 4 },
  netBar: { flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden', marginTop: 12, gap: 2 },
  nbIncome: { backgroundColor: UI_COLORS.mint, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 },
  nbExpense: { backgroundColor: UI_COLORS.red, borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  nbLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, fontSize: 10, fontWeight: '500' },

  // SECTION GENERAL
  section: { paddingHorizontal: 16, marginBottom: 14 },
  secHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  secTitle: { fontSize: 13, fontWeight: '600', color: UI_COLORS.text },
  secLink: { fontSize: 11, color: UI_COLORS.violet, fontWeight: '500' },
  chartArea: { backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, padding: 14 },

  // CHART TREN
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  chartTitle: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text },
  legend: { flexDirection: 'row', gap: 10 },
  leg: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legDot: { width: 8, height: 8, borderRadius: 4 },
  legTxt: { fontSize: 10, color: UI_COLORS.t2 },
  
  barsArea: { flexDirection: 'row', alignItems: 'flex-end', height: 80, gap: 5, marginBottom: 8 },
  barGrp: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: 2, justifyContent: 'center' },
  barBase: { width: 12, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  barActive: { borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)' },
  
  barXLblArea: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
  bxlTxt: { flex: 1, textAlign: 'center', fontSize: 10, color: UI_COLORS.t3 },
  bxlActive: { color: UI_COLORS.gold, fontWeight: '600' },

  // BREAKDOWN
  catItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  catColorBar: { width: 4, height: 36, borderRadius: 2 },
  catIconWrap: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  catInfo: { flex: 1 },
  catName: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text, marginBottom: 4 },
  catBarTrack: { height: 4, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' },
  catBarFill: { height: 4, borderRadius: 2 },
  catRight: { alignItems: 'flex-end' },
  catAmt: { fontSize: 13, fontWeight: '600' },
  catPct: { fontSize: 10, color: UI_COLORS.t3, marginTop: 2 },

  // INSIGHT CARD
  insightCard: { backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: 'rgba(124,111,247,0.25)', borderRadius: 14, padding: 14 },
  insRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', marginBottom: 10 },
  insIcon: { width: 28, height: 28, borderRadius: 9, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  insTxt: { flex: 1, fontSize: 12, color: UI_COLORS.t2, lineHeight: 18 },
  insTxtBold: { color: UI_COLORS.text, fontWeight: '600' },

  // EXPORT BUTTON
  exportBtn: { marginHorizontal: 16, marginBottom: 14, height: 44, borderRadius: 14, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  exportBtnTxt: { fontSize: 13, fontWeight: '500', color: UI_COLORS.t2 }
});
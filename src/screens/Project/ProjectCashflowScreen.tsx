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

export const ProjectCashflowScreen = () => {
  const navigation = useNavigation<any>();
  
  const [activeTab, setActiveTab] = useState('Bulan ini');
  const [activeFilter, setActiveFilter] = useState('Semua');

  const tabs = ['Minggu ini', 'Bulan ini', 'Semua waktu', 'Custom'];
  const filters = ['Semua', 'Pemasukan', 'Biaya operasional', 'Pembayaran client'];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Cashflow project</Text>
        <View style={styles.topbarRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="download-outline" size={16} color={UI_COLORS.t2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="options-outline" size={16} color={UI_COLORS.t2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* PROJECT HEADER */}
        <View style={styles.projectHeader}>
          <View style={[styles.phIcon, { backgroundColor: hexToRgba(UI_COLORS.mint, 0.12) }]}>
            <Ionicons name="code-slash" size={20} color={UI_COLORS.mint} />
          </View>
          <View style={styles.phInfo}>
            <Text style={styles.phName}>Web Company Profile</Text>
            <Text style={styles.phMeta}>ID: PRJ-001</Text>
            <Text style={styles.phMeta}>PT Maju Jaya · deadline 30 Jun 2026</Text>
          </View>
          <View style={styles.phSaldo}>
            <Text style={styles.phAmt}>Rp 2.900.000</Text>
            <Text style={styles.phLbl}>laba bersih</Text>
          </View>
        </View>

        {/* PERIOD TABS */}
        <View style={styles.periodTabs}>
          {tabs.map((tab) => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.pt, activeTab === tab ? styles.ptOn : styles.ptOff]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.ptTxt, activeTab === tab ? styles.ptTxtOn : styles.ptTxtOff]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SUMMARY CARD */}
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
          
          <View style={styles.scBarContainer}>
            <View style={[styles.scBarFill, { width: '81%', backgroundColor: UI_COLORS.mint, borderTopLeftRadius: 3, borderBottomLeftRadius: 3 }]} />
            <View style={[styles.scBarFill, { width: '19%', backgroundColor: UI_COLORS.red, borderTopRightRadius: 3, borderBottomRightRadius: 3 }]} />
          </View>
          
          <View style={styles.scMiniGrid}>
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

        {/* CHART AREA */}
        <View style={styles.chartArea}>
          <View style={styles.caHeader}>
            <Text style={styles.caTitle}>Pemasukan vs biaya per minggu</Text>
            <View style={styles.legend}>
              <View style={styles.leg}><View style={[styles.legDot, { backgroundColor: UI_COLORS.mint }]} /><Text style={styles.legTxt}>Masuk</Text></View>
              <View style={styles.leg}><View style={[styles.legDot, { backgroundColor: UI_COLORS.red }]} /><Text style={styles.legTxt}>Biaya</Text></View>
            </View>
          </View>
          
          <View style={styles.weekBars}>
            <View style={styles.wbGrp}>
              <View style={[styles.wb, { height: 54, backgroundColor: hexToRgba(UI_COLORS.mint, 0.7) }]} />
              <View style={[styles.wb, { height: 14, backgroundColor: hexToRgba(UI_COLORS.red, 0.6) }]} />
            </View>
            <View style={styles.wbGrp}>
              <View style={[styles.wb, { height: 0, backgroundColor: hexToRgba(UI_COLORS.mint, 0.4) }]} />
              <View style={[styles.wb, { height: 8, backgroundColor: hexToRgba(UI_COLORS.red, 0.5) }]} />
            </View>
            <View style={styles.wbGrp}>
              <View style={[styles.wb, { height: 0, backgroundColor: hexToRgba(UI_COLORS.mint, 0.4) }]} />
              <View style={[styles.wb, { height: 18, backgroundColor: hexToRgba(UI_COLORS.red, 0.6) }]} />
            </View>
            <View style={[styles.wbGrp, styles.wbGrpActive]}>
              <View style={[styles.wb, { height: 0, backgroundColor: hexToRgba(UI_COLORS.mint, 0.4) }]} />
              <View style={[styles.wb, { height: 12, backgroundColor: UI_COLORS.red }]} />
            </View>
          </View>
          
          <View style={styles.wbLbl}>
            <Text style={styles.wbl}>Mgg 1</Text>
            <Text style={styles.wbl}>Mgg 2</Text>
            <Text style={styles.wbl}>Mgg 3</Text>
            <Text style={[styles.wbl, styles.wblNow]}>Mgg 4</Text>
          </View>
        </View>

        {/* FILTER ROW */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {filters.map((f) => (
            <TouchableOpacity 
              key={f} 
              style={[styles.fc, activeFilter === f ? styles.fcOn : styles.fcOff]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.fcTxt, activeFilter === f ? styles.fcTxtOn : styles.fcTxtOff]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* TIMELINE TRANSAKSI */}
        {/* Day 1 */}
        <View style={styles.dayLbl}>
          <Text style={styles.dlTxt}>11 Juni 2026</Text>
          <View style={styles.dlLine} />
          <Text style={[styles.dlNet, { color: UI_COLORS.red }]}>-Rp 400rb</Text>
        </View>
        <View style={styles.txGroup}>
          <TouchableOpacity style={[styles.txItem, { borderBottomWidth: 0 }]} onPress={() => navigation.navigate('TransactionDetail')}>
            <View style={[styles.txIcon, { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) }]}><Ionicons name="hardware-chip-outline" size={17} color={UI_COLORS.red} /></View>
            <View style={styles.txInfo}>
              <Text style={styles.txName} numberOfLines={1}>Plugin premium Elementor</Text>
              <Text style={styles.txMeta}>Biaya operasional</Text>
              <View style={styles.tagOp}><Text style={styles.tagOpTxt}>Biaya</Text></View>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmt, { color: UI_COLORS.red }]}>-Rp 400.000</Text>
              <Text style={styles.txTime}>15:30</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Day 2 */}
        <View style={styles.dayLbl}>
          <Text style={styles.dlTxt}>5 Juni 2026</Text>
          <View style={styles.dlLine} />
          <Text style={[styles.dlNet, { color: UI_COLORS.mint }]}>+Rp 3,3jt</Text>
        </View>
        <View style={styles.txGroup}>
          <TouchableOpacity style={styles.txItem} onPress={() => navigation.navigate('TransactionDetail')}>
            <View style={[styles.txIcon, { backgroundColor: hexToRgba(UI_COLORS.mint, 0.1) }]}><Ionicons name="cash-outline" size={17} color={UI_COLORS.mint} /></View>
            <View style={styles.txInfo}>
              <Text style={styles.txName} numberOfLines={1}>DP 50% dari PT Maju Jaya</Text>
              <Text style={styles.txMeta}>Pembayaran client</Text>
              <View style={styles.tagDp}><Text style={styles.tagDpTxt}>DP 50%</Text></View>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmt, { color: UI_COLORS.mint }]}>+Rp 3.750.000</Text>
              <Text style={styles.txTime}>10:15</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.txItem, { borderBottomWidth: 0 }]} onPress={() => navigation.navigate('TransactionDetail')}>
            <View style={[styles.txIcon, { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) }]}><Ionicons name="globe-outline" size={17} color={UI_COLORS.red} /></View>
            <View style={styles.txInfo}>
              <Text style={styles.txName} numberOfLines={1}>Beli domain + hosting 1 tahun</Text>
              <Text style={styles.txMeta}>Biaya operasional</Text>
              <View style={styles.tagOp}><Text style={styles.tagOpTxt}>Biaya</Text></View>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmt, { color: UI_COLORS.red }]}>-Rp 450.000</Text>
              <Text style={styles.txTime}>11:00</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Day 3 */}
        <View style={styles.dayLbl}>
          <Text style={styles.dlTxt}>3 Juni 2026</Text>
          <View style={styles.dlLine} />
          <Text style={[styles.dlNet, { color: UI_COLORS.red }]}>-Rp 180rb</Text>
        </View>
        <View style={styles.txGroup}>
          <TouchableOpacity style={[styles.txItem, { borderBottomWidth: 0 }]} onPress={() => navigation.navigate('TransactionDetail')}>
            <View style={[styles.txIcon, { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) }]}><Ionicons name="laptop-outline" size={17} color={UI_COLORS.red} /></View>
            <View style={styles.txInfo}>
              <Text style={styles.txName} numberOfLines={1}>Langganan Figma 1 bulan</Text>
              <Text style={styles.txMeta}>Biaya operasional · alat kerja</Text>
              <View style={styles.tagOp}><Text style={styles.tagOpTxt}>Biaya</Text></View>
            </View>
            <View style={styles.txRight}>
              <Text style={[styles.txAmt, { color: UI_COLORS.red }]}>-Rp 180.000</Text>
              <Text style={styles.txTime}>09:00</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* PENDING INVOICE CARD */}
        <View style={styles.pendingCard}>
          <View style={styles.pcTop}>
            <Ionicons name="receipt-outline" size={16} color={UI_COLORS.mint} />
            <Text style={styles.pcTitle}>Invoice pending — belum terbayar</Text>
          </View>
          <View style={styles.pcBody}>
            <View style={{ flex: 1 }}>
              <Text style={styles.pcName}>Pelunasan 50% PT Maju Jaya</Text>
              <Text style={styles.pcMeta}>Estimasi saat serah terima · 30 Jun 2026</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.pcAmt}>Rp 3.750.000</Text>
              <Text style={styles.pcStatus}>belum diterima</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* FAB BOTTOM BAR (Fixed position) */}
      <View style={styles.fabRow}>
        <TouchableOpacity style={styles.fabIn}>
          <Ionicons name="arrow-down" size={17} color="#0A1628" />
          <Text style={styles.fabInTxt}>Catat pemasukan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fabOp}>
          <Ionicons name="arrow-up" size={17} color="#FF9090" />
          <Text style={styles.fabOpTxt}>Catat biaya</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollBody: { paddingBottom: 60 }, // Extra padding for FAB
  
  // TOPBAR
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  backBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 14, fontWeight: '500', color: UI_COLORS.text },
  topbarRight: { flexDirection: 'row', gap: 7 },
  iconBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },

  // PROJECT HEADER
  projectHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 18, paddingVertical: 12 },
  phIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  phInfo: { flex: 1 },
  phName: { fontSize: 14, fontWeight: '500', color: UI_COLORS.text, marginBottom: 2 },
  phMeta: { fontSize: 11, color: UI_COLORS.t3 },
  phSaldo: { alignItems: 'flex-end' },
  phAmt: { fontSize: 16, fontWeight: '600', color: UI_COLORS.mint },
  phLbl: { fontSize: 10, color: UI_COLORS.t3, marginTop: 1 },

  // PERIOD TABS
  periodTabs: { flexDirection: 'row', backgroundColor: UI_COLORS.card2, borderRadius: 12, padding: 3, marginHorizontal: 18, marginBottom: 12 },
  pt: { flex: 1, height: 30, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  ptOn: { backgroundColor: UI_COLORS.mint },
  ptOff: { backgroundColor: 'transparent' },
  ptTxt: { fontSize: 11, fontWeight: '500' },
  ptTxtOn: { color: UI_COLORS.bg },
  ptTxtOff: { color: UI_COLORS.t3 },

  // SUMMARY CARD
  summaryCard: { marginHorizontal: 16, marginBottom: 12, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, padding: 13 },
  scTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  scLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 3 },
  scVal: { fontSize: 20, fontWeight: '600' },
  scSub: { fontSize: 11, color: UI_COLORS.t3, marginTop: 2 },
  scBarContainer: { height: 5, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, flexDirection: 'row', overflow: 'hidden', marginBottom: 12 },
  scBarFill: { height: '100%' },
  scMiniGrid: { flexDirection: 'row', gap: 8 },
  scm: { flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 8, alignItems: 'center', borderWidth: 0.5, borderColor: UI_COLORS.b1 },
  scmLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 2 },
  scmVal: { fontSize: 12, fontWeight: '600' },

  // CHART AREA
  chartArea: { marginHorizontal: 16, marginBottom: 12, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12 },
  caHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  caTitle: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text },
  legend: { flexDirection: 'row', gap: 10 },
  leg: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legDot: { width: 7, height: 7, borderRadius: 3.5 },
  legTxt: { fontSize: 10, color: UI_COLORS.t2 },
  weekBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 5, height: 60, marginBottom: 6 },
  wbGrp: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 2 },
  wbGrpActive: { borderWidth: 0.5, borderColor: 'rgba(245,200,66,0.3)', borderRadius: 4, padding: 2 },
  wb: { width: 14, borderTopLeftRadius: 2, borderTopRightRadius: 2 },
  wbLbl: { flexDirection: 'row', justifyContent: 'space-between' },
  wbl: { flex: 1, textAlign: 'center', fontSize: 10, color: UI_COLORS.t3 },
  wblNow: { color: UI_COLORS.gold, fontWeight: '600' },

  // FILTER ROW
  filterRow: { paddingHorizontal: 18, paddingBottom: 10, gap: 7 },
  fc: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 0.5 },
  fcOn: { backgroundColor: UI_COLORS.mint, borderColor: UI_COLORS.mint },
  fcOff: { backgroundColor: UI_COLORS.card, borderColor: UI_COLORS.b2 },
  fcTxt: { fontSize: 11, fontWeight: '500' },
  fcTxtOn: { color: UI_COLORS.bg },
  fcTxtOff: { color: UI_COLORS.t2 },

  // TX TIMELINE
  dayLbl: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 18, paddingTop: 8, paddingBottom: 6 },
  dlTxt: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase' },
  dlLine: { flex: 1, height: 0.5, backgroundColor: UI_COLORS.b1 },
  dlNet: { fontSize: 11, fontWeight: '600' },
  
  txGroup: { backgroundColor: UI_COLORS.card, marginHorizontal: 16, borderRadius: 14, overflow: 'hidden', marginBottom: 8 },
  txItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  txIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  txInfo: { flex: 1 },
  txName: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text, marginBottom: 2 },
  txMeta: { fontSize: 11, color: UI_COLORS.t3 },
  
  tagOp: { backgroundColor: hexToRgba(UI_COLORS.red, 0.1), alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 20, marginTop: 4 },
  tagOpTxt: { fontSize: 9, fontWeight: '600', color: '#FF9090' },
  tagDp: { backgroundColor: hexToRgba(UI_COLORS.gold, 0.1), alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 20, marginTop: 4 },
  tagDpTxt: { fontSize: 9, fontWeight: '600', color: UI_COLORS.gold },
  
  txRight: { alignItems: 'flex-end' },
  txAmt: { fontSize: 13, fontWeight: '600' },
  txTime: { fontSize: 10, color: UI_COLORS.t3, marginTop: 2 },

  // PENDING CARD
  pendingCard: { marginHorizontal: 16, marginTop: 4, marginBottom: 10, backgroundColor: hexToRgba(UI_COLORS.mint, 0.06), borderWidth: 0.5, borderColor: hexToRgba(UI_COLORS.mint, 0.2), borderRadius: 14, padding: 12 },
  pcTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  pcTitle: { fontSize: 12, fontWeight: '600', color: UI_COLORS.mint },
  pcBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pcName: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text },
  pcMeta: { fontSize: 11, color: UI_COLORS.t3, marginTop: 2 },
  pcAmt: { fontSize: 14, fontWeight: '600', color: UI_COLORS.gold },
  pcStatus: { fontSize: 10, color: UI_COLORS.t3, marginTop: 1 },

  // FAB ROW
  fabRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10, backgroundColor: UI_COLORS.bg2, borderTopWidth: 0.5, borderTopColor: UI_COLORS.b1 },
  fabIn: { flex: 1, height: 44, borderRadius: 13, backgroundColor: UI_COLORS.mint, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  fabInTxt: { fontSize: 12, fontWeight: '600', color: UI_COLORS.bg },
  fabOp: { flex: 1, height: 44, borderRadius: 13, backgroundColor: hexToRgba(UI_COLORS.red, 0.1), borderWidth: 0.5, borderColor: hexToRgba(UI_COLORS.red, 0.25), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  fabOpTxt: { fontSize: 12, fontWeight: '600', color: '#FF9090' }
});
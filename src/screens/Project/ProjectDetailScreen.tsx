import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
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

export const ProjectDetailScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <View style={styles.topbarCenter}>
          <Text style={styles.pageTitle}>Detail project</Text>
        </View>
        <View style={styles.topbarActions}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="download-outline" size={16} color={UI_COLORS.t2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="ellipsis-horizontal" size={16} color={UI_COLORS.t2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION */}
        <View style={styles.heroTop}>
          <View style={styles.heroIcon}>
            <Ionicons name="code-slash" size={24} color={UI_COLORS.mint} />
          </View>
          <View style={styles.heroInfo}>
            <Text style={styles.heroName}>Web Company Profile</Text>
            <View style={styles.heroMeta}>
              <View style={[styles.badge, styles.badgeAktif]}><Text style={styles.badgeTxtAktif}>Aktif</Text></View>
              <View style={[styles.badge, styles.badgeProj]}><Text style={styles.badgeTxtProj}>Freelance</Text></View>
              <Text style={styles.clientName}>PT Maju Jaya</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.actBtn}>
            <Ionicons name="pencil" size={15} color={UI_COLORS.t2} />
          </TouchableOpacity>
        </View>

        {/* PROGRESS CARD */}
        <View style={styles.progressCard}>
          <View style={styles.progHeader}>
            <Text style={styles.progTitle}>Progress pengerjaan</Text>
            <View style={styles.deadlineChip}>
              <Ionicons name="calendar" size={12} color={UI_COLORS.gold} />
              <Text style={styles.deadlineTxt}>Deadline 30 Jun · 19 hari lagi</Text>
            </View>
          </View>
          
          <View style={styles.progBarTrack}>
            <View style={[styles.progBarFill, { width: '50%' }]} />
          </View>
          <View style={styles.progLabels}>
            <Text style={styles.progLabelLeft}>50% selesai</Text>
            <Text style={styles.progLabelRight}>estimasi on track</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.milestoneRow}>
            <View style={styles.ms}>
              <View style={[styles.msDot, styles.msDone]}><Ionicons name="checkmark" size={12} color={UI_COLORS.bg} /></View>
              <Text style={[styles.msLbl, styles.msLblDone]}>Kickoff</Text>
            </View>
            <View style={[styles.msLine, styles.msLineDone]} />
            
            <View style={styles.ms}>
              <View style={[styles.msDot, styles.msDone]}><Ionicons name="checkmark" size={12} color={UI_COLORS.bg} /></View>
              <Text style={[styles.msLbl, styles.msLblDone]}>Desain</Text>
            </View>
            <View style={[styles.msLine, styles.msLineDone]} />
            
            <View style={styles.ms}>
              <View style={[styles.msDot, styles.msActive]}><Ionicons name="code-slash" size={11} color="#FFF" /></View>
              <Text style={[styles.msLbl, styles.msLblActive]}>Dev</Text>
            </View>
            <View style={styles.msLine} />
            
            <View style={styles.ms}>
              <View style={[styles.msDot, styles.msIdle]} />
              <Text style={styles.msLbl}>Testing</Text>
            </View>
            <View style={styles.msLine} />
            
            <View style={styles.ms}>
              <View style={[styles.msDot, styles.msIdle]} />
              <Text style={styles.msLbl}>Launch</Text>
            </View>
          </ScrollView>
        </View>

        {/* KPI GRID */}
        <View style={styles.kpiGrid}>
          <View style={styles.kpi}>
            <View style={styles.kpiLblRow}>
              <Ionicons name="document-text" size={13} color={UI_COLORS.mint} />
              <Text style={styles.kpiLbl}>Nilai kontrak</Text>
            </View>
            <Text style={[styles.kpiVal, { color: UI_COLORS.text }]}>Rp 7.500.000</Text>
            <Text style={styles.kpiSub}>total proyek</Text>
          </View>
          
          <View style={styles.kpi}>
            <View style={styles.kpiLblRow}>
              <Ionicons name="cash" size={13} color={UI_COLORS.mint} />
              <Text style={styles.kpiLbl}>Diterima</Text>
            </View>
            <Text style={[styles.kpiVal, { color: UI_COLORS.mint }]}>Rp 3.750.000</Text>
            <Text style={styles.kpiSub}>DP 50% lunas</Text>
          </View>
          
          <View style={styles.kpi}>
            <View style={styles.kpiLblRow}>
              <Ionicons name="receipt" size={13} color={UI_COLORS.red} />
              <Text style={styles.kpiLbl}>Biaya operasional</Text>
            </View>
            <Text style={[styles.kpiVal, { color: UI_COLORS.red }]}>Rp 850.000</Text>
            <Text style={styles.kpiSub}>domain, hosting, tools</Text>
          </View>
          
          <View style={styles.kpi}>
            <View style={styles.kpiLblRow}>
              <Ionicons name="trending-up" size={13} color={UI_COLORS.gold} />
              <Text style={styles.kpiLbl}>Laba bersih</Text>
            </View>
            <Text style={[styles.kpiVal, { color: UI_COLORS.gold }]}>Rp 2.900.000</Text>
            <Text style={styles.kpiSub}>dari yang diterima</Text>
          </View>
        </View>

        {/* TAGIHAN CARD */}
        <View style={styles.tagihanCard}>
          <View style={styles.tgHeader}>
            <View style={styles.tgIcon}>
              <Ionicons name="document-text" size={16} color={UI_COLORS.gold} />
            </View>
            <View style={styles.tgInfo}>
              <Text style={styles.tgTitle}>Tagihan ke client</Text>
              <Text style={styles.tgSub}>PT Maju Jaya</Text>
            </View>
            <Text style={styles.tgPendingTxt}>Rp 3,75jt pending</Text>
          </View>
          
          <View style={styles.tgRow}>
            <View style={styles.trLblRow}>
              <Ionicons name="checkmark-circle" size={14} color={UI_COLORS.mint} />
              <Text style={styles.trLbl}>DP 50%</Text>
            </View>
            <View style={styles.trRight}>
              <Text style={[styles.trVal, { color: UI_COLORS.mint }]}>Rp 3.750.000</Text>
              <View style={[styles.trStatus, styles.stLunas]}><Text style={styles.stLunasTxt}>Lunas</Text></View>
            </View>
          </View>
          
          <View style={[styles.tgRow, { borderBottomWidth: 0 }]}>
            <View style={styles.trLblRow}>
              <Ionicons name="time" size={14} color={UI_COLORS.gold} />
              <Text style={styles.trLbl}>Pelunasan 50%</Text>
            </View>
            <View style={styles.trRight}>
              <Text style={[styles.trVal, { color: UI_COLORS.gold }]}>Rp 3.750.000</Text>
              <View style={[styles.trStatus, styles.stPending]}><Text style={styles.stPendingTxt}>Belum</Text></View>
            </View>
          </View>
          
          <View style={styles.tgFooter}>
            <Text style={styles.tgFooterTxt}>Pelunasan saat serah terima — estimasi 30 Jun 2026</Text>
          </View>
        </View>

        {/* CASHFLOW PROJECT */}
        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>Cashflow project</Text>
          <TouchableOpacity><Text style={styles.secLink}>Lihat semua ↗</Text></TouchableOpacity>
        </View>

        <View style={styles.txItem}>
          <View style={[styles.txIcon, { backgroundColor: hexToRgba(UI_COLORS.mint, 0.1) }]}>
            <Ionicons name="cash" size={17} color={UI_COLORS.mint} />
          </View>
          <View style={styles.txInfo}>
            <Text style={styles.txName} numberOfLines={1}>DP dari PT Maju Jaya</Text>
            <Text style={styles.txMeta}>Pemasukan · 1 Jun 2026</Text>
          </View>
          <Text style={[styles.txAmt, { color: UI_COLORS.mint }]}>+Rp 3,75jt</Text>
        </View>

        <View style={styles.txItem}>
          <View style={[styles.txIcon, { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) }]}>
            <Ionicons name="globe" size={17} color={UI_COLORS.red} />
          </View>
          <View style={styles.txInfo}>
            <Text style={styles.txName} numberOfLines={1}>Beli domain + hosting</Text>
            <Text style={styles.txMeta}>Biaya operasional · 3 Jun 2026</Text>
          </View>
          <Text style={[styles.txAmt, { color: UI_COLORS.red }]}>-Rp 450.000</Text>
        </View>

        <View style={styles.txItem}>
          <View style={[styles.txIcon, { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) }]}>
            <Ionicons name="extension-puzzle" size={17} color={UI_COLORS.red} />
          </View>
          <View style={styles.txInfo}>
            <Text style={styles.txName} numberOfLines={1}>Langganan plugin premium</Text>
            <Text style={styles.txMeta}>Biaya operasional · 5 Jun 2026</Text>
          </View>
          <Text style={[styles.txAmt, { color: UI_COLORS.red }]}>-Rp 400.000</Text>
        </View>

        {/* CATATAN OPERASIONAL */}
        <View style={[styles.secHeader, { marginTop: 6 }]}>
          <Text style={styles.secLbl}>Catatan operasional</Text>
          <TouchableOpacity><Text style={styles.secLink}>+ Tambah</Text></TouchableOpacity>
        </View>

        <View style={styles.noteCard}>
          <View style={styles.noteRow}>
            <View style={[styles.noteDot, { backgroundColor: UI_COLORS.mint }]} />
            <Text style={styles.noteTxt}>Desain mockup sudah disetujui client 7 Jun — revisi warna header</Text>
          </View>
          <View style={styles.noteRow}>
            <View style={[styles.noteDot, { backgroundColor: UI_COLORS.gold }]} />
            <Text style={styles.noteTxt}>Konten halaman About & Services masih menunggu dari client</Text>
          </View>
          <View style={[styles.noteRow, { marginBottom: 0 }]}>
            <View style={[styles.noteDot, { backgroundColor: UI_COLORS.red }]} />
            <Text style={styles.noteTxt}>Reminder: kirim invoice pelunasan saat serah terima</Text>
          </View>
        </View>

        {/* FAB ACTIONS */}
        <View style={styles.fabRow}>
          <TouchableOpacity style={[styles.fabBtn, styles.fabIncome]}>
            <Ionicons name="arrow-down" size={16} color={UI_COLORS.bg} />
            <Text style={[styles.fabBtnTxt, { color: UI_COLORS.bg }]}>Catat masuk</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.fabBtn, styles.fabExpense]}>
            <Ionicons name="arrow-up" size={16} color="#FF9090" />
            <Text style={[styles.fabBtnTxt, { color: '#FF9090' }]}>Catat biaya</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollBody: { paddingHorizontal: 16, paddingBottom: 20 },
  
  // TOPBAR
  topbar: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 16 },
  backBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  topbarCenter: { flex: 1, alignItems: 'center' },
  pageTitle: { fontSize: 15, fontWeight: '500', color: UI_COLORS.text },
  topbarActions: { flexDirection: 'row', gap: 7 },
  iconBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },

  // HERO
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  heroIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(45,212,164,0.12)', alignItems: 'center', justifyContent: 'center' },
  heroInfo: { flex: 1 },
  heroName: { fontSize: 17, fontWeight: '600', color: UI_COLORS.text, marginBottom: 4 },
  heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  badgeAktif: { backgroundColor: 'rgba(45,212,164,0.12)' },
  badgeTxtAktif: { fontSize: 9, fontWeight: '600', color: UI_COLORS.mint },
  badgeProj: { backgroundColor: 'rgba(45,212,164,0.08)' },
  badgeTxtProj: { fontSize: 9, fontWeight: '600', color: '#6EE7C0' },
  clientName: { fontSize: 10, color: UI_COLORS.t3 },
  actBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },

  // PROGRESS CARD
  progressCard: { backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, padding: 14, marginBottom: 14 },
  progHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  progTitle: { fontSize: 12, fontWeight: '600', color: UI_COLORS.text },
  deadlineChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(245,200,66,0.1)', borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10 },
  deadlineTxt: { fontSize: 10, color: UI_COLORS.gold, fontWeight: '500' },
  progBarTrack: { height: 8, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  progBarFill: { height: 8, borderRadius: 4, backgroundColor: UI_COLORS.mint },
  progLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  progLabelLeft: { fontSize: 11, color: UI_COLORS.mint, fontWeight: '600' },
  progLabelRight: { fontSize: 11, color: UI_COLORS.t3 },
  
  // MILESTONES
  milestoneRow: { flexDirection: 'row', gap: 6, paddingBottom: 4, alignItems: 'center' },
  ms: { alignItems: 'center', gap: 5 },
  msDot: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  msDone: { backgroundColor: UI_COLORS.mint },
  msActive: { backgroundColor: UI_COLORS.violet, borderWidth: 2, borderColor: 'rgba(124,111,247,0.4)' },
  msIdle: { backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2 },
  msLbl: { fontSize: 9, color: UI_COLORS.t3 },
  msLblDone: { color: UI_COLORS.mint, fontWeight: '500' },
  msLblActive: { color: UI_COLORS.violet, fontWeight: '600' },
  msLine: { width: 20, height: 1, backgroundColor: UI_COLORS.b1, marginBottom: 12 },
  msLineDone: { backgroundColor: 'rgba(45,212,164,0.4)' },

  // KPI GRID
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 14 },
  kpi: { width: '48.5%', backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 12, marginBottom: 8 },
  kpiLblRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 6 },
  kpiLbl: { fontSize: 10, color: UI_COLORS.t3 },
  kpiVal: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  kpiSub: { fontSize: 10, color: UI_COLORS.t3 },

  // TAGIHAN CARD
  tagihanCard: { backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: 'rgba(245,200,66,0.25)', borderRadius: 16, overflow: 'hidden', marginBottom: 14 },
  tgHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  tgIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(245,200,66,0.12)', alignItems: 'center', justifyContent: 'center' },
  tgInfo: { flex: 1 },
  tgTitle: { fontSize: 13, fontWeight: '600', color: UI_COLORS.text },
  tgSub: { fontSize: 11, color: UI_COLORS.t3, marginTop: 1 },
  tgPendingTxt: { fontSize: 12, color: UI_COLORS.gold, fontWeight: '600' },
  tgRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  trLblRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  trLbl: { fontSize: 12, color: UI_COLORS.t2 },
  trRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  trVal: { fontSize: 12, fontWeight: '600' },
  trStatus: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20 },
  stLunas: { backgroundColor: 'rgba(45,212,164,0.1)' },
  stLunasTxt: { fontSize: 10, fontWeight: '600', color: UI_COLORS.mint },
  stPending: { backgroundColor: 'rgba(245,200,66,0.1)' },
  stPendingTxt: { fontSize: 10, fontWeight: '600', color: UI_COLORS.gold },
  tgFooter: { padding: 10, backgroundColor: 'rgba(245,200,66,0.04)' },
  tgFooterTxt: { fontSize: 11, color: UI_COLORS.t3, textAlign: 'center' },

  // SECTION HEADERS
  secHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  secLbl: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase' },
  secLink: { fontSize: 11, color: UI_COLORS.violet, fontWeight: '500' },

  // TRANSACTIONS
  txItem: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 13, padding: 12, marginBottom: 8 },
  txIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  txInfo: { flex: 1 },
  txName: { fontSize: 13, fontWeight: '600', color: UI_COLORS.text, marginBottom: 2 },
  txMeta: { fontSize: 11, color: UI_COLORS.t3 },
  txAmt: { fontSize: 13, fontWeight: '600' },

  // NOTES
  noteCard: { backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 14, marginBottom: 16 },
  noteRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  noteDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  noteTxt: { flex: 1, fontSize: 12, color: UI_COLORS.t2, lineHeight: 18 },

  // FAB ACTIONS
  fabRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  fabBtn: { flex: 1, height: 48, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  fabIncome: { backgroundColor: UI_COLORS.mint },
  fabExpense: { backgroundColor: 'rgba(255,107,107,0.12)', borderWidth: 0.5, borderColor: 'rgba(255,107,107,0.25)' },
  fabBtnTxt: { fontSize: 13, fontWeight: '600' }
});
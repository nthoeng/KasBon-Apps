import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { GlassCard } from '../../components/ui/GlassCard';

const { colors } = theme;

const UI_COLORS = {
  bg: '#0A1628',
  card: '#152238',
  card2: '#1A2A42',
  text: '#F0F4FF',
  textSub: '#8FA8CC',
  textMuted: '#3E5878',
  gold: '#F5C842',
  mint: '#2DD4A4',
  violet: '#7C6FF7',
  red: '#FF6B6B',
  border: 'rgba(255,255,255,0.08)',
  border2: 'rgba(255,255,255,0.14)',
};

// --- HELPER COMPONENTS ---

const FilterChip = ({ label, icon, isActive }: any) => (
  <TouchableOpacity style={[styles.filterChip, isActive ? styles.fcOn : styles.fcOff]} activeOpacity={0.7}>
    <Ionicons name={icon} size={14} color={isActive ? '#FFF' : UI_COLORS.textSub} />
    <Text style={[styles.fcText, { color: isActive ? '#FFF' : UI_COLORS.textSub }]}>{label}</Text>
  </TouchableOpacity>
);

const StatColumn = ({ label, value, valColor, noBorderRight }: any) => (
  <View style={[styles.statCol, noBorderRight && { borderRightWidth: 0 }]}>
    <Text style={styles.statColLbl}>{label}</Text>
    <Text style={[styles.statColVal, { color: valColor }]}>{value}</Text>
  </View>
);

export const ProjectListScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <View>
          <Text style={styles.pageTitle}>Project & usaha</Text>
          <Text style={styles.pageSub}>3 aktif · 1 selesai</Text>
        </View>
        <View style={styles.topbarRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search" size={16} color={UI_COLORS.textSub} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="add" size={18} color={UI_COLORS.gold} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* SUMMARY CARD */}
        <GlassCard style={styles.summaryCard}>
          <View style={styles.smRow}>
            <View>
              <Text style={styles.smLbl}>Total saldo semua project</Text>
              <Text style={styles.smVal}>Rp 18.350.000</Text>
              <Text style={styles.smSub}>Juni 2026</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.smLbl}>Laba bersih bulan ini</Text>
              <Text style={[styles.smVal, { color: UI_COLORS.mint, fontSize: 18 }]}>+Rp 5.200.000</Text>
              <Text style={[styles.smSub, { color: UI_COLORS.mint }]}>+32% vs Mei</Text>
            </View>
          </View>
          <View style={styles.smMiniGrid}>
            <View style={styles.smm}>
              <Text style={styles.smmLbl}>Pemasukan</Text>
              <Text style={[styles.smmVal, { color: UI_COLORS.mint }]}>Rp 12,5jt</Text>
            </View>
            <View style={styles.smm}>
              <Text style={styles.smmLbl}>Pengeluaran</Text>
              <Text style={[styles.smmVal, { color: UI_COLORS.red }]}>Rp 7,3jt</Text>
            </View>
            <View style={styles.smm}>
              <Text style={styles.smmLbl}>Project aktif</Text>
              <Text style={[styles.smmVal, { color: UI_COLORS.violet }]}>3</Text>
            </View>
          </View>
        </GlassCard>

        {/* FILTER SCROLL */}
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            <FilterChip label="Semua" icon="grid-outline" isActive />
            <FilterChip label="Aktif" icon="checkmark-circle-outline" />
            <FilterChip label="Usaha" icon="storefront-outline" />
            <FilterChip label="Freelance" icon="code-slash-outline" />
            <FilterChip label="Investasi" icon="trending-up-outline" />
          </ScrollView>
        </View>

        {/* SECTION: USAHA KELUARGA */}
        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>Usaha keluarga</Text>
          <TouchableOpacity style={styles.addBtnSm}>
            <Ionicons name="add" size={16} color={UI_COLORS.gold} />
          </TouchableOpacity>
        </View>

        {/* Biz Card: Jualan Cimol */}
        <TouchableOpacity style={styles.projCard} activeOpacity={0.8}>
          <View style={[styles.bizAccent, { backgroundColor: UI_COLORS.gold }]} />
          <View style={styles.pcTop}>
            <View style={[styles.pcIcon, { backgroundColor: 'rgba(245,200,66,0.12)' }]}>
              <Ionicons name="storefront" size={22} color={UI_COLORS.gold} />
            </View>
            <View style={styles.pcInfo}>
              <Text style={styles.pcName} numberOfLines={1}>Jualan Cimol</Text>
              <View style={styles.pcMeta}>
                <Text style={styles.pcType}>Usaha kuliner</Text>
                <View style={[styles.badge, { backgroundColor: 'rgba(45,212,164,0.12)' }]}><Text style={{ color: UI_COLORS.mint, fontSize: 9, fontWeight: '600' }}>Aktif</Text></View>
                <View style={[styles.badge, { backgroundColor: 'rgba(124,111,247,0.12)' }]}><Text style={{ color: '#A89FF9', fontSize: 9, fontWeight: '600' }}>Bisnis</Text></View>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.pcSaldo, { color: UI_COLORS.gold }]}>Rp 4.750.000</Text>
              <Text style={styles.pcSaldoLbl}>saldo usaha</Text>
            </View>
          </View>
          <View style={styles.pcStats}>
            <StatColumn label="Omset bulan ini" value="Rp 6,2jt" valColor={UI_COLORS.mint} />
            <StatColumn label="Modal / HPP" value="Rp 3,8jt" valColor={UI_COLORS.red} />
            <StatColumn label="Laba kotor" value="Rp 2,4jt" valColor={UI_COLORS.gold} noBorderRight />
          </View>
          <View style={styles.pcBarContainer}>
            <View style={styles.barLblRow}>
              <Text style={styles.barLbl}>Margin laba</Text>
              <Text style={[styles.barLbl, { color: UI_COLORS.gold, fontWeight: '600' }]}>38,7%</Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: '39%', backgroundColor: UI_COLORS.gold }]} />
            </View>
          </View>
        </TouchableOpacity>

        {/* SECTION: PEKERJAAN & FREELANCE */}
        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>Pekerjaan & freelance</Text>
          <TouchableOpacity style={styles.addBtnSm}>
            <Ionicons name="add" size={16} color={UI_COLORS.gold} />
          </TouchableOpacity>
        </View>

        {/* Freelance Card: Web Profile */}
        <TouchableOpacity style={styles.projCard} activeOpacity={0.8}>
          <View style={styles.pcTop}>
            <View style={[styles.pcIcon, { backgroundColor: 'rgba(45,212,164,0.1)' }]}>
              <Ionicons name="code-slash" size={22} color={UI_COLORS.mint} />
            </View>
            <View style={styles.pcInfo}>
              <Text style={styles.pcName} numberOfLines={1}>Web Company Profile</Text>
              <View style={styles.pcMeta}>
                <Text style={styles.pcType}>Client: PT Maju Jaya</Text>
                <View style={[styles.badge, { backgroundColor: 'rgba(45,212,164,0.12)' }]}><Text style={{ color: UI_COLORS.mint, fontSize: 9, fontWeight: '600' }}>Aktif</Text></View>
                <View style={[styles.badge, { backgroundColor: 'rgba(45,212,164,0.1)' }]}><Text style={{ color: '#6EE7C0', fontSize: 9, fontWeight: '600' }}>Freelance</Text></View>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.pcSaldo}>Rp 7.500.000</Text>
              <Text style={styles.pcSaldoLbl}>nilai kontrak</Text>
            </View>
          </View>
          <View style={styles.pcStats}>
            <StatColumn label="Diterima" value="Rp 3,75jt" valColor={UI_COLORS.mint} />
            <StatColumn label="Biaya" value="Rp 850rb" valColor={UI_COLORS.red} />
            <StatColumn label="Sisa tagihan" value="Rp 3,75jt" valColor={UI_COLORS.gold} noBorderRight />
          </View>
          <View style={styles.pcBarContainer}>
            <View style={styles.barLblRow}>
              <Text style={styles.barLbl}>Progress penyelesaian</Text>
              <Text style={[styles.barLbl, { color: UI_COLORS.mint, fontWeight: '600' }]}>50% — deadline 30 Jun</Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: '50%', backgroundColor: UI_COLORS.mint }]} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Freelance Card: Desain Logo */}
        <TouchableOpacity style={styles.projCard} activeOpacity={0.8}>
          <View style={styles.pcTop}>
            <View style={[styles.pcIcon, { backgroundColor: 'rgba(124,111,247,0.12)' }]}>
              <Ionicons name="color-palette" size={22} color={UI_COLORS.violet} />
            </View>
            <View style={styles.pcInfo}>
              <Text style={styles.pcName} numberOfLines={1}>Desain logo — UMKM</Text>
              <View style={styles.pcMeta}>
                <Text style={styles.pcType}>Client: Bu Sari</Text>
                <View style={[styles.badge, { backgroundColor: 'rgba(45,212,164,0.12)' }]}><Text style={{ color: UI_COLORS.mint, fontSize: 9, fontWeight: '600' }}>Aktif</Text></View>
                <View style={[styles.badge, { backgroundColor: 'rgba(45,212,164,0.1)' }]}><Text style={{ color: '#6EE7C0', fontSize: 9, fontWeight: '600' }}>Freelance</Text></View>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.pcSaldo}>Rp 1.500.000</Text>
              <Text style={styles.pcSaldoLbl}>nilai kontrak</Text>
            </View>
          </View>
          <View style={styles.pcStats}>
            <StatColumn label="Diterima DP" value="Rp 750rb" valColor={UI_COLORS.mint} />
            <StatColumn label="Biaya" value="Rp 0" valColor={UI_COLORS.red} />
            <StatColumn label="Sisa tagihan" value="Rp 750rb" valColor={UI_COLORS.gold} noBorderRight />
          </View>
          <View style={styles.pcBarContainer}>
            <View style={styles.barLblRow}>
              <Text style={styles.barLbl}>Progress penyelesaian</Text>
              <Text style={[styles.barLbl, { color: UI_COLORS.violet, fontWeight: '600' }]}>80% — hampir selesai</Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: '80%', backgroundColor: UI_COLORS.violet }]} />
            </View>
          </View>
        </TouchableOpacity>

        {/* SECTION: SELESAI */}
        <View style={[styles.secHeader, { marginTop: 6 }]}>
          <Text style={styles.secLbl}>Selesai</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 11, color: UI_COLORS.violet, fontWeight: '500' }}>Lihat semua</Text>
          </TouchableOpacity>
        </View>

        {/* Done Card */}
        <TouchableOpacity style={[styles.projCard, { opacity: 0.6 }]} activeOpacity={0.8}>
          <View style={styles.pcTop}>
            <View style={[styles.pcIcon, { backgroundColor: 'rgba(255,255,255,0.06)' }]}>
              <Ionicons name="checkmark" size={22} color={UI_COLORS.textSub} />
            </View>
            <View style={styles.pcInfo}>
              <Text style={styles.pcName} numberOfLines={1}>Pembuatan toko online</Text>
              <View style={styles.pcMeta}>
                <Text style={styles.pcType}>Selesai 15 Mei 2026</Text>
                <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.06)' }]}><Text style={{ color: UI_COLORS.textSub, fontSize: 9, fontWeight: '600' }}>Selesai</Text></View>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.pcSaldo, { color: UI_COLORS.textSub }]}>Rp 4.600.000</Text>
              <Text style={styles.pcSaldoLbl}>total diterima</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* SECTION: TAMBAH BARU */}
        <View style={[styles.secHeader, { marginTop: 6 }]}>
          <Text style={styles.secLbl}>Tambah baru</Text>
        </View>

        <TouchableOpacity style={styles.emptyState} activeOpacity={0.7}>
          <View style={styles.emptyIconWrap}>
            <Ionicons name="add" size={24} color={UI_COLORS.violet} />
          </View>
          <Text style={styles.emptyTitle}>Tambah project atau usaha</Text>
          <Text style={styles.emptySub}>Freelance, bisnis, investasi — semua ada cashflow-nya sendiri</Text>
        </TouchableOpacity>

        {/* SPACER UNTUK TAB NAVIGATOR */}
        <View style={{ height: 100 }} />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollContainer: { paddingBottom: 20 },
  
  /* TOPBAR */
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingTop: 12, paddingBottom: 10 },
  pageTitle: { fontSize: 18, fontWeight: '600', color: UI_COLORS.text },
  pageSub: { fontSize: 11, color: UI_COLORS.textMuted, marginTop: 2 },
  topbarRight: { flexDirection: 'row', gap: 10 },
  iconBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: UI_COLORS.card, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: UI_COLORS.border2 },
  
  /* SUMMARY CARD */
  summaryCard: { marginHorizontal: 18, marginVertical: 8, backgroundColor: UI_COLORS.card2, padding: 16, borderRadius: 18, borderWidth: 0.5, borderColor: UI_COLORS.border2 },
  smRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  smLbl: { fontSize: 11, color: UI_COLORS.textMuted, marginBottom: 4 },
  smVal: { fontSize: 22, fontWeight: '600', color: UI_COLORS.text },
  smSub: { fontSize: 11, color: UI_COLORS.textMuted, marginTop: 2 },
  smMiniGrid: { flexDirection: 'row', gap: 8 },
  smm: { flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 10, alignItems: 'center', borderWidth: 0.5, borderColor: UI_COLORS.border },
  smmLbl: { fontSize: 10, color: UI_COLORS.textMuted, marginBottom: 4 },
  smmVal: { fontSize: 13, fontWeight: '600' },

  /* FILTER SCROLL */
  filterScroll: { paddingHorizontal: 18, paddingVertical: 10, gap: 8 },
  filterChip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 14 },
  fcOn: { backgroundColor: UI_COLORS.violet },
  fcOff: { backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.border2 },
  fcText: { fontSize: 12, fontWeight: '500' },

  /* SECTION HEADER */
  secHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 10, marginTop: 6 },
  secLbl: { fontSize: 11, color: UI_COLORS.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: '600' },
  addBtnSm: { width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(245,200,66,0.12)', borderWidth: 0.5, borderColor: 'rgba(245,200,66,0.25)', justifyContent: 'center', alignItems: 'center' },

  /* PROJECT CARD */
  projCard: { marginHorizontal: 18, marginBottom: 12, backgroundColor: UI_COLORS.card, borderRadius: 18, borderWidth: 0.5, borderColor: UI_COLORS.border2, overflow: 'hidden' },
  bizAccent: { height: 3, width: '100%' },
  pcTop: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  pcIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  pcInfo: { flex: 1 },
  pcName: { fontSize: 15, fontWeight: '600', color: UI_COLORS.text, marginBottom: 4 },
  pcMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  pcType: { fontSize: 11, color: UI_COLORS.textMuted },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  pcSaldo: { fontSize: 16, fontWeight: '600', color: UI_COLORS.text, textAlign: 'right' },
  pcSaldoLbl: { fontSize: 10, color: UI_COLORS.textMuted, textAlign: 'right', marginTop: 2 },
  
  /* STATS ROWS */
  pcStats: { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: UI_COLORS.border },
  statCol: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRightWidth: 0.5, borderRightColor: UI_COLORS.border },
  statColLbl: { fontSize: 10, color: UI_COLORS.textMuted, marginBottom: 4 },
  statColVal: { fontSize: 13, fontWeight: '600' },

  /* PROGRESS BAR */
  pcBarContainer: { paddingHorizontal: 14, paddingBottom: 16, paddingTop: 4 },
  barLblRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  barLbl: { fontSize: 11, color: UI_COLORS.textMuted },
  barTrack: { height: 4, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 2 },

  /* EMPTY STATE */
  emptyState: { marginHorizontal: 18, marginBottom: 12, backgroundColor: UI_COLORS.card, borderRadius: 18, borderWidth: 1.5, borderColor: 'rgba(124,111,247,0.3)', borderStyle: 'dashed', padding: 24, alignItems: 'center', gap: 10 },
  emptyIconWrap: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(124,111,247,0.1)', justifyContent: 'center', alignItems: 'center' },
  emptyTitle: { fontSize: 14, fontWeight: '600', color: UI_COLORS.violet },
  emptySub: { fontSize: 11, color: UI_COLORS.textMuted, textAlign: 'center', paddingHorizontal: 20 },
});
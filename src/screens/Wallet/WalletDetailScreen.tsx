import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UI_COLORS = {
  bg: '#0A1628', bg2: '#0F1E35', card: '#152238', card2: '#1A2A42',
  b1: 'rgba(255,255,255,0.08)', b2: 'rgba(255,255,255,0.15)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878'
};

// Data Dummy Transaksi
const RECENT_TRANSACTIONS = [
  { id: '1', name: 'Belanja Indomaret', meta: 'Belanja · Istri', amt: '-Rp 87.500', time: '11:24', icon: 'cart', color: UI_COLORS.red, bg: 'rgba(255,107,107,0.12)', avatar: 'I', avatarColor: '#FF6B6B' },
  { id: '2', name: 'Transfer dari BCA Bayu', meta: 'Transfer masuk · via QR', amt: '+Rp 2.000.000', time: 'Kemarin', icon: 'swap-horizontal', color: UI_COLORS.mint, bg: 'rgba(45,212,164,0.1)', avatar: 'B', avatarColor: '#2DD4A4' },
  { id: '3', name: 'Makan siang warung', meta: 'Makan · Bayu', amt: '-Rp 35.000', time: 'Kemarin', icon: 'restaurant', color: UI_COLORS.red, bg: 'rgba(255,107,107,0.12)', avatar: 'B', avatarColor: '#2DD4A4' },
  { id: '4', name: 'Listrik PLN', meta: 'Tagihan · Bayu', amt: '-Rp 185.000', time: '9 Jun', icon: 'flash', color: UI_COLORS.violet, bg: 'rgba(124,111,247,0.1)', avatar: 'B', avatarColor: '#7C6FF7' },
  { id: '5', name: 'Apotek vitamin', meta: 'Kesehatan · Istri', amt: '-Rp 85.000', time: '9 Jun', icon: 'fitness', color: UI_COLORS.mint, bg: 'rgba(45,212,164,0.1)', avatar: 'I', avatarColor: '#F5C842' },
];

export const WalletDetailScreen = ({ route }: any) => {
  const { walletId } = route.params || {}; // Menangkap ID dompet yang diklik	
  
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Detail dompet</Text>
        <View style={styles.topbarRight}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('QRWallet')}>
            <Ionicons name="qr-code" size={16} color={UI_COLORS.gold} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="ellipsis-horizontal" size={16} color={UI_COLORS.t2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* HERO SECTION */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="home" size={28} color={UI_COLORS.gold} />
          </View>
          <Text style={styles.heroName}>Kas keluarga</Text>
          <View style={styles.heroType}>
            <Text style={styles.heroTypeTxt}>Kas tunai</Text>
            <View style={styles.badgeGlobal}><Text style={styles.badgeGlobalTxt}>Global — semua bisa catat</Text></View>
          </View>
          <Text style={styles.saldoBig}>Rp 6.800.000</Text>
          <Text style={styles.saldoSub}>Diperbarui barusan · 11 Jun 2026</Text>
          
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.qaBtn} onPress={() => navigation.navigate('Add', { type: 'income' })}>
              <View style={[styles.qaIconWrap, { backgroundColor: 'rgba(45,212,164,0.12)' }]}><Ionicons name="arrow-down" size={20} color={UI_COLORS.mint} /></View>
              <Text style={styles.qaLbl}>Masukkan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.qaBtn} onPress={() => navigation.navigate('Add', { type: 'expense' })}>
              <View style={[styles.qaIconWrap, { backgroundColor: 'rgba(255,107,107,0.12)' }]}><Ionicons name="arrow-up" size={20} color={UI_COLORS.red} /></View>
              <Text style={styles.qaLbl}>Keluarkan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.qaBtn} onPress={() => navigation.navigate('Add', { type: 'transfer' })}>
              <View style={[styles.qaIconWrap, { backgroundColor: 'rgba(124,111,247,0.12)' }]}><Ionicons name="swap-horizontal" size={20} color={UI_COLORS.violet} /></View>
              <Text style={styles.qaLbl}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.qaBtn} onPress={() => navigation.navigate('QRWallet')}>
              <View style={[styles.qaIconWrap, { backgroundColor: 'rgba(245,200,66,0.12)' }]}><Ionicons name="qr-code" size={20} color={UI_COLORS.gold} /></View>
              <Text style={styles.qaLbl}>Tampil QR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* STATS ROW */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLbl}>Masuk bulan ini</Text>
            <Text style={[styles.statVal, { color: UI_COLORS.mint }]}>Rp 2,5jt</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLbl}>Keluar bulan ini</Text>
            <Text style={[styles.statVal, { color: UI_COLORS.red }]}>Rp 1,34jt</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLbl}>Transaksi</Text>
            <Text style={[styles.statVal, { color: UI_COLORS.violet }]}>24 tx</Text>
          </View>
        </View>

        {/* MINI CHART */}
        <View style={styles.chartMini}>
          <View style={styles.cmHeader}>
            <Text style={styles.cmTitle}>Cashflow 6 bulan</Text>
            <Text style={styles.cmPeriod}>Jan — Jun 2026</Text>
          </View>
          <View style={styles.miniBars}>
            <View style={styles.mbGrp}><View style={[styles.mbar, { height: 28, backgroundColor: 'rgba(45,212,164,0.4)' }]} /><View style={[styles.mbar, { height: 20, backgroundColor: 'rgba(255,107,107,0.4)' }]} /></View>
            <View style={styles.mbGrp}><View style={[styles.mbar, { height: 32, backgroundColor: 'rgba(45,212,164,0.4)' }]} /><View style={[styles.mbar, { height: 22, backgroundColor: 'rgba(255,107,107,0.4)' }]} /></View>
            <View style={styles.mbGrp}><View style={[styles.mbar, { height: 24, backgroundColor: 'rgba(45,212,164,0.4)' }]} /><View style={[styles.mbar, { height: 26, backgroundColor: 'rgba(255,107,107,0.4)' }]} /></View>
            <View style={styles.mbGrp}><View style={[styles.mbar, { height: 36, backgroundColor: 'rgba(45,212,164,0.4)' }]} /><View style={[styles.mbar, { height: 18, backgroundColor: 'rgba(255,107,107,0.4)' }]} /></View>
            <View style={styles.mbGrp}><View style={[styles.mbar, { height: 30, backgroundColor: 'rgba(45,212,164,0.4)' }]} /><View style={[styles.mbar, { height: 24, backgroundColor: 'rgba(255,107,107,0.4)' }]} /></View>
            <View style={[styles.mbGrp, { borderWidth: 0.5, borderColor: 'rgba(245,200,66,0.3)', borderRadius: 4, padding: 2 }]}>
              <View style={[styles.mbar, { height: 48, backgroundColor: UI_COLORS.mint }]} />
              <View style={[styles.mbar, { height: 28, backgroundColor: UI_COLORS.red }]} />
            </View>
          </View>
          <View style={styles.mbLabels}>
            <Text style={styles.mbl}>Jan</Text><Text style={styles.mbl}>Feb</Text><Text style={styles.mbl}>Mar</Text>
            <Text style={styles.mbl}>Apr</Text><Text style={styles.mbl}>Mei</Text><Text style={[styles.mbl, styles.mblNow]}>Jun</Text>
          </View>
        </View>

        {/* ACCESS CARD */}
        <View style={styles.accessCard}>
          <View style={styles.acRow}>
            <View style={[styles.acIcon, { backgroundColor: 'rgba(45,212,164,0.1)' }]}><Ionicons name="eye" size={16} color={UI_COLORS.mint} /></View>
            <View style={styles.acInfo}><Text style={styles.acLbl}>Visibilitas</Text><Text style={styles.acVal}>Global — semua anggota bisa lihat & catat</Text></View>
            <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
          </View>
          <View style={styles.acRow}>
            <View style={[styles.acIcon, { backgroundColor: 'rgba(124,111,247,0.12)' }]}><Ionicons name="people" size={16} color={UI_COLORS.violet} /></View>
            <View style={styles.acInfo}><Text style={styles.acLbl}>Anggota yang punya akses</Text><Text style={styles.acVal}>Bayu, Istri</Text></View>
            <View style={styles.membersChips}>
              <View style={[styles.mChip, { backgroundColor: UI_COLORS.violet }]}><Text style={styles.mChipTxt}>B</Text></View>
              <View style={[styles.mChip, { backgroundColor: UI_COLORS.gold }]}><Text style={[styles.mChipTxt, { color: UI_COLORS.bg }]}>I</Text></View>
            </View>
          </View>
          <View style={[styles.acRow, { borderBottomWidth: 0 }]}>
            <View style={[styles.acIcon, { backgroundColor: 'rgba(245,200,66,0.1)' }]}><Ionicons name="calendar" size={16} color={UI_COLORS.gold} /></View>
            <View style={styles.acInfo}><Text style={styles.acLbl}>Dibuat</Text><Text style={styles.acVal}>1 Januari 2026 oleh Bayu</Text></View>
          </View>
        </View>

        {/* TRANSACTIONS LIST */}
        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>Riwayat transaksi</Text>
          <TouchableOpacity><Text style={styles.secLink}>Semua ↗</Text></TouchableOpacity>
        </View>

        <View style={styles.txList}>
          {RECENT_TRANSACTIONS.map((tx, idx) => (
            <TouchableOpacity key={tx.id} style={[styles.txItem, idx === RECENT_TRANSACTIONS.length - 1 && { borderBottomWidth: 0 }]} activeOpacity={0.7}>
              <View style={{ position: 'relative' }}>
                <View style={[styles.txIcon, { backgroundColor: tx.bg }]}><Ionicons name={tx.icon as any} size={18} color={tx.color} /></View>
                <View style={[styles.txAvatar, { backgroundColor: tx.avatarColor }]}><Text style={styles.txAvatarTxt}>{tx.avatar}</Text></View>
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txName} numberOfLines={1}>{tx.name}</Text>
                <Text style={styles.txMeta}>{tx.meta}</Text>
              </View>
              <View style={styles.txRight}>
                <Text style={[styles.txAmt, { color: tx.amt.includes('+') ? UI_COLORS.mint : UI_COLORS.red }]}>{tx.amt}</Text>
                <Text style={styles.txTime}>{tx.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* BOTTOM ACTIONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actBtn, styles.btnIn]} onPress={() => navigation.navigate('Add', { type: 'income' })}>
            <Ionicons name="arrow-down" size={16} color={UI_COLORS.mint} />
            <Text style={[styles.actBtnTxt, { color: UI_COLORS.mint }]}>Catat masuk</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actBtn, styles.btnOut]} onPress={() => navigation.navigate('Add', { type: 'expense' })}>
            <Ionicons name="arrow-up" size={16} color="#FF9090" />
            <Text style={[styles.actBtnTxt, { color: '#FF9090' }]}>Catat keluar</Text>
          </TouchableOpacity>
        </View>

        {/* DANGER AREA */}
        <View style={styles.dangerRow}>
          <TouchableOpacity style={styles.btnDanger}>
            <Ionicons name="archive" size={16} color="#FF9090" />
            <Text style={styles.btnDangerTxt}>Arsipkan dompet ini</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollContent: { paddingBottom: 40 },
  
  // TOPBAR
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  backBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 14, fontWeight: '600', color: UI_COLORS.text },
  topbarRight: { flexDirection: 'row', gap: 7 },
  iconBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  
  // HERO
  hero: { paddingHorizontal: 18, paddingVertical: 14, alignItems: 'center' },
  heroIcon: { width: 60, height: 60, borderRadius: 20, backgroundColor: 'rgba(245,200,66,0.12)', borderWidth: 0.5, borderColor: 'rgba(245,200,66,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  heroName: { fontSize: 20, fontWeight: '600', color: UI_COLORS.text, marginBottom: 4 },
  heroType: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  heroTypeTxt: { fontSize: 12, color: UI_COLORS.t3 },
  badgeGlobal: { backgroundColor: 'rgba(45,212,164,0.12)', paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20 },
  badgeGlobalTxt: { fontSize: 10, fontWeight: '600', color: UI_COLORS.mint },
  saldoBig: { fontSize: 34, fontWeight: '600', color: UI_COLORS.text, letterSpacing: -1, marginBottom: 4 },
  saldoSub: { fontSize: 12, color: UI_COLORS.t3 },
  
  // QUICK ACTIONS
  quickActions: { flexDirection: 'row', gap: 12, justifyContent: 'center', marginTop: 18 },
  qaBtn: { alignItems: 'center', gap: 6 },
  qaIconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  qaLbl: { fontSize: 10, color: UI_COLORS.t2 },
  
  // STATS
  statsRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 12 },
  statBox: { flex: 1, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b1, borderRadius: 12, paddingVertical: 10, alignItems: 'center' },
  statLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 3 },
  statVal: { fontSize: 13, fontWeight: '600' },
  
  // CHART
  chartMini: { marginHorizontal: 16, marginBottom: 12, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 14 },
  cmHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cmTitle: { fontSize: 12, fontWeight: '600', color: UI_COLORS.text },
  cmPeriod: { fontSize: 11, color: UI_COLORS.t3 },
  miniBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 48, marginBottom: 8 },
  mbGrp: { flex: 1, gap: 1.5, alignItems: 'flex-end', flexDirection: 'row' },
  mbar: { flex: 1, borderTopLeftRadius: 2, borderTopRightRadius: 2 },
  mbLabels: { flexDirection: 'row', gap: 4 },
  mbl: { flex: 1, textAlign: 'center', fontSize: 10, color: UI_COLORS.t3 },
  mblNow: { color: UI_COLORS.gold, fontWeight: '600' },
  
  // ACCESS CARD
  accessCard: { marginHorizontal: 16, marginBottom: 16, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, overflow: 'hidden' },
  acRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  acIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  acInfo: { flex: 1 },
  acLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 2 },
  acVal: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text },
  membersChips: { flexDirection: 'row', marginRight: 4 },
  mChip: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: UI_COLORS.bg, marginLeft: -6 },
  mChipTxt: { fontSize: 9, fontWeight: '700', color: '#FFF' },
  
  // TRANSACTIONS
  secHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginBottom: 8 },
  secLbl: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase' },
  secLink: { fontSize: 11, color: UI_COLORS.violet, fontWeight: '500' },
  txList: { marginHorizontal: 16, backgroundColor: UI_COLORS.card, borderRadius: 14, overflow: 'hidden', marginBottom: 16 },
  txItem: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  txIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  txAvatar: { width: 16, height: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: UI_COLORS.bg, position: 'absolute', bottom: -2, right: -4 },
  txAvatarTxt: { fontSize: 8, fontWeight: '700', color: '#FFF' },
  txInfo: { flex: 1 },
  txName: { fontSize: 13, fontWeight: '600', color: UI_COLORS.text, marginBottom: 2 },
  txMeta: { fontSize: 11, color: UI_COLORS.t3 },
  txRight: { alignItems: 'flex-end' },
  txAmt: { fontSize: 13, fontWeight: '600', marginBottom: 2 },
  txTime: { fontSize: 10, color: UI_COLORS.t3 },
  
  // ACTIONS
  actionRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 16 },
  actBtn: { flex: 1, height: 48, borderRadius: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 0.5 },
  btnIn: { backgroundColor: 'rgba(45,212,164,0.12)', borderColor: 'rgba(45,212,164,0.25)' },
  btnOut: { backgroundColor: 'rgba(255,107,107,0.1)', borderColor: 'rgba(255,107,107,0.2)' },
  actBtnTxt: { fontSize: 13, fontWeight: '600' },
  
  // DANGER
  dangerRow: { paddingHorizontal: 16, marginBottom: 20 },
  btnDanger: { width: '100%', height: 44, borderRadius: 12, backgroundColor: 'rgba(255,107,107,0.07)', borderWidth: 0.5, borderColor: 'rgba(255,107,107,0.2)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnDangerTxt: { fontSize: 12, fontWeight: '500', color: '#FF9090' }
});
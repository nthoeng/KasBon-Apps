import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

export const TransactionDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // Ambil data isEdit dari parameter navigasi (default false jika tidak ada)
  const isEdit = route.params?.isEdit || false;
  const transactionData = route.params?.transaction || null;

  const handleCopy = () => {
    Alert.alert('Berhasil', 'ID Transaksi disalin ke clipboard!');
  };

  // ==========================================
  // SIMULASI DATA DARI BACKEND / PARAMETER NAVIGASI
  // Di produksi, data ini didapat dari route.params.transaction
  // ==========================================
  const mockDataFromDatabase = {
    id: 'PRJ-20260612-007', 
    amount: '- Rp 185.000', rawAmt: '- Rp 185.000',
    date: 'Kamis, 12 Juni 2026 · 09:15 WIB', shortDate: '12 Jun 2026 · 09:15',
    prjName: 'Web Company Profile', ctxKey: 'Kategori pengeluaran', ctxVal: 'Biaya Server', ctxImpact: '-Rp 185.000 dari saldo',
    wallet: 'Kas Keluarga', walletColor: COLORS.gold,
    category: 'Biaya Operasional', catIcon: 'globe', catColor: COLORS.coral,
    note: 'Perpanjang domain dan hosting bulanan di Niagahoster.',
    balBefore: 'Rp 6.887.500', balAfter: 'Rp 6.702.500',
    hasReceipt: true,
    userInitial: 'B', userName: 'Bayu', device: 'Android · App v1.2'
  };

  // Logika penentu dari ID transaksi (Sesuai idemu!)
  const data = route.params?.transaction || mockDataFromDatabase;
  const isProject = data.id.startsWith('PRJ');
  const isIncome = data.amount.includes('+');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* TOPBAR */}
        <View style={styles.topbar}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={16} color={COLORS.t2} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Detail Transaksi</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="ellipsis-horizontal" size={16} color={COLORS.t2} />
          </TouchableOpacity>
        </View>

        {/* CODE, COPY & STATUS */}
        <View style={styles.codeRow}>
          <View style={[styles.codeBadge, isProject ? styles.cbPrj : styles.cbTrx]}>
            <Text style={[styles.codeBadgeTxt, isProject ? {color: COLORS.violet} : {color: COLORS.t2}]}>{data.id}</Text>
          </View>
          <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
            <Ionicons name="copy-outline" size={14} color={COLORS.t2} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <View style={[styles.statusDot, { backgroundColor: isIncome ? COLORS.mint : (isProject ? COLORS.coral : COLORS.mint) }]} />
          <Text style={[styles.statusLbl, { color: isIncome ? COLORS.mint : (isProject ? COLORS.coral : COLORS.mint) }]}>
            {isIncome ? 'Terkonfirmasi' : (isProject ? 'Pengeluaran' : 'Terkonfirmasi')}
          </Text>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <Text style={styles.heroLbl}>{isProject ? (isIncome ? 'Pemasukan project' : 'Pengeluaran project') : 'Pengeluaran pribadi'}</Text>
          <Text style={[styles.heroAmt, { color: isIncome ? COLORS.mint : COLORS.coral }]}>{data.amount}</Text>
          <Text style={styles.heroDate}>{data.date}</Text>
        </View>

        {/* PROJECT CONTEXT CARD (Otomatis muncul jika ID berawalan PRJ) */}
        {isProject && (
          <View style={[styles.ctxCard, !isIncome && { backgroundColor: 'rgba(255,107,107,0.05)', borderColor: 'rgba(255,107,107,0.25)' }]}>
            <View style={styles.ctxHeader}>
              <View style={[styles.ctxIcon, !isIncome && { backgroundColor: 'rgba(255,107,107,0.15)', borderColor: 'rgba(255,107,107,0.3)' }]}>
                <Ionicons name="briefcase" size={16} color={isIncome ? COLORS.violet : COLORS.coral} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.ctxLabel}>Bagian dari project</Text>
                <Text style={styles.ctxName}>{data.prjName}</Text>
              </View>
              <Ionicons name="open-outline" size={16} color={COLORS.violet} />
            </View>
            <View style={styles.dividerSolid} />
            <View style={[styles.ctxRow, { marginTop: 8 }]}>
              <Text style={styles.ctxKey}>{data.ctxKey}</Text>
              <Text style={[styles.ctxVal, { color: isIncome ? COLORS.gold : COLORS.coral }]}>{data.ctxVal}</Text>
            </View>
            <View style={[styles.ctxRow, { marginBottom: 0 }]}>
              <Text style={styles.ctxKey}>{isIncome ? 'Kontribusi ke target' : 'Dampak ke laba kotor'}</Text>
              <Text style={[styles.ctxVal, { color: isIncome ? COLORS.mint : COLORS.coral }]}>{data.ctxImpact}</Text>
            </View>
          </View>
        )}

        {/* INFORMASI TRANSAKSI */}
        <Text style={styles.sectionTitle}>Informasi & Saldo</Text>
        <View style={styles.receiptCard}>
          <View style={styles.rrow}>
            <View style={styles.rl}><Ionicons name="wallet" size={15} color={COLORS.t2} /><Text style={styles.rlTxt}>Dari dompet</Text></View>
            <View style={styles.wPill}>
              <View style={[styles.wIco, { backgroundColor: hexToRgba(data.walletColor, 0.15) }]}><Ionicons name="home" size={12} color={data.walletColor} /></View>
              <Text style={[styles.rr, { color: data.walletColor }]}>{data.wallet}</Text>
            </View>
          </View>
          <View style={styles.rrow}>
            <View style={styles.rl}><Ionicons name="pricetag" size={15} color={COLORS.t2} /><Text style={styles.rlTxt}>Kategori</Text></View>
            <View style={styles.wPill}>
              <View style={[styles.wIco, { backgroundColor: hexToRgba(data.catColor, 0.15) }]}><Ionicons name={data.catIcon as any} size={12} color={data.catColor} /></View>
              <Text style={styles.rr}>{data.category}</Text>
            </View>
          </View>
          <View style={styles.rrow}>
            <View style={styles.rl}><Ionicons name="calendar" size={15} color={COLORS.t2} /><Text style={styles.rlTxt}>Tanggal</Text></View>
            <Text style={styles.rr}>{data.shortDate}</Text>
          </View>
          <View style={styles.rrow}>
            <View style={styles.rl}><Ionicons name="person" size={15} color={COLORS.t2} /><Text style={styles.rlTxt}>Dicatat oleh</Text></View>
            <View style={styles.wPill}>
              <View style={[styles.wIco, { backgroundColor: hexToRgba(COLORS.t1, 0.1), borderRadius: 10 }]}><Text style={{fontSize:10, fontWeight:'600', color: COLORS.t1}}>{data.userInitial}</Text></View>
              <Text style={styles.rr}>{data.userName}</Text>
            </View>
          </View>

          {/* BAGIAN SALDO SEBELUM & SESUDAH */}
          <View style={styles.dividerDashed} />
          <View style={styles.saldoSection}>
            <View style={styles.rrowSaldo}>
              <Text style={styles.rlTxt}>Saldo sebelum</Text>
              <Text style={styles.rr}>{data.balBefore}</Text>
            </View>
            <View style={styles.rrowSaldo}>
              <Text style={styles.rlTxt}>Nominal</Text>
              <Text style={[styles.rr, { color: isIncome ? COLORS.mint : COLORS.coral }]}>{data.rawAmt}</Text>
            </View>
            <View style={[styles.rrowSaldo, { borderBottomWidth: 0, marginTop: 4 }]}>
              <Text style={[styles.rlTxt, { fontWeight: '600', color: COLORS.t1 }]}>Saldo sesudah</Text>
              <Text style={[styles.rr, { fontSize: 14, color: COLORS.mint }]}>{data.balAfter}</Text>
            </View>
          </View>
        </View>

        {/* CATATAN */}
        <View style={styles.notesCard}>
          <Text style={styles.notesLbl}>Catatan</Text>
          <Text style={styles.notesTxt}>{data.note}</Text>
        </View>

        {/* BUKTI STRUK */}
        {data.hasReceipt ? (
          <View style={styles.strukCard}>
            <View style={styles.strukThumb}><Ionicons name="receipt" size={20} color={COLORS.t2} /></View>
            <View style={styles.strukInfo}>
              <Text style={styles.strukName}>Foto struk / bukti</Text>
              <Text style={styles.strukSub}>struk-2026.jpg · 1.2 MB</Text>
            </View>
            <Text style={styles.strukView}>Lihat</Text>
          </View>
        ) : (
          <TouchableOpacity style={[styles.strukCard, { opacity: 0.5 }]}>
            <View style={[styles.strukThumb, { backgroundColor: 'transparent', borderColor: 'transparent' }]}>
              <Ionicons name="image-outline" size={20} color={COLORS.t3} />
            </View>
            <View style={styles.strukInfo}>
              <Text style={[styles.strukName, { color: COLORS.t2 }]}>Tidak ada foto struk</Text>
              <Text style={styles.strukSub}>Tap untuk tambahkan bukti</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* ACTION ROW */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.actBtn}
            onPress={() => navigation.navigate('Add', { isEdit: true, transaction: data })} 
          >                
            <Ionicons name="pencil" size={16} color={COLORS.t2} />
            <Text style={styles.actLbl}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actBtn}>
            <Ionicons name="share-social" size={16} color={COLORS.t2} />
            <Text style={styles.actLbl}>Bagikan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actBtn, styles.actBtnDanger]}>
            <Ionicons name="trash" size={16} color={COLORS.coral} />
            <Text style={[styles.actLbl, { color: COLORS.coral }]}>Hapus</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  scrollBody: { paddingHorizontal: 18, paddingBottom: 30 },
  
  // TOPBAR
  topbar: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingTop: 10 },
  iconBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#1A2D47', borderWidth: 1, borderColor: '#253E60', alignItems: 'center', justifyContent: 'center' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 14, fontWeight: '600', color: COLORS.t1 },

  // CODE, COPY & STATUS
  codeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  codeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
  cbPrj: { backgroundColor: 'rgba(124,111,247,0.15)', borderColor: 'rgba(124,111,247,0.3)' },
  cbTrx: { backgroundColor: 'rgba(90,120,144,0.2)', borderColor: 'rgba(90,120,144,0.25)' },
  codeBadgeTxt: { fontSize: 11, fontWeight: '600', letterSpacing: 0.5 },
  copyBtn: { marginLeft: 8, padding: 4 },
  statusDot: { width: 7, height: 7, borderRadius: 3.5, marginRight: 6 },
  statusLbl: { fontSize: 11, fontWeight: '500' },

  // HERO
  hero: { alignItems: 'center', paddingBottom: 16 },
  heroLbl: { fontSize: 11, color: COLORS.t2, marginBottom: 4 },
  heroAmt: { fontSize: 28, fontWeight: '600' },
  heroDate: { fontSize: 11, color: COLORS.t3, marginTop: 4 },

  sectionTitle: { fontSize: 10, color: COLORS.t2, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8, marginTop: 8, fontWeight: '500' },

  // PROJECT CONTEXT CARD
  ctxCard: { backgroundColor: 'rgba(124,111,247,0.07)', borderWidth: 1.5, borderColor: 'rgba(124,111,247,0.25)', borderRadius: 12, padding: 12, marginBottom: 10 },
  ctxHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  ctxIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(124,111,247,0.2)', borderWidth: 1, borderColor: 'rgba(124,111,247,0.3)', alignItems: 'center', justifyContent: 'center' },
  ctxLabel: { fontSize: 10, color: COLORS.t2 },
  ctxName: { fontSize: 13, fontWeight: '600', color: COLORS.t1 },
  dividerSolid: { height: 1, backgroundColor: '#1A2D47' },
  ctxRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  ctxKey: { fontSize: 11, color: COLORS.t2 },
  ctxVal: { fontSize: 11, fontWeight: '600' },

  // RECEIPT CARD
  receiptCard: { backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd, borderRadius: 12, overflow: 'hidden', marginBottom: 10 },
  rrow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#1A2D47' },
  rl: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rlTxt: { fontSize: 12, color: COLORS.t2 },
  rr: { fontSize: 12, fontWeight: '500', color: COLORS.t1, textAlign: 'right' },
  wPill: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  wIco: { width: 22, height: 22, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  
  dividerDashed: { height: 0, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.1)', borderStyle: 'dashed', marginHorizontal: 10 },
  saldoSection: { backgroundColor: 'rgba(255,255,255,0.02)', paddingVertical: 4 },
  rrowSaldo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#1A2D47' },

  // NOTES
  notesCard: { backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd, borderRadius: 12, padding: 12, marginBottom: 10 },
  notesLbl: { fontSize: 10, color: COLORS.t2, marginBottom: 6 },
  notesTxt: { fontSize: 12, color: COLORS.t1, lineHeight: 18 },

  // STRUK
  strukCard: { backgroundColor: COLORS.sf2, borderWidth: 1, borderColor: COLORS.bd, borderRadius: 12, padding: 10, marginBottom: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  strukThumb: { width: 48, height: 48, borderRadius: 8, backgroundColor: '#1A2D47', borderWidth: 1, borderColor: '#253E60', alignItems: 'center', justifyContent: 'center' },
  strukInfo: { flex: 1 },
  strukName: { fontSize: 12, fontWeight: '500', color: COLORS.t1, marginBottom: 2 },
  strukSub: { fontSize: 10, color: COLORS.t2 },
  strukView: { fontSize: 11, fontWeight: '600', color: COLORS.violet },

  // ACTIONS
  actionRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  actBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#253E60', alignItems: 'center', gap: 4 },
  actLbl: { fontSize: 10, color: COLORS.t2, fontWeight: '500' },
  actBtnDanger: { borderColor: 'rgba(255,107,107,0.3)' }
});
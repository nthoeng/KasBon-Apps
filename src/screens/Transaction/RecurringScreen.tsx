import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UI_COLORS = {
  bg: '#0A1628', bg2: '#0F1E35', card: '#152238', card2: '#1A2A42',
  b1: 'rgba(255,255,255,0.08)', b2: 'rgba(255,255,255,0.15)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878'
};

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const RecurringScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  // Referensi untuk auto-scroll
  const scrollViewRef = useRef<ScrollView>(null);

  // Tangkap parameter lemparan (prefill) dari AddTransactionScreen
  const prefillName = route.params?.prefillName || '';
  const prefillAmount = route.params?.prefillAmount || '';
  const prefillWallet = route.params?.prefillWallet || 'Pilih Dompet';

  // State untuk form yang diisi otomatis jika ada prefill
  const [txName, setTxName] = useState(prefillName);
  const [txAmount, setTxAmount] = useState(prefillAmount);
  
  const [freq, setFreq] = useState('monthly');
  const [method, setMethod] = useState('auto');

  // Fungsi untuk scroll otomatis ke form di bawah
  const scrollToForm = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const monthlyItems = [
    { id: 'm1', name: 'Listrik PLN', type: 'expense', amount: '185.000', color: UI_COLORS.violet, icon: 'flash', freq: 'Bulanan', meta: 'Tagihan · tgl 5', next: 'berikutnya 5 Jul', source: 'GoPay Istri' },
    { id: 'm2', name: 'Cicilan motor FIF', type: 'expense', amount: '800.000', color: UI_COLORS.red, icon: 'bicycle', freq: 'Bulanan', meta: 'Cicilan · tgl 25', next: 'berikutnya 25 Jun', source: 'Kas keluarga' },
    { id: 'm3', name: 'Setor dana darurat', type: 'income', amount: '500.000', color: UI_COLORS.mint, icon: 'wallet', freq: 'Bulanan', meta: 'Tabungan · tgl 1', next: 'berikutnya 1 Jul', source: 'Dompet dana darurat' },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Transaksi berulang</Text>
        <TouchableOpacity style={styles.iconBtn} onPress={scrollToForm}>
          <Ionicons name="add" size={18} color={UI_COLORS.gold} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        ref={scrollViewRef} // Kaitkan referensi scroll
        contentContainerStyle={styles.scrollBody} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* SUMMARY STATS */}
        <View style={styles.summaryRow}>
          <View style={styles.smBox}>
            <Text style={styles.smLbl}>Aktif</Text>
            <Text style={[styles.smVal, { color: UI_COLORS.mint }]}>5</Text>
          </View>
          <View style={styles.smBox}>
            <Text style={styles.smLbl}>Total/bulan</Text>
            <Text style={[styles.smVal, { color: UI_COLORS.red }]}>Rp 3,58jt</Text>
          </View>
          <View style={styles.smBox}>
            <Text style={styles.smLbl}>Nonaktif</Text>
            <Text style={[styles.smVal, { color: UI_COLORS.t3 }]}>2</Text>
          </View>
        </View>

        {/* UPCOMING CARD */}
        <View style={styles.upcomingCard}>
          <View style={styles.ucHeader}>
            <Ionicons name="time" size={16} color="#A89FF9" />
            <Text style={styles.ucTitle}>Akan tercatat minggu ini</Text>
            <View style={styles.ucBadge}><Text style={styles.ucBadgeTxt}>3 transaksi</Text></View>
          </View>
          <View style={styles.ucItem}>
            <View style={[styles.ucIcon, { backgroundColor: hexToRgba(UI_COLORS.violet, 0.12) }]}><Ionicons name="game-controller" size={16} color={UI_COLORS.violet} /></View>
            <View style={styles.ucInfo}><Text style={styles.ucName}>Netflix langganan</Text><Text style={styles.ucWhen}>Besok · 14 Jun · OVO Bayu</Text></View>
            <Text style={[styles.ucAmt, { color: UI_COLORS.red }]}>-Rp 54rb</Text>
          </View>
        </View>

        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>Bulanan ({monthlyItems.length})</Text>
          <TouchableOpacity onPress={scrollToForm}><Text style={styles.secAdd}>+ Tambah</Text></TouchableOpacity>
        </View>

        {monthlyItems.map((item) => (
          <View key={item.id} style={styles.recCard}>
            <View style={styles.rcTop}>
              <View style={[styles.rcIcon, { backgroundColor: hexToRgba(item.color, 0.12) }]}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <View style={styles.rcInfo}>
                <Text style={styles.rcName}>{item.name}</Text>
                <View style={styles.rcMeta}>
                  <View style={[styles.freqBadge, { backgroundColor: hexToRgba(item.color, 0.12) }]}>
                    <Text style={[styles.freqBadgeTxt, { color: item.color }]}>{item.freq}</Text>
                  </View>
                  <Text style={styles.rcType}>{item.meta}</Text>
                </View>
              </View>
              <View style={styles.rcRight}>
                <Text style={[styles.rcAmt, { color: item.type === 'income' ? UI_COLORS.mint : UI_COLORS.red }]}>
                  {item.type === 'income' ? '+' : '-'} Rp {item.amount}
                </Text>
                <Text style={styles.rcNext}>{item.next}</Text>
              </View>
            </View>
            
            <View style={styles.rcSchedule}>
              <View style={styles.rsLeft}>
                <Ionicons name="wallet" size={13} color={UI_COLORS.t3} />
                <Text style={styles.rsLbl}>{item.type === 'income' ? 'Ke:' : 'Dari:'}</Text>
                <Text style={styles.rsVal}>{item.source}</Text>
              </View>
              <View style={styles.rsRight}>
                <Text style={[styles.rsStatusTxt, { color: UI_COLORS.mint }]}>Aktif</Text>
                <View style={[styles.toggle, styles.togOn]}><View style={styles.togThumbOn} /></View>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>Tambah transaksi berulang</Text>
        </View>

        {/* ALWAYS VISIBLE FORM */}
        <View style={styles.newCard}>
          <View style={styles.ncHeader}>
            <Ionicons name="repeat" size={16} color="#A89FF9" />
            <Text style={styles.ncTitle}>Set transaksi rutin baru</Text>
          </View>
          <View style={styles.ncBody}>
            
            <View style={styles.nfGroup}>
              <Text style={styles.nfLbl}>Nama transaksi</Text>
              <View style={[styles.nfInputWrap, txName ? styles.nfFocused : null]}>
                <Ionicons name="pencil" size={15} color={UI_COLORS.t3} />
                <TextInput 
                  style={styles.nfInput} 
                  placeholder="Contoh: Spotify Premium" 
                  placeholderTextColor={UI_COLORS.t3} 
                  value={txName}
                  onChangeText={setTxName}
                />
              </View>
            </View>

            <View style={styles.nfGroup}>
              <Text style={styles.nfLbl}>Nominal</Text>
              <View style={[styles.nfInputWrap, txAmount ? styles.nfFocused : null]}>
                <Text style={{ fontSize: 13, color: UI_COLORS.t3 }}>Rp</Text>
                <TextInput 
                  style={styles.nfInput} 
                  placeholder="0" 
                  keyboardType="numeric" 
                  placeholderTextColor={UI_COLORS.t3} 
                  value={txAmount}
                  onChangeText={setTxAmount}
                />
              </View>
            </View>

            <View style={styles.nfGroup}>
              <Text style={styles.nfLbl}>Frekuensi</Text>
              <View style={styles.freqGrid}>
                <TouchableOpacity style={[styles.fgItem, freq === 'daily' && styles.fgItemSel]} onPress={() => setFreq('daily')}>
                  <Text style={[styles.fgLbl, freq === 'daily' ? { color: '#A89FF9' } : { color: UI_COLORS.text }]}>Harian</Text>
                  <Text style={styles.fgSub}>Setiap hari</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.fgItem, freq === 'weekly' && styles.fgItemSel]} onPress={() => setFreq('weekly')}>
                  <Text style={[styles.fgLbl, freq === 'weekly' ? { color: '#A89FF9' } : { color: UI_COLORS.text }]}>Mingguan</Text>
                  <Text style={styles.fgSub}>Per minggu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.fgItem, freq === 'monthly' && styles.fgItemSel]} onPress={() => setFreq('monthly')}>
                  <Text style={[styles.fgLbl, freq === 'monthly' ? { color: '#A89FF9' } : { color: UI_COLORS.text }]}>Bulanan</Text>
                  <Text style={styles.fgSub}>tgl 12</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.nfGroup}>
              <Text style={styles.nfLbl}>Metode pencatatan</Text>
              <View style={styles.methodRow}>
                <TouchableOpacity style={[styles.methodOpt, method === 'auto' && styles.methodOptSel]} onPress={() => setMethod('auto')}>
                  <Text style={[styles.moLbl, method === 'auto' ? { color: UI_COLORS.mint } : { color: UI_COLORS.text }]}>Otomatis</Text>
                  <Text style={styles.moSub}>Langsung tercatat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.methodOpt, method === 'reminder' && styles.methodOptSel]} onPress={() => setMethod('reminder')}>
                  <Text style={[styles.moLbl, method === 'reminder' ? { color: UI_COLORS.mint } : { color: UI_COLORS.text }]}>Reminder</Text>
                  <Text style={styles.moSub}>Notif dulu, catat manual</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.nfGroup, { marginBottom: 0 }]}>
              <Text style={styles.nfLbl}>Dari dompet</Text>
              <View style={styles.nfInputWrap}>
                <View style={{ width: 22, height: 22, borderRadius: 7, backgroundColor: hexToRgba(UI_COLORS.violet, 0.12), alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="wallet" size={12} color={UI_COLORS.violet} />
                </View>
                <Text style={{ flex: 1, fontSize: 13, color: UI_COLORS.text }}>{prefillWallet}</Text>
                <Ionicons name="chevron-down" size={14} color={UI_COLORS.t3} />
              </View>
            </View>

            <View style={styles.ncBtns}>
              <TouchableOpacity style={styles.btnCancel} onPress={() => { setTxName(''); setTxAmount(''); }}>
                <Text style={styles.btnCancelTxt}>Bersihkan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSave}>
                <Ionicons name="checkmark" size={14} color="#FFF" />
                <Text style={styles.btnSaveTxt}>Simpan</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollBody: { paddingBottom: 40 },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  backBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  iconBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { fontSize: 15, fontWeight: '500', color: UI_COLORS.text },
  summaryRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 12 },
  smBox: { flex: 1, backgroundColor: UI_COLORS.card2, borderWidth: 0.5, borderColor: UI_COLORS.b1, borderRadius: 12, paddingVertical: 10, alignItems: 'center' },
  smLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 2 },
  smVal: { fontSize: 13, fontWeight: '600' },
  upcomingCard: { marginHorizontal: 16, marginBottom: 12, backgroundColor: 'rgba(124,111,247,0.08)', borderWidth: 0.5, borderColor: 'rgba(124,111,247,0.25)', borderRadius: 16, padding: 14 },
  ucHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  ucTitle: { fontSize: 13, fontWeight: '500', color: '#A89FF9', flex: 1 },
  ucBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, backgroundColor: 'rgba(124,111,247,0.2)' },
  ucBadgeTxt: { fontSize: 10, color: '#A89FF9' },
  ucItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  ucIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  ucInfo: { flex: 1 },
  ucName: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text },
  ucWhen: { fontSize: 10, color: UI_COLORS.t3, marginTop: 1 },
  ucAmt: { fontSize: 12, fontWeight: '500' },
  secHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingTop: 8, paddingBottom: 8 },
  secLbl: { fontSize: 11, color: UI_COLORS.t3, textTransform: 'uppercase', letterSpacing: 0.5 },
  secAdd: { fontSize: 11, color: UI_COLORS.violet, fontWeight: '500' },
  recCard: { marginHorizontal: 16, marginBottom: 8, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, overflow: 'hidden' },
  rcTop: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 13, paddingVertical: 12 },
  rcIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  rcInfo: { flex: 1 },
  rcName: { fontSize: 13, fontWeight: '600', color: UI_COLORS.text, marginBottom: 3 },
  rcMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  freqBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20 },
  freqBadgeTxt: { fontSize: 9, fontWeight: '600' },
  rcType: { fontSize: 10, color: UI_COLORS.t3 },
  rcRight: { alignItems: 'flex-end' },
  rcAmt: { fontSize: 14, fontWeight: '600' },
  rcNext: { fontSize: 10, color: UI_COLORS.t3, marginTop: 2 },
  rcSchedule: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 13, paddingVertical: 10, backgroundColor: 'rgba(255,255,255,0.03)', borderTopWidth: 0.5, borderTopColor: UI_COLORS.b1 },
  rsLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rsLbl: { fontSize: 11, color: UI_COLORS.t2 },
  rsVal: { fontSize: 11, fontWeight: '500', color: UI_COLORS.text },
  rsRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rsStatusTxt: { fontSize: 11 },
  toggle: { width: 36, height: 20, borderRadius: 10, justifyContent: 'center' },
  togOn: { backgroundColor: UI_COLORS.mint },
  togThumbOn: { width: 14, height: 14, borderRadius: 7, backgroundColor: UI_COLORS.bg, position: 'absolute', right: 3 },
  newCard: { marginHorizontal: 16, marginTop: 4, marginBottom: 8, backgroundColor: 'rgba(124,111,247,0.06)', borderWidth: 1.5, borderColor: 'rgba(124,111,247,0.22)', borderStyle: 'dashed', borderRadius: 16 },
  ncHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderBottomWidth: 0.5, borderBottomColor: 'rgba(124,111,247,0.15)' },
  ncTitle: { fontSize: 13, fontWeight: '500', color: '#A89FF9' },
  ncBody: { padding: 12 },
  nfGroup: { marginBottom: 12 },
  nfLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 6 },
  nfInputWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 11, paddingHorizontal: 12, height: 44 },
  nfFocused: { borderColor: UI_COLORS.violet },
  nfInput: { flex: 1, fontSize: 13, color: UI_COLORS.text },
  freqGrid: { flexDirection: 'row', gap: 7 },
  fgItem: { flex: 1, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  fgItemSel: { backgroundColor: 'rgba(124,111,247,0.12)', borderColor: 'rgba(124,111,247,0.4)' },
  fgLbl: { fontSize: 11, fontWeight: '500' },
  fgSub: { fontSize: 10, color: UI_COLORS.t3, marginTop: 2 },
  methodRow: { flexDirection: 'row', gap: 8 },
  methodOpt: { flex: 1, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  methodOptSel: { backgroundColor: 'rgba(45,212,164,0.1)', borderColor: 'rgba(45,212,164,0.35)' },
  moLbl: { fontSize: 11, fontWeight: '500', marginBottom: 2 },
  moSub: { fontSize: 10, color: UI_COLORS.t3 },
  ncBtns: { flexDirection: 'row', gap: 8, marginTop: 12 },
  btnCancel: { flex: 1, height: 42, borderRadius: 11, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  btnCancelTxt: { fontSize: 13, color: UI_COLORS.t2 },
  btnSave: { flex: 1, height: 42, borderRadius: 11, backgroundColor: UI_COLORS.violet, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  btnSaveTxt: { fontSize: 13, fontWeight: '600', color: '#FFF' }
});
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UI_COLORS = {
  bg: '#0A1628', bg2: '#0F1E35', card: '#152238', card2: '#1A2A42',
  b1: 'rgba(255,255,255,0.08)', b2: 'rgba(255,255,255,0.15)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878', input: '#111E30'
};

export const AddTransactionScreen = ({ navigation, route }: any) => {
  // 1. STATE UTAMA
  const initialType = route?.params?.type ?? 'expense';
  const [txType, setTxType] = useState<'expense' | 'income' | 'transfer'>(initialType);
  const [amount, setAmount] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // 2. STATE FORM (Shared)
  const [note, setNote] = useState('');
  const [date, setDate] = useState('Hari ini, 11 Jun 2026');

  // Efek kursor berkedip
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  // Format nominal
  const formattedAmount = amount === '' ? '0' : Number(amount).toLocaleString('id-ID');

  const handleNumpad = (val: string) => {
    if (val === 'del') {
      setAmount(prev => prev.slice(0, -1));
    } else if (val === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + val);
    } else {
      if (amount.length < 12) setAmount(prev => (prev === '0' ? val : prev + val));
    }
  };

  // ==================== SUB-RENDER: FORM PENGELUARAN ====================
  const renderExpenseForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.secLbl}>Kategori Pengeluaran</Text>
      <View style={styles.catGrid}>
        {[
          { name: 'Belanja', icon: 'cart', color: UI_COLORS.red },
          { name: 'Makan', icon: 'restaurant', color: UI_COLORS.gold },
          { name: 'Transport', icon: 'car', color: UI_COLORS.mint },
          { name: 'Tagihan', icon: 'flash', color: UI_COLORS.violet },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.catItem}>
            <View style={[styles.catIcon, i === 0 && { borderColor: UI_COLORS.red, backgroundColor: 'rgba(255,107,107,0.1)' }]}>
              <Ionicons name={item.icon as any} size={20} color={item.color} />
            </View>
            <Text style={[styles.catLbl, i === 0 && { color: UI_COLORS.red }]}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.fieldRow}>
        <View style={[styles.fieldIcon, { backgroundColor: 'rgba(245,200,66,0.1)' }]}>
          <Ionicons name="home" size={16} color={UI_COLORS.gold} />
        </View>
        <View style={styles.fieldInfo}>
          <Text style={styles.fieldLbl}>Dari dompet</Text>
          <Text style={styles.fieldVal}>Kas keluarga — Rp 6.800.000</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
      </TouchableOpacity>
    </View>
  );

  // ==================== SUB-RENDER: FORM PEMASUKAN ====================
  const renderIncomeForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.secLbl}>Sumber Pemasukan</Text>
      <View style={styles.sourceGrid}>
        {[
          { name: 'Gaji', icon: 'briefcase', color: UI_COLORS.mint },
          { name: 'Freelance', icon: 'code', color: UI_COLORS.violet },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={[styles.sourceCard, i === 0 && styles.sourceCardSelected]}>
            <View style={styles.sourceTop}>
              <View style={[styles.sourceIcon, { backgroundColor: 'rgba(45,212,164,0.1)' }]}>
                <Ionicons name={item.icon as any} size={14} color={item.color} />
              </View>
              <Text style={styles.sourceName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // ==================== SUB-RENDER: FORM TRANSFER ====================
  const renderTransferForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.transferFlow}>
        
        <TouchableOpacity style={styles.walletSelector}>
          <View style={[styles.wsIcon, { backgroundColor: 'rgba(245,200,66,0.1)' }]}>
            <Ionicons name="home" size={18} color={UI_COLORS.gold} />
          </View>
          <View style={styles.wsInfo}>
            <Text style={styles.wsLbl}>Dari dompet</Text>
            <Text style={styles.wsName}>Kas Operasional</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
        </TouchableOpacity>

        <View style={styles.swapRow}>
          <View style={styles.swapDivider} />
          <TouchableOpacity style={styles.swapBtn}>
            <Ionicons name="swap-vertical" size={14} color={UI_COLORS.violet} />
          </TouchableOpacity>
          <View style={styles.swapDivider} />
        </View>

        <TouchableOpacity style={styles.walletSelector}>
          <View style={[styles.wsIcon, { backgroundColor: 'rgba(245,200,66,0.1)' }]}>
            <Ionicons name="home" size={18} color={UI_COLORS.gold} />
          </View>
          <View style={styles.wsInfo}>
            <Text style={styles.wsLbl}>Ke dompet</Text>
            <Text style={styles.wsName}>Kas keluarga</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
        </TouchableOpacity>

      </View>
    </View>
  );

  // ==================== RENDER UTAMA ====================
  const themeColor = txType === 'expense' ? UI_COLORS.red : txType === 'income' ? UI_COLORS.mint : UI_COLORS.violet;

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <View style={styles.topbarCenter}>
          <Text style={styles.pageTitle}>Catat transaksi</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="time" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
      </View>

      {/* TABS */}
      <View style={styles.tabsWrap}>
        <TouchableOpacity style={[styles.tab, txType === 'expense' && styles.tabActiveRed]} onPress={() => setTxType('expense')}>
          <Ionicons name="arrow-up" size={14} color={txType === 'expense' ? UI_COLORS.bg : UI_COLORS.t3} />
          <Text style={[styles.tabTxt, { color: txType === 'expense' ? UI_COLORS.bg : UI_COLORS.t3 }]}>Keluar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, txType === 'income' && styles.tabActiveGreen]} onPress={() => setTxType('income')}>
          <Ionicons name="arrow-down" size={14} color={txType === 'income' ? UI_COLORS.bg : UI_COLORS.t3} />
          <Text style={[styles.tabTxt, { color: txType === 'income' ? UI_COLORS.bg : UI_COLORS.t3 }]}>Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, txType === 'transfer' && styles.tabActiveViolet]} onPress={() => setTxType('transfer')}>
          <Ionicons name="swap-horizontal" size={14} color={txType === 'transfer' ? '#FFF' : UI_COLORS.t3} />
          <Text style={[styles.tabTxt, { color: txType === 'transfer' ? '#FFF' : UI_COLORS.t3 }]}>Transfer</Text>
        </TouchableOpacity>
      </View>

      {/* AREA SCROLL (KONTEN) */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        
        <View style={styles.nominalArea}>
          <Text style={styles.nominalLbl}>Nominal {txType === 'expense' ? 'pengeluaran' : txType === 'income' ? 'pemasukan' : 'transfer'}</Text>
          <View style={styles.nominalDisplay}>
            <Text style={styles.nominalPrefix}>Rp</Text>
            <Text style={[styles.nominalVal, { color: themeColor }]}>{formattedAmount}</Text>
            <View style={[styles.nominalCursor, { backgroundColor: themeColor, opacity: showCursor ? 1 : 0 }]} />
          </View>
        </View>

        {/* RENDER DINAMIS */}
        {txType === 'expense' && renderExpenseForm()}
        {txType === 'income' && renderIncomeForm()}
        {txType === 'transfer' && renderTransferForm()}

        {/* AREA UNIVERSAL */}
        <View style={{ paddingHorizontal: 18, marginTop: 10 }}>
          <TouchableOpacity style={styles.fieldRow}>
            <View style={[styles.fieldIcon, { backgroundColor: 'rgba(124,111,247,0.1)' }]}>
              <Ionicons name="calendar" size={16} color={UI_COLORS.violet} />
            </View>
            <View style={styles.fieldInfo}>
              <Text style={styles.fieldLbl}>Tanggal & waktu</Text>
              <Text style={styles.fieldVal}>{date}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
          </TouchableOpacity>
          
          <View style={styles.noteField}>
            <View style={[styles.fieldIcon, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <Ionicons name="pencil" size={16} color={UI_COLORS.t2} />
            </View>
            <View style={styles.fieldInfo}>
              <Text style={styles.fieldLbl}>Catatan</Text>
              <Text style={styles.fieldVal}>Tambah catatan...</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* NUMPAD BAWAH */}
      <View style={styles.numpad}>
        <View style={styles.numpadGrid}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'].map((key) => (
            <TouchableOpacity key={key} style={styles.nkey} onPress={() => handleNumpad(key)}>
              {key === 'del' ? (
                <Ionicons name="backspace" size={20} color={themeColor} />
              ) : (
                <Text style={styles.nkeyTxt}>{key}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={[styles.btnSave, { backgroundColor: themeColor }]}>
          <Text style={styles.btnSaveTxt}>Simpan {txType === 'expense' ? 'Pengeluaran' : txType === 'income' ? 'Pemasukan' : 'Transfer'}</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 8 },
  topbarCenter: { flex: 1, alignItems: 'center' },
  pageTitle: { fontSize: 15, fontWeight: '600', color: UI_COLORS.text },
  iconBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  tabsWrap: { flexDirection: 'row', backgroundColor: UI_COLORS.card2, borderRadius: 12, padding: 3, marginHorizontal: 18, marginBottom: 14 },
  tab: { flex: 1, height: 34, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  tabActiveRed: { backgroundColor: UI_COLORS.red },
  tabActiveGreen: { backgroundColor: UI_COLORS.mint },
  tabActiveViolet: { backgroundColor: UI_COLORS.violet },
  tabTxt: { fontSize: 12, fontWeight: '600' },
  nominalArea: { paddingHorizontal: 18, paddingVertical: 16, alignItems: 'center' },
  nominalLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 8 },
  nominalDisplay: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  nominalPrefix: { fontSize: 20, color: UI_COLORS.t2 },
  nominalVal: { fontSize: 40, fontWeight: '600', letterSpacing: -1 },
  nominalCursor: { width: 3, height: 36, borderRadius: 2 },
  formContainer: { paddingHorizontal: 18 },
  secLbl: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, marginBottom: 12 },
  catGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  catItem: { alignItems: 'center', gap: 6 },
  catIcon: { width: 48, height: 48, borderRadius: 16, borderWidth: 1.5, borderColor: 'transparent', alignItems: 'center', justifyContent: 'center' },
  catLbl: { fontSize: 10, color: UI_COLORS.t2 },
  sourceGrid: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  sourceCard: { flex: 1, backgroundColor: UI_COLORS.card, borderRadius: 14, padding: 12, borderWidth: 0.5, borderColor: UI_COLORS.b2 },
  sourceCardSelected: { borderColor: UI_COLORS.mint, backgroundColor: 'rgba(45,212,164,0.05)' },
  sourceTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sourceIcon: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  sourceName: { fontSize: 12, fontWeight: '600', color: UI_COLORS.text },
  transferFlow: { backgroundColor: UI_COLORS.card, borderRadius: 16, padding: 12, borderWidth: 0.5, borderColor: UI_COLORS.b2 },
  walletSelector: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 8 },
  wsIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  wsInfo: { flex: 1 },
  wsLbl: { fontSize: 10, color: UI_COLORS.t3 },
  wsName: { fontSize: 13, fontWeight: '600', color: UI_COLORS.text },
  swapRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  swapDivider: { flex: 1, height: 0.5, backgroundColor: UI_COLORS.b2 },
  swapBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: UI_COLORS.bg2, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: UI_COLORS.b2 },
  fieldRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: UI_COLORS.card, borderRadius: 13, padding: 12, marginBottom: 8, borderWidth: 0.5, borderColor: UI_COLORS.b2 },
  fieldIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  fieldInfo: { flex: 1 },
  fieldLbl: { fontSize: 11, color: UI_COLORS.t3 },
  fieldVal: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text },
  noteField: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: UI_COLORS.card, borderRadius: 13, padding: 12, borderWidth: 0.5, borderColor: UI_COLORS.b2 },
  numpad: { backgroundColor: UI_COLORS.bg2, borderTopWidth: 0.5, borderTopColor: UI_COLORS.b1, padding: 16 },
  numpadGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 },
  nkey: { width: '31%', height: 46, borderRadius: 12, backgroundColor: UI_COLORS.card, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  nkeyTxt: { fontSize: 20, fontWeight: '600', color: UI_COLORS.text },
  btnSave: { height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  btnSaveTxt: { fontSize: 15, fontWeight: '700', color: UI_COLORS.bg }
});
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UI_COLORS = {
  bg: '#0A1628', bg2: '#0F1E35', card: '#152238', card2: '#1A2A42',
  b1: 'rgba(255,255,255,0.08)', b2: 'rgba(255,255,255,0.15)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878', input: '#111E30'
};

export const AddTransactionScreen = ({ navigation, route }: any) => {
  const initialType = route?.params?.type ?? 'expense';
  const [txType, setTxType] = useState<'expense' | 'income' | 'transfer'>(initialType);
  const [amount, setAmount] = useState('6500000');
  const [selectedSource, setSelectedSource] = useState('gaji');
  const [showCursor, setShowCursor] = useState(true);

  // Efek kursor berkedip
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  // Format nominal (Ribuan)
  const formattedAmount = Number(amount || 0).toLocaleString('id-ID');

  // Numpad handler simulasi
  const handleNumpad = (val: string) => {
    if (val === 'del') {
      setAmount(prev => prev.slice(0, -1));
    } else if (val === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + val);
    } else {
      setAmount(prev => (prev === '0' ? val : prev + val));
    }
  };

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
        <TouchableOpacity style={[styles.tab, txType === 'expense' ? styles.tabActiveRed : styles.tabIdle]} onPress={() => setTxType('expense')}>
          <Ionicons name="arrow-up-right" size={14} color={txType === 'expense' ? UI_COLORS.bg : UI_COLORS.t3} />
          <Text style={[styles.tabTxt, { color: txType === 'expense' ? UI_COLORS.bg : UI_COLORS.t3 }]}>Keluar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, txType === 'income' ? styles.tabActiveGreen : styles.tabIdle]} onPress={() => setTxType('income')}>
          <Ionicons name="arrow-down-left" size={14} color={txType === 'income' ? UI_COLORS.bg : UI_COLORS.t3} />
          <Text style={[styles.tabTxt, { color: txType === 'income' ? UI_COLORS.bg : UI_COLORS.t3 }]}>Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, txType === 'transfer' ? styles.tabActiveViolet : styles.tabIdle]} onPress={() => setTxType('transfer')}>
          <Ionicons name="swap-horizontal" size={14} color={txType === 'transfer' ? UI_COLORS.bg : UI_COLORS.t3} />
          <Text style={[styles.tabTxt, { color: txType === 'transfer' ? UI_COLORS.bg : UI_COLORS.t3 }]}>Transfer</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        
        {/* NOMINAL AREA */}
        <View style={styles.nominalArea}>
          <Text style={styles.nominalLbl}>Nominal pemasukan</Text>
          <View style={styles.nominalDisplay}>
            <Text style={styles.nominalPrefix}>Rp</Text>
            <Text style={styles.nominalVal}>{amount ? formattedAmount : '0'}</Text>
            <View style={[styles.nominalCursor, { opacity: showCursor ? 1 : 0 }]} />
          </View>
          <View style={styles.incomeBadge}>
            <Ionicons name="trending-up" size={12} color={UI_COLORS.mint} />
            <Text style={{ fontSize: 11, color: UI_COLORS.mint }}>+Rp 6,5jt akan masuk ke saldo keluarga</Text>
          </View>
        </View>

        {/* SUMBER PEMASUKAN */}
        <View style={styles.section}>
          <Text style={styles.secLbl}>Sumber pemasukan</Text>
          <View style={styles.sourceGrid}>
            {[
              { id: 'gaji', name: 'Gaji', type: 'Rutin bulanan', icon: 'briefcase', color: UI_COLORS.mint, bg: 'rgba(45,212,164,0.12)' },
              { id: 'freelance', name: 'Freelance', type: 'Project lepas', icon: 'code', color: UI_COLORS.violet, bg: 'rgba(124,111,247,0.12)' },
              { id: 'usaha', name: 'Usaha', type: 'Bisnis keluarga', icon: 'storefront', color: UI_COLORS.gold, bg: 'rgba(245,200,66,0.12)' },
              { id: 'lainnya', name: 'Lainnya', type: 'Hadiah, bonus', icon: 'ellipsis-horizontal', color: UI_COLORS.t2, bg: 'rgba(255,255,255,0.06)' },
            ].map(src => (
              <TouchableOpacity 
                key={src.id} 
                style={[styles.sourceCard, selectedSource === src.id && styles.sourceCardSelected]}
                onPress={() => setSelectedSource(src.id)}
                activeOpacity={0.7}
              >
                <View style={styles.sourceTop}>
                  <View style={[styles.sourceIcon, { backgroundColor: src.bg }]}><Ionicons name={src.icon as any} size={14} color={src.color} /></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.sourceName}>{src.name}</Text>
                    <Text style={styles.sourceType}>{src.type}</Text>
                  </View>
                  {selectedSource === src.id && (
                    <View style={styles.sourceCheck}><Ionicons name="checkmark" size={10} color={UI_COLORS.bg} /></View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FIELDS & SPLIT */}
        <View style={styles.section}>
          
          <TouchableOpacity style={styles.fieldRow}>
            <View style={[styles.fieldIcon, { backgroundColor: 'rgba(45,212,164,0.1)' }]}><Ionicons name="business" size={16} color={UI_COLORS.mint} /></View>
            <View style={styles.fieldInfo}>
              <Text style={styles.fieldLbl}>Masuk ke dompet</Text>
              <Text style={styles.fieldVal}>BCA Bayu — saldo Rp 4.100.000</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
          </TouchableOpacity>

          <View style={styles.splitCard}>
            <View style={styles.splitHeader}>
              <Ionicons name="git-network" size={16} color={UI_COLORS.mint} />
              <Text style={styles.splitTitle}>Split otomatis ke dompet lain</Text>
              <View style={styles.splitToggle}><View style={styles.splitToggleKnob} /></View>
            </View>
            
            <View style={styles.splitRow}>
              <View style={styles.splitWallet}><View style={[styles.splitWIcon, {backgroundColor:'rgba(45,212,164,0.1)'}]}><Ionicons name="business" size={12} color={UI_COLORS.mint} /></View><Text style={styles.splitWName}>BCA Bayu</Text></View>
              <Text style={[styles.splitPct, {color: UI_COLORS.mint}]}>60% — Rp 3.900.000</Text>
            </View>
            <View style={styles.splitBarWrap}><View style={styles.splitBarTrack}><View style={[styles.splitBarFill, {width: '60%', backgroundColor: UI_COLORS.mint}]} /></View></View>

            <View style={styles.splitRow}>
              <View style={styles.splitWallet}><View style={[styles.splitWIcon, {backgroundColor:'rgba(245,200,66,0.1)'}]}><Ionicons name="home" size={12} color={UI_COLORS.gold} /></View><Text style={styles.splitWName}>Kas keluarga</Text></View>
              <Text style={[styles.splitPct, {color: UI_COLORS.gold}]}>30% — Rp 1.950.000</Text>
            </View>
            <View style={styles.splitBarWrap}><View style={styles.splitBarTrack}><View style={[styles.splitBarFill, {width: '30%', backgroundColor: UI_COLORS.gold}]} /></View></View>

            <View style={styles.splitRow}>
              <View style={styles.splitWallet}><View style={[styles.splitWIcon, {backgroundColor:'rgba(124,111,247,0.1)'}]}><Ionicons name="wallet" size={12} color={UI_COLORS.violet} /></View><Text style={styles.splitWName}>Dana darurat</Text></View>
              <Text style={[styles.splitPct, {color: UI_COLORS.violet}]}>10% — Rp 650.000</Text>
            </View>
            <View style={styles.splitBarWrap}><View style={styles.splitBarTrack}><View style={[styles.splitBarFill, {width: '10%', backgroundColor: UI_COLORS.violet}]} /></View></View>
          </View>

          <TouchableOpacity style={styles.fieldRow}>
            <View style={[styles.fieldIcon, { backgroundColor: 'rgba(124,111,247,0.12)' }]}><Ionicons name="calendar" size={16} color={UI_COLORS.violet} /></View>
            <View style={styles.fieldInfo}>
              <Text style={styles.fieldLbl}>Tanggal & waktu</Text>
              <Text style={styles.fieldVal}>Hari ini, 11 Jun 2026 · 08:00</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.noteField}>
            <View style={[styles.fieldIcon, { backgroundColor: 'rgba(45,212,164,0.1)' }]}><Ionicons name="pencil" size={16} color={UI_COLORS.mint} /></View>
            <View style={styles.fieldInfo}>
              <Text style={styles.fieldLbl}>Catatan</Text>
              <Text style={styles.fieldVal}>Gaji Juni 2026</Text>
            </View>
          </TouchableOpacity>

        </View>

        {/* EXTRAS */}
        <View style={styles.section}>
          <View style={styles.extrasRow}>
            <TouchableOpacity style={styles.extraBtn}><Ionicons name="repeat" size={14} color={UI_COLORS.t2} /><Text style={styles.extraBtnTxt}>Rutin bulanan</Text></TouchableOpacity>
            <TouchableOpacity style={styles.extraBtn}><Ionicons name="pricetag" size={14} color={UI_COLORS.t2} /><Text style={styles.extraBtnTxt}>Tambah tag</Text></TouchableOpacity>
            <TouchableOpacity style={styles.extraBtn}><Ionicons name="briefcase" size={14} color={UI_COLORS.t2} /><Text style={styles.extraBtnTxt}>Link project</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* FIXED NUMPAD */}
      <View style={styles.numpad}>
        <View style={styles.numpadGrid}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'].map((key) => (
            <TouchableOpacity 
              key={key} 
              style={[styles.nkey, key === 'del' && styles.nkeyDel]}
              onPress={() => handleNumpad(key)}
              activeOpacity={0.6}
            >
              {key === 'del' ? (
                <Ionicons name="backspace" size={20} color={UI_COLORS.mint} />
              ) : (
                <Text style={[styles.nkeyTxt, key === '.' && { color: UI_COLORS.t2, fontSize: 24 }]}>{key}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.btnSave}>
          <Ionicons name="checkmark" size={18} color={UI_COLORS.bg} />
          <Text style={styles.btnSaveTxt}>Simpan pemasukan</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  
  /* TOPBAR */
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 8 },
  topbarCenter: { flex: 1, alignItems: 'center' },
  pageTitle: { fontSize: 15, fontWeight: '600', color: UI_COLORS.text },
  iconBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  
  /* TABS */
  tabsWrap: { flexDirection: 'row', backgroundColor: UI_COLORS.card2, borderRadius: 12, padding: 3, marginHorizontal: 18, marginBottom: 14 },
  tab: { flex: 1, height: 34, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  tabIdle: { backgroundColor: 'transparent' },
  tabActiveRed: { backgroundColor: UI_COLORS.red },
  tabActiveGreen: { backgroundColor: UI_COLORS.mint },
  tabActiveViolet: { backgroundColor: UI_COLORS.violet },
  tabTxt: { fontSize: 12, fontWeight: '600' },
  
  /* NOMINAL */
  nominalArea: { paddingHorizontal: 18, paddingBottom: 16, alignItems: 'center' },
  nominalLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 8, letterSpacing: 0.5 },
  nominalDisplay: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 10 },
  nominalPrefix: { fontSize: 20, color: UI_COLORS.t2 },
  nominalVal: { fontSize: 40, fontWeight: '600', color: UI_COLORS.mint, letterSpacing: -1 },
  nominalCursor: { width: 3, height: 36, backgroundColor: UI_COLORS.mint, borderRadius: 2 },
  incomeBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(45,212,164,0.1)', borderWidth: 0.5, borderColor: 'rgba(45,212,164,0.25)', borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10 },
  
  /* SECTIONS */
  section: { paddingHorizontal: 18, marginBottom: 10 },
  secLbl: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, marginBottom: 8 },
  
  /* SOURCE GRID */
  sourceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sourceCard: { width: '48.5%', backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 12 },
  sourceCardSelected: { borderColor: 'rgba(45,212,164,0.5)', backgroundColor: 'rgba(45,212,164,0.06)' },
  sourceTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sourceIcon: { width: 28, height: 28, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  sourceName: { fontSize: 12, fontWeight: '600', color: UI_COLORS.text },
  sourceType: { fontSize: 10, color: UI_COLORS.t3 },
  sourceCheck: { width: 16, height: 16, borderRadius: 8, backgroundColor: UI_COLORS.mint, alignItems: 'center', justifyContent: 'center' },
  
  /* FIELDS */
  fieldRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 13, padding: 12, marginBottom: 8 },
  fieldIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  fieldInfo: { flex: 1 },
  fieldLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 2 },
  fieldVal: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text },
  
  /* SPLIT CARD */
  splitCard: { backgroundColor: 'rgba(45,212,164,0.06)', borderWidth: 0.5, borderColor: 'rgba(45,212,164,0.2)', borderRadius: 13, padding: 12, marginBottom: 8 },
  splitHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  splitTitle: { fontSize: 13, fontWeight: '600', color: UI_COLORS.mint, flex: 1 },
  splitToggle: { width: 36, height: 20, borderRadius: 10, backgroundColor: UI_COLORS.mint, justifyContent: 'center' },
  splitToggleKnob: { width: 14, height: 14, borderRadius: 7, backgroundColor: UI_COLORS.bg, position: 'absolute', right: 3 },
  splitRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  splitWallet: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  splitWIcon: { width: 22, height: 22, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  splitWName: { fontSize: 12, color: UI_COLORS.text, fontWeight: '500' },
  splitPct: { fontSize: 12, fontWeight: '600' },
  splitBarWrap: { paddingLeft: 30, paddingBottom: 10 },
  splitBarTrack: { height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2 },
  splitBarFill: { height: 4, borderRadius: 2 },

  /* NOTE */
  noteField: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: 'rgba(45,212,164,0.25)', borderRadius: 13, padding: 12, marginBottom: 8 },
  
  /* EXTRAS */
  extrasRow: { flexDirection: 'row', gap: 8 },
  extraBtn: { flex: 1, height: 38, borderRadius: 11, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },
  extraBtnTxt: { fontSize: 11, color: UI_COLORS.t2, fontWeight: '500' },

  /* NUMPAD */
  numpad: { backgroundColor: UI_COLORS.bg2, borderTopWidth: 0.5, borderTopColor: UI_COLORS.b1, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 16 },
  numpadGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 10 },
  nkey: { width: '32%', height: 48, borderRadius: 13, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b1, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  nkeyDel: { backgroundColor: 'rgba(45,212,164,0.06)', borderColor: 'rgba(45,212,164,0.15)' },
  nkeyTxt: { fontSize: 20, fontWeight: '500', color: UI_COLORS.text },
  btnSave: { width: '100%', height: 52, borderRadius: 16, backgroundColor: UI_COLORS.mint, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnSaveTxt: { fontSize: 15, fontWeight: '600', color: UI_COLORS.bg },
});
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UI_COLORS = {
  bg: '#0A1628', bg2: '#0F1E35', card: '#152238', card2: '#1A2A42',
  b1: 'rgba(255,255,255,0.08)', b2: 'rgba(255,255,255,0.15)',
  gold: '#F5C842', mint: '#2DD4A4', red: '#FF6B6B', violet: '#7C6FF7',
  text: '#F0F4FF', t2: '#8FA8CC', t3: '#3E5878'
};

const { width } = Dimensions.get('window');

export const AddTransactionScreen = ({ navigation, route }: any) => {
  const initialType = route?.params?.type ?? 'expense';
  const [txType, setTxType] = useState<'expense' | 'income' | 'transfer'>(initialType);
  const [amount, setAmount] = useState('6500000');
  const [showCursor, setShowCursor] = useState(true);

  // States khusus Form
  const [selectedIncomeSource, setSelectedIncomeSource] = useState('gaji');
  const [selectedExpenseCat, setSelectedExpenseCat] = useState('belanja');
  const [transferMethod, setTransferMethod] = useState('manual');

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

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

  const themeColor = txType === 'expense' ? UI_COLORS.red : txType === 'income' ? UI_COLORS.mint : UI_COLORS.violet;

  // ==================== SUB-RENDER: PENGELUARAN (Sesuai Mockup) ====================
  const renderExpense = () => (
    <View style={styles.section}>
      <Text style={styles.secLbl}>Kategori</Text>
      <View style={styles.expenseGrid}>
        {[
          { id: 'belanja', name: 'Belanja', icon: 'cart', color: UI_COLORS.red, bg: 'rgba(255,107,107,0.15)' },
          { id: 'makan', name: 'Makan', icon: 'restaurant', color: UI_COLORS.gold, bg: 'rgba(245,200,66,0.1)' },
          { id: 'transport', name: 'Transport', icon: 'car', color: UI_COLORS.mint, bg: 'rgba(45,212,164,0.1)' },
          { id: 'tagihan', name: 'Tagihan', icon: 'flash', color: UI_COLORS.violet, bg: 'rgba(124,111,247,0.1)' },
          { id: 'kesehatan', name: 'Kesehatan', icon: 'fitness', color: UI_COLORS.mint, bg: 'rgba(45,212,164,0.1)' },
          { id: 'hiburan', name: 'Hiburan', icon: 'game-controller', color: UI_COLORS.red, bg: 'rgba(255,107,107,0.1)' },
          { id: 'pendidikan', name: 'Pendidikan', icon: 'school', color: '#A78BFA', bg: 'rgba(139,92,246,0.1)' },
          { id: 'lainnya', name: 'Lainnya', icon: 'ellipsis-horizontal', color: UI_COLORS.t2, bg: 'rgba(255,255,255,0.06)' },
        ].map(cat => (
          <TouchableOpacity key={cat.id} style={styles.expenseCatItem} onPress={() => setSelectedExpenseCat(cat.id)}>
            <View style={[styles.expenseCatIcon, { backgroundColor: cat.bg }, selectedExpenseCat === cat.id && { borderColor: 'rgba(255,107,107,0.6)' }]}>
              <Ionicons name={cat.icon as any} size={20} color={cat.color} />
            </View>
            <Text style={[styles.expenseCatLbl, selectedExpenseCat === cat.id && { color: UI_COLORS.red }]}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.fieldRow}>
        <View style={[styles.fieldIcon, { backgroundColor: 'rgba(245,200,66,0.12)' }]}><Ionicons name="home" size={16} color={UI_COLORS.gold} /></View>
        <View style={styles.fieldInfo}><Text style={styles.fieldLbl}>Dari dompet</Text><Text style={styles.fieldVal}>Kas keluarga — Rp 6.800.000</Text></View>
        <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.fieldRow}>
        <View style={[styles.fieldIcon, { backgroundColor: 'rgba(124,111,247,0.12)' }]}><Ionicons name="calendar" size={16} color={UI_COLORS.violet} /></View>
        <View style={styles.fieldInfo}><Text style={styles.fieldLbl}>Tanggal & waktu</Text><Text style={styles.fieldVal}>Hari ini, 11 Jun 2026 · 11:24</Text></View>
        <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.noteField, { borderColor: 'rgba(245,200,66,0.3)' }]}>
        <View style={[styles.fieldIcon, { backgroundColor: 'rgba(245,200,66,0.1)' }]}><Ionicons name="pencil" size={16} color={UI_COLORS.gold} /></View>
        <View style={styles.fieldInfo}><Text style={styles.fieldLbl}>Catatan</Text><Text style={styles.fieldVal}>Belanja Indomaret — snack + minum</Text></View>
      </TouchableOpacity>

      <View style={styles.extrasRow}>
        <TouchableOpacity style={styles.extraBtn}><Ionicons name="camera" size={16} color={UI_COLORS.t2} /><Text style={styles.extraBtnTxt}>Foto struk</Text></TouchableOpacity>
        <TouchableOpacity style={styles.extraBtn}><Ionicons name="pricetag" size={16} color={UI_COLORS.t2} /><Text style={styles.extraBtnTxt}>Tambah tag</Text></TouchableOpacity>
        <TouchableOpacity 
          style={styles.extraBtn} 
          onPress={() => navigation.navigate('Recurring', {
            // Kita buat nama otomatis dari kategori dan catatan
            prefillName: `${selectedExpenseCat.toUpperCase()} - Pengeluaran Rutin`,
            prefillAmount: amount, // Pakai state amount langsung (tanpa titik format)
            prefillWallet: 'Kas keluarga' // Sesuai dengan mockup yang sedang aktif
          })}
        >
          <Ionicons name="repeat" size={16} color={UI_COLORS.t2} />
          <Text style={styles.extraBtnTxt}>Berulang</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recurringBadge}>
        <Ionicons name="information-circle" size={16} color={UI_COLORS.violet} style={{ flexShrink: 0 }} />
        <View>
          <Text style={styles.rbTitle}>Mirip transaksi berulang</Text>
          <Text style={styles.rbDesc}>Belanja Indomaret minggu lalu Rp 92.000 — jadikan rutin?</Text>
        </View>
      </View>
    </View>
  );

  // ==================== SUB-RENDER: PEMASUKAN (Sesuai Mockup) ====================
  const renderIncome = () => (
    <View style={styles.section}>
      <Text style={styles.secLbl}>Sumber pemasukan</Text>
      <View style={styles.sourceGrid}>
        {[
          { id: 'gaji', name: 'Gaji', type: 'Rutin bulanan', icon: 'briefcase', color: UI_COLORS.mint, bg: 'rgba(45,212,164,0.12)' },
          { id: 'freelance', name: 'Freelance', type: 'Project lepas', icon: 'code', color: UI_COLORS.violet, bg: 'rgba(124,111,247,0.12)' },
          { id: 'usaha', name: 'Usaha', type: 'Bisnis keluarga', icon: 'storefront', color: UI_COLORS.gold, bg: 'rgba(245,200,66,0.12)' },
          { id: 'lainnya', name: 'Lainnya', type: 'Hadiah, bonus', icon: 'ellipsis-horizontal', color: UI_COLORS.t2, bg: 'rgba(255,255,255,0.06)' },
        ].map(src => (
          <TouchableOpacity key={src.id} style={[styles.sourceCard, selectedIncomeSource === src.id && styles.sourceCardSelected]} onPress={() => setSelectedIncomeSource(src.id)}>
            <View style={styles.sourceTop}>
              <View style={[styles.sourceIcon, { backgroundColor: src.bg }]}><Ionicons name={src.icon as any} size={14} color={src.color} /></View>
              <View style={{ flex: 1 }}><Text style={styles.sourceName}>{src.name}</Text><Text style={styles.sourceType}>{src.type}</Text></View>
              {selectedIncomeSource === src.id && <View style={styles.sourceCheck}><Ionicons name="checkmark" size={10} color={UI_COLORS.bg} /></View>}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.fieldRow}>
        <View style={[styles.fieldIcon, { backgroundColor: 'rgba(45,212,164,0.1)' }]}><Ionicons name="business" size={16} color={UI_COLORS.mint} /></View>
        <View style={styles.fieldInfo}><Text style={styles.fieldLbl}>Masuk ke dompet</Text><Text style={styles.fieldVal}>BCA Bayu — saldo Rp 4.100.000</Text></View>
        <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
      </TouchableOpacity>

      {/* SPLIT WALLET */}
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
        <View style={styles.fieldInfo}><Text style={styles.fieldLbl}>Tanggal & waktu</Text><Text style={styles.fieldVal}>Hari ini, 11 Jun 2026 · 08:00</Text></View>
        <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.noteField, { borderColor: 'rgba(45,212,164,0.25)' }]}>
        <View style={[styles.fieldIcon, { backgroundColor: 'rgba(45,212,164,0.1)' }]}><Ionicons name="pencil" size={16} color={UI_COLORS.mint} /></View>
        <View style={styles.fieldInfo}><Text style={styles.fieldLbl}>Catatan</Text><Text style={styles.fieldVal}>Gaji Juni 2026</Text></View>
      </TouchableOpacity>

      <View style={styles.extrasRow}>
        <TouchableOpacity 
          style={styles.extraBtn} 
          onPress={() => navigation.navigate('Recurring', {
            // Kita buat nama otomatis dari sumber pemasukan
            prefillName: `${selectedIncomeSource.toUpperCase()} - Pemasukan Rutin`,
            prefillAmount: amount, // Pakai state amount
            prefillWallet: 'BCA Bayu' // Sesuai dompet pemasukan di mockup
          })}
        >
          <Ionicons name="repeat" size={16} color={UI_COLORS.t2} />
          <Text style={styles.extraBtnTxt}>Berulang</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.extraBtn}><Ionicons name="pricetag" size={16} color={UI_COLORS.t2} /><Text style={styles.extraBtnTxt}>Tambah tag</Text></TouchableOpacity>
        <TouchableOpacity style={styles.extraBtn}><Ionicons name="briefcase" size={16} color={UI_COLORS.t2} /><Text style={styles.extraBtnTxt}>Link project</Text></TouchableOpacity>
      </View>
    </View>
  );

  // ==================== SUB-RENDER: TRANSFER (Sesuai Mockup) ====================
  const renderTransfer = () => (
    <View style={styles.section}>
      <Text style={styles.secLbl}>Dari & ke dompet</Text>
      
      <View style={styles.transferFlow}>
        <TouchableOpacity style={styles.walletSelector}>
          <View style={[styles.wsIcon, { backgroundColor: 'rgba(45,212,164,0.1)' }]}><Ionicons name="business" size={18} color={UI_COLORS.mint} /></View>
          <View style={styles.wsInfo}><Text style={styles.wsLbl}>Dari dompet</Text><Text style={styles.wsName}>BCA Bayu</Text><Text style={styles.wsSaldo}>Saldo: Rp 4.100.000</Text></View>
          <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
        </TouchableOpacity>

        <View style={styles.swapRow}>
          <View style={styles.swapDivider} />
          <TouchableOpacity style={styles.swapBtn}><Ionicons name="swap-vertical" size={14} color={UI_COLORS.violet} /></TouchableOpacity>
          <View style={styles.swapDivider} />
        </View>

        <TouchableOpacity style={styles.walletSelector}>
          <View style={[styles.wsIcon, { backgroundColor: 'rgba(245,200,66,0.12)' }]}><Ionicons name="home" size={18} color={UI_COLORS.gold} /></View>
          <View style={styles.wsInfo}><Text style={styles.wsLbl}>Ke dompet</Text><Text style={styles.wsName}>Kas keluarga</Text><Text style={styles.wsSaldo}>Saldo: Rp 6.800.000</Text></View>
          <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
        </TouchableOpacity>

        <View style={styles.saldoAfter}>
          <View style={styles.saItem}><Text style={styles.saLbl}>BCA Bayu setelah</Text><Text style={[styles.saVal, { color: UI_COLORS.red }]}>Rp 2.100.000</Text></View>
          <View style={{ width: 0.5, backgroundColor: UI_COLORS.b2 }} />
          <View style={styles.saItem}><Text style={styles.saLbl}>Kas keluarga setelah</Text><Text style={[styles.saVal, { color: UI_COLORS.mint }]}>Rp 8.800.000</Text></View>
        </View>

        <View style={styles.feeChip}>
          <Text style={styles.feeLbl}>Biaya transfer internal</Text>
          <Text style={styles.feeVal}>Gratis</Text>
        </View>
      </View>

      <Text style={styles.secLbl}>Metode pilih dompet tujuan</Text>
      <View style={styles.qrRow}>
        <TouchableOpacity style={[styles.qrCard, transferMethod === 'manual' && styles.qrCardSelected]} onPress={() => setTransferMethod('manual')}>
          <View style={[styles.qrIcon, { backgroundColor: 'rgba(124,111,247,0.12)' }]}><Ionicons name="list" size={20} color={UI_COLORS.violet} /></View>
          <Text style={styles.qrName}>Pilih manual</Text>
          <Text style={styles.qrDesc}>Pilih dari daftar dompetmu</Text>
          {transferMethod === 'manual' ? (
            <View style={styles.selCheck}><Ionicons name="checkmark" size={10} color="#FFF" /></View>
          ) : (
            <View style={styles.unselCheck} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.qrCard, transferMethod === 'qr' && styles.qrCardSelected]} onPress={() => { setTransferMethod('qr'); navigation.navigate('QRWallet'); }}>
          <View style={[styles.qrIcon, { backgroundColor: 'rgba(245,200,66,0.1)' }]}><Ionicons name="qr-code" size={20} color={UI_COLORS.gold} /></View>
          <Text style={styles.qrName}>Scan QR</Text>
          <Text style={styles.qrDesc}>Scan QR dompet tujuan</Text>
          {transferMethod === 'qr' ? (
            <View style={styles.selCheck}><Ionicons name="checkmark" size={10} color="#FFF" /></View>
          ) : (
            <View style={styles.unselCheck} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.fieldRow}>
        <View style={[styles.fieldIcon, { backgroundColor: 'rgba(124,111,247,0.12)' }]}><Ionicons name="calendar" size={16} color={UI_COLORS.violet} /></View>
        <View style={styles.fieldInfo}><Text style={styles.fieldLbl}>Tanggal & waktu</Text><Text style={styles.fieldVal}>Hari ini, 11 Jun 2026 · 09:41</Text></View>
        <Ionicons name="chevron-forward" size={16} color={UI_COLORS.t3} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.noteField, { borderColor: 'rgba(124,111,247,0.25)' }]}>
        <View style={[styles.fieldIcon, { backgroundColor: 'rgba(124,111,247,0.1)' }]}><Ionicons name="pencil" size={16} color={UI_COLORS.violet} /></View>
        <View style={styles.fieldInfo}><Text style={styles.fieldLbl}>Catatan</Text><Text style={styles.fieldVal}>Setor kas bulanan dari gaji</Text></View>
      </TouchableOpacity>
    </View>
  );

  // ==================== RENDER UTAMA ====================
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} /></TouchableOpacity>
        <View style={styles.topbarCenter}><Text style={styles.pageTitle}>Catat transaksi</Text></View>
        <TouchableOpacity style={styles.iconBtn}><Ionicons name="time" size={16} color={UI_COLORS.t2} /></TouchableOpacity>
      </View>

      {/* TABS (TETAP DI ATAS) */}
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

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        
        {/* NOMINAL AREA (Badge Berubah Sesuai Tab) */}
        <View style={styles.nominalArea}>
          <Text style={styles.nominalLbl}>Nominal {txType === 'expense' ? 'pengeluaran' : txType === 'income' ? 'pemasukan' : 'transfer'}</Text>
          <View style={styles.nominalDisplay}>
            <Text style={styles.nominalPrefix}>Rp</Text>
            <Text style={[styles.nominalVal, { color: themeColor }]}>{formattedAmount}</Text>
            <View style={[styles.nominalCursor, { backgroundColor: themeColor, opacity: showCursor ? 1 : 0 }]} />
          </View>

          {txType === 'expense' && (
            <View style={styles.budgetWarn}>
              <Ionicons name="warning" size={12} color="#FF9090" />
              <Text style={{ fontSize: 11, color: '#FF9090' }}>Belanja: Rp 420rb dari budget Rp 500rb</Text>
            </View>
          )}
          {txType === 'income' && (
            <View style={styles.incomeBadge}>
              <Ionicons name="trending-up" size={12} color={UI_COLORS.mint} />
              <Text style={{ fontSize: 11, color: UI_COLORS.mint }}>+Rp 6,5jt akan masuk ke saldo keluarga</Text>
            </View>
          )}
          {txType === 'transfer' && (
            <View style={styles.transferBadge}>
              <Ionicons name="swap-horizontal" size={12} color="#A89FF9" />
              <Text style={{ fontSize: 11, color: '#A89FF9' }}>Pindah antar dompet · tidak mempengaruhi total saldo</Text>
            </View>
          )}
        </View>

        {/* KONTEN FORM DINAMIS */}
        {txType === 'expense' && renderExpense()}
        {txType === 'income' && renderIncome()}
        {txType === 'transfer' && renderTransfer()}

      </ScrollView>

      {/* FIXED NUMPAD */}
      <View style={styles.numpad}>
        <View style={styles.numpadGrid}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'].map((key) => (
            <TouchableOpacity key={key} style={[styles.nkey, key === 'del' && { backgroundColor: txType === 'expense' ? 'rgba(255,107,107,0.08)' : txType === 'transfer' ? 'rgba(124,111,247,0.06)' : 'rgba(45,212,164,0.06)' }]} onPress={() => handleNumpad(key)}>
              {key === 'del' ? (
                <Ionicons name="backspace" size={20} color={txType === 'expense' ? '#FF9090' : txType === 'transfer' ? '#A89FF9' : UI_COLORS.mint} />
              ) : (
                <Text style={[styles.nkeyTxt, key === '.' && { color: UI_COLORS.t2, fontSize: 24 }]}>{key}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity 
		  style={[styles.btnSave, { backgroundColor: themeColor }]}
		  onPress={() => navigation.navigate('Confirmation', { type: txType, amount: formattedAmount })}
		>
          <Ionicons name={txType === 'expense' ? "checkmark" : txType === 'income' ? "checkmark" : "send"} size={18} color={txType === 'transfer' ? '#FFF' : UI_COLORS.bg} />
          <Text style={[styles.btnSaveTxt, txType === 'transfer' && { color: '#FFF' }]}>
            {txType === 'expense' ? 'Simpan pengeluaran' : txType === 'income' ? 'Simpan pemasukan' : 'Transfer sekarang'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  section: { paddingHorizontal: 18, marginBottom: 12 },
  secLbl: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, marginBottom: 8 },
  
  // TOPBAR & TABS
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  topbarCenter: { flex: 1, alignItems: 'center' },
  pageTitle: { fontSize: 15, fontWeight: '600', color: UI_COLORS.text },
  iconBtn: { width: 34, height: 34, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  tabsWrap: { flexDirection: 'row', backgroundColor: UI_COLORS.card2, borderRadius: 12, padding: 3, marginHorizontal: 18, marginBottom: 14 },
  tab: { flex: 1, height: 32, borderRadius: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  tabActiveRed: { backgroundColor: UI_COLORS.red },
  tabActiveGreen: { backgroundColor: UI_COLORS.mint },
  tabActiveViolet: { backgroundColor: UI_COLORS.violet },
  tabTxt: { fontSize: 12, fontWeight: '600' },
  
  // NOMINAL
  nominalArea: { paddingHorizontal: 18, paddingBottom: 16, alignItems: 'center' },
  nominalLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 8 },
  nominalDisplay: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8 },
  nominalPrefix: { fontSize: 20, color: UI_COLORS.t2 },
  nominalVal: { fontSize: 40, fontWeight: '500', letterSpacing: -1 },
  nominalCursor: { width: 2, height: 36, borderRadius: 2 },
  budgetWarn: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,107,107,0.1)', borderWidth: 0.5, borderColor: 'rgba(255,107,107,0.25)', borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10 },
  incomeBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(45,212,164,0.1)', borderWidth: 0.5, borderColor: 'rgba(45,212,164,0.25)', borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10 },
  transferBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(124,111,247,0.1)', borderWidth: 0.5, borderColor: 'rgba(124,111,247,0.25)', borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10 },

  // EXPENSE CAT GRID
  expenseGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 },
  expenseCatItem: { width: '23%', alignItems: 'center', gap: 5, marginBottom: 12 },
  expenseCatIcon: { width: 44, height: 44, borderRadius: 14, borderWidth: 1.5, borderColor: 'transparent', alignItems: 'center', justifyContent: 'center' },
  expenseCatLbl: { fontSize: 10, color: UI_COLORS.t2, textAlign: 'center' },
  recurringBadge: { flexDirection: 'row', gap: 6, backgroundColor: 'rgba(124,111,247,0.1)', borderWidth: 0.5, borderColor: 'rgba(124,111,247,0.25)', borderRadius: 11, padding: 12, marginTop: 4 },
  rbTitle: { fontSize: 12, fontWeight: '500', color: '#A89FF9' },
  rbDesc: { fontSize: 11, color: UI_COLORS.t3, marginTop: 2, paddingRight: 16 },

  // INCOME SOURCE GRID
  sourceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  sourceCard: { width: '48.5%', backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 12 },
  sourceCardSelected: { borderColor: 'rgba(45,212,164,0.5)', backgroundColor: 'rgba(45,212,164,0.06)' },
  sourceTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sourceIcon: { width: 28, height: 28, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  sourceName: { fontSize: 12, fontWeight: '600', color: UI_COLORS.text },
  sourceType: { fontSize: 10, color: UI_COLORS.t3 },
  sourceCheck: { width: 16, height: 16, borderRadius: 8, backgroundColor: UI_COLORS.mint, alignItems: 'center', justifyContent: 'center' },
  
  // SPLIT WALLET
  splitCard: { backgroundColor: 'rgba(45,212,164,0.06)', borderWidth: 0.5, borderColor: 'rgba(45,212,164,0.2)', borderRadius: 13, padding: 12, marginBottom: 8 },
  splitHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  splitTitle: { fontSize: 13, fontWeight: '500', color: UI_COLORS.mint, flex: 1 },
  splitToggle: { width: 36, height: 20, borderRadius: 10, backgroundColor: UI_COLORS.mint, justifyContent: 'center' },
  splitToggleKnob: { width: 14, height: 14, borderRadius: 7, backgroundColor: UI_COLORS.bg, position: 'absolute', right: 3 },
  splitRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  splitWallet: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  splitWIcon: { width: 22, height: 22, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  splitWName: { fontSize: 12, color: UI_COLORS.text },
  splitPct: { fontSize: 12, fontWeight: '500' },
  splitBarWrap: { paddingLeft: 30, paddingBottom: 8 },
  splitBarTrack: { height: 3, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2 },
  splitBarFill: { height: 3, borderRadius: 2 },

  // TRANSFER FLOW
  transferFlow: { backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, padding: 14, marginBottom: 16 },
  walletSelector: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 12 },
  wsIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  wsInfo: { flex: 1 },
  wsLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 2 },
  wsName: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text },
  wsSaldo: { fontSize: 11, color: UI_COLORS.t3 },
  swapRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10, paddingVertical: 4 },
  swapDivider: { flex: 1, height: 0.5, backgroundColor: UI_COLORS.b2 },
  swapBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(124,111,247,0.12)', borderWidth: 0.5, borderColor: 'rgba(124,111,247,0.25)', alignItems: 'center', justifyContent: 'center' },
  saldoAfter: { flexDirection: 'row', justifyContent: 'space-between', padding: 8, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 10, marginTop: 8, marginHorizontal: 10 },
  saItem: { flex: 1, alignItems: 'center' },
  saLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 2 },
  saVal: { fontSize: 12, fontWeight: '500' },
  feeChip: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 6, marginHorizontal: 10, marginTop: 8 },
  feeLbl: { fontSize: 11, color: UI_COLORS.t3 },
  feeVal: { fontSize: 11, color: UI_COLORS.mint, fontWeight: '500' },

  qrRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  qrCard: { flex: 1, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, padding: 12, alignItems: 'center' },
  qrCardSelected: { borderColor: 'rgba(124,111,247,0.5)', backgroundColor: 'rgba(124,111,247,0.06)' },
  qrIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  qrName: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text, textAlign: 'center' },
  qrDesc: { fontSize: 10, color: UI_COLORS.t3, textAlign: 'center', marginTop: 2, marginBottom: 8 },
  selCheck: { width: 16, height: 16, borderRadius: 8, backgroundColor: UI_COLORS.violet, alignItems: 'center', justifyContent: 'center' },
  unselCheck: { width: 16, height: 16, borderRadius: 8, borderWidth: 0.5, borderColor: UI_COLORS.b2, backgroundColor: UI_COLORS.card2 },

  // FIELDS & EXTRAS
  fieldRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 13, padding: 11, marginBottom: 8 },
  fieldIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  fieldInfo: { flex: 1 },
  fieldLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 1 },
  fieldVal: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text },
  noteField: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderRadius: 13, padding: 11, marginBottom: 8 },
  extrasRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  extraBtn: { flex: 1, height: 38, borderRadius: 11, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  extraBtnTxt: { fontSize: 12, color: UI_COLORS.t2 },

  // NUMPAD
  numpad: { backgroundColor: UI_COLORS.bg2, borderTopWidth: 0.5, borderTopColor: UI_COLORS.b1, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 16 },
  numpadGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 8 },
  nkey: { width: '32%', height: 46, borderRadius: 13, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b1, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  nkeyTxt: { fontSize: 20, fontWeight: '500', color: UI_COLORS.text },
  btnSave: { width: '100%', height: 50, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnSaveTxt: { fontSize: 15, fontWeight: '500', color: UI_COLORS.bg }
});
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UI_COLORS = {
  bg: '#0A1628', card: '#152238', card2: '#1A2A42',
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

export const TransactionDetailScreen = () => {
  const navigation = useNavigation<any>();
  
  // State untuk mengontrol mode tampilan (Detail vs Edit)
  const [isEditing, setIsEditing] = useState(false);
  
  // State form untuk mode Edit
  const [amount, setAmount] = useState('87.500');
  const [note, setNote] = useState('Belanja Indomaret — snack + minum');
  const [category, setCategory] = useState('Belanja');

  const categories = [
    { id: 'Belanja', icon: 'cart', color: UI_COLORS.red },
    { id: 'Makan', icon: 'fast-food', color: UI_COLORS.gold },
    { id: 'Transport', icon: 'car', color: UI_COLORS.mint },
    { id: 'Tagihan', icon: 'flash', color: UI_COLORS.violet },
    { id: 'Lainnya', icon: 'ellipsis-horizontal', color: UI_COLORS.t2 },
  ];

  const handleDelete = () => {
    Alert.alert(
      'Hapus Transaksi?',
      'Menghapus transaksi ini akan mengubah saldo dompet secara permanen.',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => navigation.goBack() }
      ]
    );
  };

  const handleSave = () => {
    Alert.alert('Sukses', 'Perubahan transaksi berhasil disimpan.', [
      { text: 'OK', onPress: () => setIsEditing(false) }
    ]);
  };

  // ==========================================
  // RENDER: STATE 2 (MODE EDIT)
  // ==========================================
  if (isEditing) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* TOPBAR EDIT */}
        <View style={styles.topbar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setIsEditing(false)}>
            <Ionicons name="close" size={16} color={UI_COLORS.t2} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Edit transaksi</Text>
          <TouchableOpacity style={[styles.backBtn, { borderColor: hexToRgba(UI_COLORS.gold, 0.3), backgroundColor: hexToRgba(UI_COLORS.gold, 0.1) }]} onPress={handleSave}>
            <Ionicons name="checkmark" size={16} color={UI_COLORS.gold} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
          {/* INFO BANNER */}
          <View style={styles.warningBanner}>
            <Ionicons name="information-circle" size={16} color="#FF9090" style={{ flexShrink: 0 }} />
            <Text style={styles.warningTxt}>Kamu mengedit transaksi Istri. Perubahan akan tercatat oleh sistem.</Text>
          </View>

          {/* FIELD: NOMINAL */}
          <Text style={styles.secLbl}>Nominal</Text>
          <View style={styles.editNominalRow}>
            <Text style={styles.editNominalPrefix}>Rp</Text>
            <TextInput 
              style={styles.editNominalInput} 
              value={amount} 
              onChangeText={setAmount} 
              keyboardType="numeric"
            />
          </View>

          {/* FIELD: CATATAN */}
          <Text style={styles.secLbl}>Nama / keterangan</Text>
          <View style={[styles.fieldEdit, styles.fieldFocused]}>
            <Ionicons name="pencil" size={16} color={UI_COLORS.t3} style={styles.feIcon} />
            <TextInput 
              style={styles.feInput} 
              value={note} 
              onChangeText={setNote}
            />
            {note.length > 0 && (
              <TouchableOpacity onPress={() => setNote('')}>
                <Ionicons name="close" size={16} color={UI_COLORS.t3} />
              </TouchableOpacity>
            )}
          </View>

          {/* FIELD: KATEGORI */}
          <Text style={styles.secLbl}>Kategori</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
            {categories.map((cat) => {
              const isSel = category === cat.id;
              return (
                <TouchableOpacity key={cat.id} style={styles.catChip} onPress={() => setCategory(cat.id)}>
                  <View style={[styles.catIco, { backgroundColor: hexToRgba(cat.color, 0.1) }, isSel && { borderColor: hexToRgba(cat.color, 0.5) }]}>
                    <Ionicons name={cat.icon as any} size={18} color={cat.color} />
                  </View>
                  <Text style={[styles.catName, isSel && { color: cat.color }]}>{cat.id}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* FIELD: DOMPET (Read-only/Simulasi) */}
          <Text style={styles.secLbl}>Dari dompet</Text>
          <View style={styles.fieldEdit}>
            <View style={[styles.wIco, { backgroundColor: hexToRgba(UI_COLORS.gold, 0.12) }]}>
              <Ionicons name="home" size={12} color={UI_COLORS.gold} />
            </View>
            <Text style={styles.feInputText}>Kas keluarga — Rp 6.800.000</Text>
            <Ionicons name="chevron-down" size={16} color={UI_COLORS.t3} />
          </View>

          {/* DANGER ZONE */}
          <View style={styles.dangerZone}>
            <View style={styles.dzHeader}>
              <Ionicons name="warning" size={14} color="#FF9090" />
              <Text style={styles.dzTitle}>Zona berbahaya</Text>
            </View>
            <Text style={styles.dzSub}>Menghapus transaksi ini akan mengubah saldo dompet secara permanen dan tidak dapat diurungkan.</Text>
          </View>

          <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
            <Ionicons name="checkmark" size={18} color="#0A1628" />
            <Text style={styles.btnSaveTxt}>Simpan perubahan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCancel} onPress={() => setIsEditing(false)}>
            <Text style={styles.btnCancelTxt}>Batal — kembali ke detail</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    );
  }

  // ==========================================
  // RENDER: STATE 1 (LIHAT DETAIL)
  // ==========================================
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* TOPBAR DETAIL */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Detail transaksi</Text>
        <View style={styles.topbarRight}>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="share-outline" size={16} color={UI_COLORS.t2} /></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Ionicons name="ellipsis-horizontal" size={16} color={UI_COLORS.t2} /></TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="cart" size={26} color={UI_COLORS.red} />
          </View>
          <Text style={styles.heroAmt}>- Rp 87.500</Text>
          <Text style={styles.heroDesc}>Belanja Indomaret</Text>
          <View style={styles.tipeChip}>
            <Ionicons name="arrow-up" size={13} color="#FF9090" />
            <Text style={styles.tipeChipTxt}>Pengeluaran</Text>
          </View>
        </View>

        {/* RECEIPT CARD */}
        <View style={styles.receipt}>
          <View style={styles.rrow}>
            <View style={styles.rl}><Ionicons name="pricetag" size={15} color={UI_COLORS.t2} /><Text style={styles.rlTxt}>Kategori</Text></View>
            <View style={styles.wPill}>
              <View style={[styles.wIco, { backgroundColor: hexToRgba(UI_COLORS.red, 0.12) }]}><Ionicons name="cart" size={12} color={UI_COLORS.red} /></View>
              <Text style={styles.rr}>Belanja</Text>
            </View>
          </View>
          <View style={styles.rrow}>
            <View style={styles.rl}><Ionicons name="wallet" size={15} color={UI_COLORS.t2} /><Text style={styles.rlTxt}>Dari dompet</Text></View>
            <View style={styles.wPill}>
              <View style={[styles.wIco, { backgroundColor: hexToRgba(UI_COLORS.gold, 0.12) }]}><Ionicons name="home" size={12} color={UI_COLORS.gold} /></View>
              <Text style={[styles.rr, { color: UI_COLORS.gold }]}>Kas keluarga</Text>
            </View>
          </View>
          <View style={styles.rrow}>
            <View style={styles.rl}><Ionicons name="person" size={15} color={UI_COLORS.t2} /><Text style={styles.rlTxt}>Dicatat oleh</Text></View>
            <View style={styles.wPill}>
              <View style={styles.avatarIstri}><Text style={styles.avatarTxt}>I</Text></View>
              <Text style={styles.rr}>Istri</Text>
            </View>
          </View>
          <View style={styles.rrow}>
            <View style={styles.rl}><Ionicons name="calendar" size={15} color={UI_COLORS.t2} /><Text style={styles.rlTxt}>Tanggal</Text></View>
            <Text style={styles.rr}>11 Jun 2026 · 11:24</Text>
          </View>
          <View style={styles.rrow}>
            <View style={styles.rl}><Ionicons name="pencil" size={15} color={UI_COLORS.t2} /><Text style={styles.rlTxt}>Catatan</Text></View>
            <Text style={[styles.rr, { maxWidth: 140 }]} numberOfLines={2}>Belanja Indomaret — snack + minum</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.saldoSection}>
            <View style={[styles.rrow, { borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 }]}>
              <Text style={styles.rlTxt}>Saldo sebelum</Text>
              <Text style={styles.rr}>Rp 6.887.500</Text>
            </View>
            <View style={[styles.rrow, { borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 }]}>
              <Text style={styles.rlTxt}>Nominal</Text>
              <Text style={[styles.rr, { color: UI_COLORS.red }]}>- Rp 87.500</Text>
            </View>
            <View style={styles.rrow}>
              <Text style={[styles.rlTxt, { fontWeight: '600', color: UI_COLORS.text }]}>Saldo sesudah</Text>
              <Text style={[styles.rr, { fontSize: 14, color: UI_COLORS.mint }]}>Rp 6.800.000</Text>
            </View>
          </View>
        </View>

        {/* FOTO STRUK */}
        <TouchableOpacity style={styles.strukCard} activeOpacity={0.8}>
          <View style={styles.strukImg}>
            <Ionicons name="image" size={22} color={UI_COLORS.mint} />
            <Text style={styles.strukImgTxt}>Foto struk tersedia — ketuk untuk lihat</Text>
          </View>
          <View style={styles.strukInfo}>
            <Ionicons name="document-text" size={16} color={UI_COLORS.t2} />
            <View style={{ flex: 1 }}>
              <Text style={styles.strukFileName}>struk_indomaret_11jun.jpg</Text>
              <Text style={styles.strukFileMeta}>128 KB · diupload 11:25</Text>
            </View>
            <Ionicons name="search" size={16} color={UI_COLORS.t3} />
          </View>
        </TouchableOpacity>

        {/* TX ID */}
        <View style={styles.txIdCard}>
          <View>
            <Text style={styles.txIdLbl}>ID transaksi</Text>
            <Text style={styles.txIdVal}>TXN-2026061100042</Text>
          </View>
          <TouchableOpacity><Ionicons name="copy-outline" size={16} color={UI_COLORS.t3} /></TouchableOpacity>
        </View>

        {/* ACTION BUTTONS (EDIT & DELETE) */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.btnEdit} onPress={() => setIsEditing(true)}>
            <Ionicons name="create-outline" size={16} color="#A89FF9" />
            <Text style={styles.btnEditTxt}>Edit transaksi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnDel} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={16} color="#FF9090" />
            <Text style={styles.btnDelTxt}>Hapus</Text>
          </TouchableOpacity>
        </View>

        {/* TRANSAKSI LAIN HARI INI */}
        <Text style={styles.secLblRelated}>Transaksi lain hari ini</Text>
        <View style={styles.relatedCard}>
          <TouchableOpacity 
            style={styles.relRow}
            onPress={() => navigation.navigate('TransactionDetail')}
          >
            <View style={[styles.relIcon, { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) }]}><Ionicons name="fast-food" size={16} color={UI_COLORS.red} /></View>
            <View style={styles.relInfo}>
              <Text style={styles.relName}>Makan siang warung</Text>
              <Text style={styles.relSub}>Bayu · Kas keluarga · 12:05</Text>
            </View>
            <Text style={[styles.relAmt, { color: UI_COLORS.red }]}>-Rp 35.000</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.relRow, { borderBottomWidth: 0 }]}
            onPress={() => navigation.navigate('TransactionDetail')}
          >
            <View style={[styles.relIcon, { backgroundColor: hexToRgba(UI_COLORS.violet, 0.1) }]}><Ionicons name="flash" size={16} color={UI_COLORS.violet} /></View>
            <View style={styles.relInfo}>
              <Text style={styles.relName}>Listrik PLN</Text>
              <Text style={styles.relSub}>Bayu · GoPay Istri · 09:15</Text>
            </View>
            <Text style={[styles.relAmt, { color: UI_COLORS.red }]}>-Rp 150.000</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollBody: { paddingBottom: 20 },
  
  // TOPBAR
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  backBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { fontSize: 15, fontWeight: '500', color: UI_COLORS.text },
  topbarRight: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },

  // HERO
  hero: { alignItems: 'center', paddingVertical: 14, paddingHorizontal: 18 },
  heroIconWrap: { width: 56, height: 56, borderRadius: 18, backgroundColor: hexToRgba(UI_COLORS.red, 0.12), alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  heroAmt: { fontSize: 32, fontWeight: '600', color: UI_COLORS.red, letterSpacing: -1, marginBottom: 4 },
  heroDesc: { fontSize: 13, color: UI_COLORS.t2 },
  tipeChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: hexToRgba(UI_COLORS.red, 0.1), borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, marginTop: 8 },
  tipeChipTxt: { fontSize: 11, fontWeight: '600', color: '#FF9090' },

  // RECEIPT
  receipt: { marginHorizontal: 16, marginBottom: 14, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, overflow: 'hidden' },
  rrow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  rl: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rlTxt: { fontSize: 12, color: UI_COLORS.t2 },
  rr: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text, textAlign: 'right' },
  wPill: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  wIco: { width: 22, height: 22, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  avatarIstri: { width: 20, height: 20, borderRadius: 10, backgroundColor: UI_COLORS.gold, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { fontSize: 10, fontWeight: '600', color: UI_COLORS.bg },
  divider: { height: 0, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.1)', borderStyle: 'dashed', marginHorizontal: 10 },
  saldoSection: { backgroundColor: 'rgba(255,255,255,0.02)' },

  // FOTO STRUK
  strukCard: { marginHorizontal: 16, marginBottom: 14, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, overflow: 'hidden' },
  strukImg: { height: 80, backgroundColor: 'rgba(45,212,164,0.05)', alignItems: 'center', justifyContent: 'center', gap: 6, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  strukImgTxt: { fontSize: 11, color: UI_COLORS.mint },
  strukInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12 },
  strukFileName: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text },
  strukFileMeta: { fontSize: 10, color: UI_COLORS.t3 },

  // TX ID
  txIdCard: { marginHorizontal: 16, marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 0.5, borderColor: UI_COLORS.b1, borderRadius: 12, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  txIdLbl: { fontSize: 10, color: UI_COLORS.t3, marginBottom: 2 },
  txIdVal: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text },

  // ACTIONS ROW
  actionRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 12 },
  btnEdit: { flex: 1, height: 44, borderRadius: 13, backgroundColor: 'rgba(124,111,247,0.1)', borderWidth: 0.5, borderColor: 'rgba(124,111,247,0.3)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  btnEditTxt: { fontSize: 12, fontWeight: '600', color: '#A89FF9' },
  btnDel: { flex: 1, height: 44, borderRadius: 13, backgroundColor: 'rgba(255,107,107,0.08)', borderWidth: 0.5, borderColor: 'rgba(255,107,107,0.2)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  btnDelTxt: { fontSize: 12, fontWeight: '600', color: '#FF9090' },

  // RELATED TX
  secLblRelated: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase', paddingHorizontal: 18, marginBottom: 6 },
  relatedCard: { marginHorizontal: 16, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 14, overflow: 'hidden' },
  relRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  relIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  relInfo: { flex: 1 },
  relName: { fontSize: 12, fontWeight: '500', color: UI_COLORS.text, marginBottom: 2 },
  relSub: { fontSize: 10, color: UI_COLORS.t3 },
  relAmt: { fontSize: 12, fontWeight: '600' },

  // ====================
  // MODE EDIT STYLES
  // ====================
  warningBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,107,107,0.07)', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: 'rgba(255,107,107,0.15)', paddingHorizontal: 18, paddingVertical: 10, marginBottom: 14 },
  warningTxt: { fontSize: 11, color: '#FF9090', lineHeight: 16, flex: 1 },
  
  secLbl: { fontSize: 11, color: UI_COLORS.t3, letterSpacing: 0.5, textTransform: 'uppercase', paddingHorizontal: 18, marginBottom: 8 },
  
  editNominalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingBottom: 16 },
  editNominalPrefix: { fontSize: 18, color: UI_COLORS.t2 },
  editNominalInput: { fontSize: 32, fontWeight: '600', color: UI_COLORS.red, padding: 0 },

  fieldEdit: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 12, paddingHorizontal: 14, height: 46, marginHorizontal: 16, marginBottom: 14 },
  fieldFocused: { borderColor: UI_COLORS.gold },
  feIcon: { flexShrink: 0 },
  feInput: { flex: 1, fontSize: 14, color: UI_COLORS.text },
  feInputText: { flex: 1, fontSize: 13, color: UI_COLORS.text },

  catScroll: { paddingHorizontal: 16, paddingBottom: 16, gap: 12 },
  catChip: { alignItems: 'center', gap: 6 },
  catIco: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: 'transparent' },
  catName: { fontSize: 10, color: UI_COLORS.t2 },

  dangerZone: { marginHorizontal: 16, marginBottom: 16, backgroundColor: 'rgba(255,107,107,0.06)', borderWidth: 0.5, borderColor: 'rgba(255,107,107,0.18)', borderRadius: 12, padding: 12 },
  dzHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  dzTitle: { fontSize: 11, fontWeight: '600', color: '#FF9090' },
  dzSub: { fontSize: 11, color: 'rgba(255,107,107,0.8)', lineHeight: 16 },

  btnSave: { marginHorizontal: 16, marginBottom: 10, height: 48, borderRadius: 14, backgroundColor: UI_COLORS.gold, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnSaveTxt: { fontSize: 14, fontWeight: '600', color: '#0A1628' },
  btnCancel: { marginHorizontal: 16, height: 40, borderRadius: 12, backgroundColor: 'transparent', borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  btnCancelTxt: { fontSize: 13, color: UI_COLORS.t2 }
});
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

// Data Dummy Kategori (Akan di-load dari DB nantinya)
const sysCategoriesExpense = [
  { id: 's1', name: 'Makan & minum', icon: 'restaurant', color: UI_COLORS.gold, txCount: 30 },
  { id: 's2', name: 'Belanja', icon: 'cart', color: UI_COLORS.red, txCount: 18 },
  { id: 's3', name: 'Transportasi', icon: 'car', color: UI_COLORS.mint, txCount: 12 },
  { id: 's4', name: 'Tagihan & utilitas', icon: 'flash', color: UI_COLORS.violet, txCount: 8 },
  { id: 's5', name: 'Kesehatan', icon: 'fitness', color: UI_COLORS.mint, txCount: 6 },
  { id: 's6', name: 'Hiburan', icon: 'game-controller', color: UI_COLORS.violet, txCount: 5 },
  { id: 's7', name: 'Pendidikan', icon: 'school', color: '#A78BFA', txCount: 3 },
  { id: 's8', name: 'Cicilan & hutang', icon: 'bicycle', color: UI_COLORS.red, txCount: 2 },
  { id: 's9', name: 'Lainnya', icon: 'ellipsis-horizontal', color: UI_COLORS.t2, txCount: 10 },
];

const customCategoriesExpense = [
  { id: 'c1', name: 'Bahan dagang cimol', icon: 'storefront', color: UI_COLORS.gold, txCount: 8 },
  { id: 'c2', name: 'Hadiah & sedekah', icon: 'gift', color: UI_COLORS.mint, txCount: 4 },
];

const AVAILABLE_ICONS = ['extension-puzzle', 'camera', 'musical-notes', 'paw', 'leaf', 'bicycle', 'book', 'shirt', 'hammer', 'buggy', 'umbrella', 'ellipsis-horizontal'];
const AVAILABLE_COLORS = ['#7C6FF7', '#2DD4A4', '#F5C842', '#FF6B6B', '#F5A623', '#A78BFA', '#34D399', '#60A5FA', '#FB7185', '#8FA8CC'];

export const CategorySettingsScreen = () => {
  const navigation = useNavigation<any>();
  const scrollViewRef = useRef<ScrollView>(null);

  // States
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // State form tambah
  const [catName, setCatName] = useState('');
  const [selIcon, setSelIcon] = useState(AVAILABLE_ICONS[0]);
  const [selColor, setSelColor] = useState(AVAILABLE_COLORS[0]);

  const handleOpenAddForm = () => {
    setShowAddForm(true);
    // Beri sedikit jeda agar form render dulu, baru scroll ke bawah
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setCatName('');
    setSelIcon(AVAILABLE_ICONS[0]);
    setSelColor(AVAILABLE_COLORS[0]);
  };

  // Render Baris Kategori
  const renderCatRow = (item: any, isCustom: boolean) => (
    <View key={item.id} style={styles.catRow}>
      <View style={[styles.catIcon, { backgroundColor: hexToRgba(item.color, 0.12) }]}>
        <Ionicons name={item.icon as any} size={18} color={item.color} />
      </View>
      <View style={styles.catInfo}>
        <Text style={styles.catName}>{item.name}</Text>
        <View style={styles.catMeta}>
          <Text style={styles.catTx}>{item.txCount} transaksi</Text>
          <View style={styles.catDot} />
          {isCustom ? (
            <View style={[styles.catBadge, styles.badgeCustom]}><Text style={styles.badgeTxtCustom}>Kustom</Text></View>
          ) : (
            <View style={[styles.catBadge, styles.badgeSys]}><Text style={styles.badgeTxtSys}>Bawaan</Text></View>
          )}
        </View>
      </View>
      <View style={styles.catRight}>
        {isCustom && <Ionicons name="menu" size={16} color={UI_COLORS.t3} style={styles.dragHandle} />}
        <TouchableOpacity style={styles.editBtn}>
          <Ionicons name="pencil" size={13} color={UI_COLORS.t2} />
        </TouchableOpacity>
        {isCustom && (
          <TouchableOpacity style={[styles.editBtn, { backgroundColor: hexToRgba(UI_COLORS.red, 0.1) }]}>
            <Ionicons name="trash" size={13} color={UI_COLORS.red} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* TOPBAR */}
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={UI_COLORS.t2} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Kategori transaksi</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search" size={15} color={UI_COLORS.t2} />
        </TouchableOpacity>
      </View>

      {/* TABS */}
      <View style={styles.tabRow}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'expense' ? styles.tabRed : null]}
          onPress={() => setActiveTab('expense')}
        >
          <Ionicons name="arrow-up" size={13} color={activeTab === 'expense' ? UI_COLORS.bg : UI_COLORS.t3} />
          <Text style={[styles.tabTxt, { color: activeTab === 'expense' ? UI_COLORS.bg : UI_COLORS.t3 }]}>Pengeluaran</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'income' ? styles.tabGreen : null]}
          onPress={() => setActiveTab('income')}
        >
          <Ionicons name="arrow-down" size={13} color={activeTab === 'income' ? UI_COLORS.bg : UI_COLORS.t3} />
          <Text style={[styles.tabTxt, { color: activeTab === 'income' ? UI_COLORS.bg : UI_COLORS.t3 }]}>Pemasukan</Text>
        </TouchableOpacity>
      </View>

      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* KATEGORI BAWAAN */}
        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>Kategori bawaan ({sysCategoriesExpense.length})</Text>
          <Text style={styles.secSub}>Tidak bisa dihapus</Text>
        </View>
        <View style={styles.card}>
          {activeTab === 'expense' ? sysCategoriesExpense.map(cat => renderCatRow(cat, false)) : <Text style={styles.emptyTxt}>Data pemasukan (Mockup)</Text>}
        </View>

        {/* KATEGORI KUSTOM */}
        <View style={styles.secHeader}>
          <Text style={styles.secLbl}>Kategori kustom ({customCategoriesExpense.length})</Text>
          <TouchableOpacity onPress={handleOpenAddForm}>
            <Text style={styles.secAdd}>+ Tambah</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
           {activeTab === 'expense' ? customCategoriesExpense.map(cat => renderCatRow(cat, true)) : <Text style={styles.emptyTxt}>Belum ada kategori kustom</Text>}
        </View>

        {/* FORM TAMBAH KATEGORI */}
        {showAddForm && (
          <View style={styles.newCard}>
            <View style={styles.ncHeader}>
              <Ionicons name="add" size={16} color="#A89FF9" />
              <Text style={styles.ncTitle}>Tambah kategori baru</Text>
              <TouchableOpacity style={styles.ncClose} onPress={handleCloseForm}>
                <Ionicons name="close" size={13} color="#A89FF9" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.ncBody}>
              <View style={styles.ncField}>
                <Text style={styles.ncLbl}>Nama kategori</Text>
                <View style={[styles.ncInputWrap, catName ? styles.ncFocused : null]}>
                  <Ionicons name="pricetag" size={15} color={UI_COLORS.t3} />
                  <TextInput 
                    style={styles.ncInput}
                    placeholder="Contoh: Hobi & peralatan"
                    placeholderTextColor={UI_COLORS.t3}
                    value={catName}
                    onChangeText={setCatName}
                  />
                </View>
              </View>

              <View style={styles.ncField}>
                <Text style={styles.ncLbl}>Pilih ikon</Text>
                <View style={styles.iconPickerGrid}>
                  {AVAILABLE_ICONS.map(ic => (
                    <TouchableOpacity 
                      key={ic} 
                      style={[styles.ipItem, selIcon === ic && styles.ipItemSelected]}
                      onPress={() => setSelIcon(ic)}
                    >
                      <Ionicons name={ic as any} size={18} color={selIcon === ic ? UI_COLORS.violet : UI_COLORS.t2} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={[styles.ncField, { marginBottom: 0 }]}>
                <Text style={styles.ncLbl}>Pilih warna</Text>
                <View style={styles.colorPickerWrap}>
                  {AVAILABLE_COLORS.map(col => (
                    <TouchableOpacity 
                      key={col}
                      style={[styles.cpDot, { backgroundColor: col }, selColor === col && styles.cpDotSelected]}
                      onPress={() => setSelColor(col)}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.ncBtns}>
                <TouchableOpacity style={styles.btnCancel} onPress={handleCloseForm}>
                  <Text style={styles.btnCancelTxt}>Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSave}>
                  <Ionicons name="checkmark" size={14} color="#FFF" />
                  <Text style={styles.btnSaveTxt}>Simpan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* INFO TIP */}
        <View style={styles.tipCard}>
          <Ionicons name="information-circle" size={16} color={UI_COLORS.violet} style={{ flexShrink: 0 }} />
          <Text style={styles.tipTxt}>Kategori kustom bisa diurutkan ulang dengan drag. Kategori bawaan tidak bisa dihapus, hanya bisa diubah nama & ikonnya.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: UI_COLORS.bg },
  scrollBody: { paddingBottom: 20 },
  
  // TOPBAR & TABS
  topbar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6 },
  backBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '500', color: UI_COLORS.text },
  searchBtn: { width: 32, height: 32, borderRadius: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  
  tabRow: { flexDirection: 'row', backgroundColor: UI_COLORS.card2, borderRadius: 13, padding: 3, marginHorizontal: 18, marginTop: 6, marginBottom: 12 },
  tab: { flex: 1, height: 32, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },
  tabRed: { backgroundColor: UI_COLORS.red },
  tabGreen: { backgroundColor: UI_COLORS.mint },
  tabTxt: { fontSize: 12, fontWeight: '500' },

  // SECTIONS & CARDS
  secHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingTop: 4, paddingBottom: 8 },
  secLbl: { fontSize: 11, color: UI_COLORS.t3, textTransform: 'uppercase', letterSpacing: 0.5 },
  secSub: { fontSize: 11, color: UI_COLORS.t3 },
  secAdd: { fontSize: 11, color: UI_COLORS.violet, fontWeight: '500' },
  card: { marginHorizontal: 16, marginBottom: 10, backgroundColor: UI_COLORS.card, borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 16, overflow: 'hidden' },
  emptyTxt: { padding: 20, textAlign: 'center', color: UI_COLORS.t3, fontSize: 12 },

  // CATEGORY ROWS
  catRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 13, paddingVertical: 11, borderBottomWidth: 0.5, borderBottomColor: UI_COLORS.b1 },
  catIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  catInfo: { flex: 1 },
  catName: { fontSize: 13, fontWeight: '500', color: UI_COLORS.text, marginBottom: 2 },
  catMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  catTx: { fontSize: 11, color: UI_COLORS.t3 },
  catDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: UI_COLORS.t3 },
  catBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20 },
  badgeSys: { backgroundColor: 'rgba(255,255,255,0.06)' },
  badgeTxtSys: { fontSize: 9, fontWeight: '500', color: UI_COLORS.t2 },
  badgeCustom: { backgroundColor: 'rgba(124,111,247,0.12)' },
  badgeTxtCustom: { fontSize: 9, fontWeight: '500', color: '#A89FF9' },
  
  catRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dragHandle: { paddingHorizontal: 4 },
  editBtn: { width: 26, height: 26, borderRadius: 8, backgroundColor: UI_COLORS.card2, alignItems: 'center', justifyContent: 'center' },

  // ADD CATEGORY FORM
  newCard: { marginHorizontal: 16, marginBottom: 8, backgroundColor: 'rgba(124,111,247,0.07)', borderWidth: 1.5, borderColor: 'rgba(124,111,247,0.25)', borderStyle: 'dashed', borderRadius: 16 },
  ncHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 13, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: 'rgba(124,111,247,0.15)' },
  ncTitle: { fontSize: 13, fontWeight: '500', color: '#A89FF9', flex: 1 },
  ncClose: { width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(124,111,247,0.1)', alignItems: 'center', justifyContent: 'center' },
  ncBody: { padding: 13 },
  ncField: { marginBottom: 12 },
  ncLbl: { fontSize: 11, color: UI_COLORS.t3, marginBottom: 6 },
  ncInputWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 0.5, borderColor: UI_COLORS.b2, borderRadius: 11, paddingHorizontal: 12, height: 44 },
  ncFocused: { borderColor: 'rgba(124,111,247,0.4)' },
  ncInput: { flex: 1, fontSize: 13, color: UI_COLORS.text },
  
  iconPickerGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 2 },
  ipItem: { width: 36, height: 36, borderRadius: 11, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 0.5, borderColor: UI_COLORS.b1, alignItems: 'center', justifyContent: 'center' },
  ipItemSelected: { backgroundColor: 'rgba(124,111,247,0.15)', borderColor: 'rgba(124,111,247,0.4)' },
  
  colorPickerWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 2 },
  cpDot: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: 'transparent' },
  cpDotSelected: { borderColor: UI_COLORS.text }, // In real app, consider using a border wrapping the dot instead of inner border for better look

  ncBtns: { flexDirection: 'row', gap: 8, marginTop: 16 },
  btnCancel: { flex: 1, height: 40, borderRadius: 11, borderWidth: 0.5, borderColor: UI_COLORS.b2, alignItems: 'center', justifyContent: 'center' },
  btnCancelTxt: { fontSize: 13, color: UI_COLORS.t2 },
  btnSave: { flex: 1, height: 40, borderRadius: 11, backgroundColor: UI_COLORS.violet, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  btnSaveTxt: { fontSize: 13, fontWeight: '600', color: '#FFF' },

  // TIP CARD
  tipCard: { marginHorizontal: 16, marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 0.5, borderColor: UI_COLORS.b1, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 9 },
  tipTxt: { flex: 1, fontSize: 11, color: UI_COLORS.t3, lineHeight: 16 }
});